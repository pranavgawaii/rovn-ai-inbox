import { NextRequest, NextResponse } from "next/server";

/** Compute a lead score from email content (0-10) */
function computeLeadScore(text: string): number {
  const lower = text.toLowerCase();
  let score = 3;

  const pricingTerms = ["price", "pricing", "quote", "cost", "budget", "invest", "package", "fee", "rate", "₹", "$", "usd", "inr"];
  const urgencyTerms = ["urgent", "asap", "immediately", "today", "right away", "as soon as", "quickly", "emergency"];
  const intentTerms = ["interested", "want", "need", "looking for", "purchase", "buy", "book", "hire", "contract", "proposal"];
  const timelineTerms = ["deadline", "by monday", "by friday", "next week", "this week", "tomorrow", "end of month", "before", "timeline"];

  for (const t of pricingTerms) if (lower.includes(t)) { score += 2; break; }
  for (const t of urgencyTerms) if (lower.includes(t)) { score += 2; break; }
  for (const t of intentTerms) if (lower.includes(t)) { score += 1.5; break; }
  for (const t of timelineTerms) if (lower.includes(t)) { score += 1; break; }

  return Math.min(10, Math.round(score));
}

/** Derive urgency label from score */
function scoreToUrgency(score: number): "Critical" | "High" | "Medium" | "Low" {
  if (score >= 9) return "Critical";
  if (score >= 7) return "High";
  if (score >= 5) return "Medium";
  return "Low";
}

/** Derive status from score */
function scoreToStatus(score: number): "hot" | "pending" | "cold" {
  if (score >= 8) return "hot";
  if (score >= 5) return "pending";
  return "cold";
}

/** Parse sender name from "Name <email@domain.com>" format */
function parseSenderName(from: string): string {
  const match = from.match(/^([^<]+)</);
  if (match) return match[1].trim().replace(/"/g, "");
  return from.split("@")[0] || "Unknown";
}

/** Get initials from a name */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  if (error || !code) {
    return NextResponse.redirect(`${baseUrl}/settings?gmailError=access_denied`);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID!;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
  const redirectUri = `${baseUrl}/api/auth/google/callback`;

  // Exchange code for tokens
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  const tokenData = await tokenRes.json();

  if (!tokenData.access_token) {
    console.error("Token exchange failed:", tokenData);
    return NextResponse.redirect(`${baseUrl}/settings?gmailError=token_failed`);
  }

  const accessToken = tokenData.access_token as string;

  // Fetch user profile for email address
  const profileRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const profile = await profileRes.json();
  const userEmail = profile.email as string;

  // Fetch latest 20 emails
  const listRes = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=20&q=in:inbox",
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const listData = await listRes.json();

  const messages = listData.messages || [];

  // Fetch each message detail in parallel
  const emailDetails = await Promise.all(
    messages.map(async (msg: { id: string }) => {
      const detailRes = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=From&metadataHeaders=Subject&metadataHeaders=Date`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return detailRes.json();
    })
  );

  // Convert emails to Rovn lead objects
  const leads = emailDetails
    .filter((email: any) => email.payload && email.snippet)
    .map((email: any) => {
      const headers: Array<{ name: string; value: string }> = email.payload?.headers || [];
      const from = headers.find((h) => h.name === "From")?.value || "Unknown <unknown@email.com>";
      const subject = headers.find((h) => h.name === "Subject")?.value || "(No subject)";
      const date = headers.find((h) => h.name === "Date")?.value || "";
      const snippet = email.snippet || "";

      const senderName = parseSenderName(from);
      const senderEmail = (from.match(/<([^>]+)>/) || [])[1] || from;
      const combined = `${subject} ${snippet}`;
      const score = computeLeadScore(combined);
      const urgency = scoreToUrgency(score);
      const status = scoreToStatus(score);

      // Parse date into relative string
      const emailDate = date ? new Date(date) : new Date();
      const daysDiff = Math.floor((Date.now() - emailDate.getTime()) / (1000 * 60 * 60 * 24));
      const timeLabel =
        daysDiff === 0
          ? "Today"
          : daysDiff === 1
          ? "Yesterday"
          : `${daysDiff} days ago`;

      return {
        id: `gmail_${email.id}`,
        platform: "email" as const,
        contactName: senderName,
        businessType: "Gmail Lead",
        status,
        daysSinceLastReply: daysDiff,
        avatar: getInitials(senderName),
        leadValue: score >= 7 ? "₹50k+" : score >= 5 ? "₹10k+" : "₹5k",
        leadScore: score,
        urgency,
        nextBestAction: `Reply to ${senderName}'s email about: ${subject.slice(0, 60)}`,
        whyItMatters: {
          budgetMentioned: combined.toLowerCase().includes("price") || combined.toLowerCase().includes("budget") || combined.toLowerCase().includes("₹") || combined.toLowerCase().includes("$"),
          buyingIntentDetected: score >= 6,
          timelineMentioned: combined.toLowerCase().includes("deadline") || combined.toLowerCase().includes("timeline") || combined.toLowerCase().includes("by "),
          delayedDays: daysDiff,
        },
        dealSummary: `Email from ${senderName} (${senderEmail}): "${subject.slice(0, 80)}"`,
        contextualReplies: [
          `Hi ${senderName.split(" ")[0]}, thank you for reaching out about "${subject.slice(0, 50)}". I would love to help — could you share a bit more about your requirements so I can put together the best option for you?`,
          `Hi ${senderName.split(" ")[0]}, I saw your email regarding "${subject.slice(0, 50)}". I am available this week to discuss further. What time works best for a quick call?`,
          `Hi ${senderName.split(" ")[0]}, following up on your email. I have some ideas that might be a great fit. Would you like me to send over more details or schedule a call?`,
        ],
        messages: [
          {
            id: `gmail_msg_${email.id}`,
            role: "customer" as const,
            content: snippet.length > 300 ? snippet.slice(0, 300) + "…" : snippet,
            timestamp: timeLabel,
          },
        ],
        // Extra metadata for settings badge
        _gmailEmail: senderEmail,
        _subject: subject,
      };
    });

  // Store leads in a cookie (JSON, max ~4KB — trim if needed)
  const leadsJson = JSON.stringify(leads.slice(0, 15));
  const accountJson = JSON.stringify({ email: userEmail, connected: true });

  const response = NextResponse.redirect(`${baseUrl}/settings?gmailConnected=true`);

  // Set a 1-day cookie for leads
  response.cookies.set("rovn_gmail_leads", leadsJson, {
    httpOnly: false, // readable by client JS
    maxAge: 86400,
    path: "/",
    sameSite: "lax",
  });

  response.cookies.set("rovn_gmail_account", accountJson, {
    httpOnly: false,
    maxAge: 86400,
    path: "/",
    sameSite: "lax",
  });

  return response;
}
