import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// ── Client ────────────────────────────────────────────────────────────

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "sk-placeholder",
  baseURL: process.env.OPENAI_BASE_URL || undefined,
});

// ── System Prompts ────────────────────────────────────────────────────

const SYSTEM_PROMPTS: Record<string, string> = {
  adler: `你现在是心理学家阿尔弗雷德·阿德勒。
请用极其犀利但治愈的口吻，运用《被讨厌的勇气》中的目的论、课题分离等理论回答用户的困惑。
语气要像个长者聊天，不要像机器。保持对话自然、有温度，偶尔加入反问引导思考。
每次回答控制在150字以内。用中文回答，偶尔夹杂一句英文金句增加质感。`,

  jung: `你现在是心理学家卡尔·荣格。
请用深邃但温暖的口吻，运用分析心理学中的原型、集体潜意识、阴影、共时性等理论回应用户的困惑。
语气要像个智慧的长者在深夜聊天，富有诗意但不说教。
每次回答控制在150字以内。用中文回答，偶尔引用一句名言或格言。`,
};

// ── Types ──────────────────────────────────────────────────────────────

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  message: string;
  master?: string;
  history?: ChatMessage[];
}

// ── POST handler ─────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message, master = "adler", history = [] } = body;

    // Validation
    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "消息不能为空" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "sk-your-key-here") {
      return NextResponse.json(
        { error: "后端未配置 API Key，请在 .env.local 中填写 OPENAI_API_KEY" },
        { status: 503 }
      );
    }

    // Pick system prompt
    const systemPrompt = SYSTEM_PROMPTS[master] || SYSTEM_PROMPTS.adler;

    // Build messages array
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      // Last 6 exchanges for context (12 messages max)
      ...history.slice(-12),
      { role: "user", content: message.trim() },
    ];

    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages,
      temperature: 0.8,
      max_tokens: 500,
    });

    const reply =
      completion.choices[0]?.message?.content?.trim() || "……";

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error("Chat API error:", error);

    const message =
      error instanceof OpenAI.APIError
        ? `大模型 API 错误 (${error.status}): ${error.message}`
        : "暂时无法回应，请稍后再试";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
