import { NextResponse } from "next/server";
import type { Message } from "@/lib/types";

type SummarizeRequest = {
  messages: Message[];
  contactName: string;
  platform: string;
  businessType: string;
};

export async function POST(request: Request) {
  try {
    const { messages, contactName, platform, businessType } =
      (await request.json()) as SummarizeRequest;

    const conversationString = messages
      .map((message) => {
        const role = message.role === "customer" ? "CUSTOMER" : "BUSINESS";

        return `[${role}]: ${message.content}`;
      })
      .join("\n");

    const { default: openai } = await import("@/lib/openai");
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      max_tokens: 400,
      messages: [
        {
          role: "system",
          content:
            "You are a lead detection AI for small business owners in India. Analyze this customer conversation and return ONLY a valid JSON object with no markdown, no backticks, no extra text. Fields: summary (string, one sentence what customer wants), status (hot or pending or cold), daysSinceReply (number), urgencyReason (string, one sentence why reply now), suggestedTone (casual or professional or urgent), leadScore (number 1 to 10)"
        },
        {
          role: "user",
          content:
            "Business type: " +
            businessType +
            ". Platform: " +
            platform +
            ". Customer name: " +
            contactName +
            ". Conversation:\n" +
            conversationString
        }
      ]
    });

    const responseText = completion.choices[0]?.message.content ?? "{}";
    const cleanResponse = responseText.replace(/```(?:json)?|```/g, "").trim();
    const parsed = JSON.parse(cleanResponse);

    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
