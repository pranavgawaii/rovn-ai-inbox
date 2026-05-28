import { NextResponse } from "next/server";

type GenerateReplyRequest = {
  contactName: string;
  summary: string;
  platform: string;
  businessType: string;
  tone: string;
  lastMessage: string;
};

export async function POST(request: Request) {
  try {
    const { contactName, summary, platform, businessType, tone, lastMessage } =
      (await request.json()) as GenerateReplyRequest;

    const { default: openai } = await import("@/lib/openai");
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      max_tokens: 600,
      messages: [
        {
          role: "system",
          content:
            "You are a reply assistant for Indian small business owners. Generate exactly 3 different follow-up messages. Rules: each message max 3 sentences. Sound human and warm, not robotic or corporate. Use the customers first name naturally. Match platform tone exactly: whatsapp means casual with one emoji at the end, instagram means friendly and warm with one or two emoji, email means slightly formal with no emoji at all. Never say I hope this finds you well or Dear Sir or Greetings or To Whom It May Concern. Always reference what the customer actually asked about. Make them feel valued. Return ONLY a valid JSON array of exactly 3 strings. No markdown, no backticks, no numbering, no extra text whatsoever."
        },
        {
          role: "user",
          content:
            "Customer name: " +
            contactName +
            ". Platform: " +
            platform +
            ". Business type: " +
            businessType +
            ". Tone: " +
            tone +
            ". What customer wants: " +
            summary +
            ". Their last message: " +
            lastMessage +
            ". Generate 3 follow-up reply options."
        }
      ]
    });

    const responseText = completion.choices[0]?.message.content ?? "[]";
    const cleanResponse = responseText.replace(/```(?:json)?|```/g, "").trim();
    const parsedArray = JSON.parse(cleanResponse) as string[];

    return NextResponse.json({ replies: parsedArray });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
