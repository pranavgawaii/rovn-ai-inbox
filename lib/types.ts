export interface Message {
  id: string;
  role: "customer" | "business";
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  platform: "whatsapp" | "instagram" | "email";
  contactName: string;
  businessType: string;
  messages: Message[];
  status: "hot" | "pending" | "cold";
  daysSinceLastReply: number;
  avatar: string;
  leadValue: string;
  leadScore: number;
  urgency: "Critical" | "High" | "Medium" | "Low";
  nextBestAction: string;
  whyItMatters: {
    budgetMentioned: boolean;
    buyingIntentDetected: boolean;
    timelineMentioned: boolean;
    delayedDays: number;
  };
  dealSummary: string;
  contextualReplies: string[];
}

export interface AISummary {
  summary: string;
  status: "hot" | "pending" | "cold";
  daysSinceReply: number;
  urgencyReason: string;
  suggestedTone: "casual" | "professional" | "urgent";
  leadScore: number;
}

export interface ReplyOption {
  id: string;
  text: string;
  tone: string;
}
