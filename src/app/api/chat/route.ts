import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// ── Client ────────────────────────────────────────────────────────────

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "sk-placeholder",
  baseURL: process.env.OPENAI_BASE_URL || undefined,
});

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_MESSAGES = 12;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 12;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

const crisisPatterns = [
  /自杀/,
  /轻生/,
  /不想活/,
  /结束生命/,
  /伤害自己/,
  /suicide/i,
  /kill myself/i,
];

const getClientKey = (request: NextRequest) => {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0];
  return forwardedFor?.trim() || request.headers.get("x-real-ip") || "anonymous";
};

const isRateLimited = (key: string) => {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX;
};

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
    const clientKey = getClientKey(request);
    if (isRateLimited(clientKey)) {
      return NextResponse.json(
        { error: "请求太频繁了，请稍后再试。" },
        { status: 429 }
      );
    }

    const body: ChatRequest = await request.json();
    const { message, master = "adler", history = [] } = body;
    const trimmedMessage = typeof message === "string" ? message.trim() : "";

    // Validation
    if (!trimmedMessage) {
      return NextResponse.json({ error: "消息不能为空" }, { status: 400 });
    }

    if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `消息太长了，请控制在 ${MAX_MESSAGE_LENGTH} 字以内。` },
        { status: 400 }
      );
    }

    if (crisisPatterns.some((pattern) => pattern.test(trimmedMessage))) {
      return NextResponse.json({
        reply:
          "我很在意你现在的安全。请先离开危险物品，联系身边可信任的人；如果有立即危险，请马上拨打当地急救电话或心理危机热线。这个 AI 不能替代专业帮助。",
      });
    }

    if (
      !process.env.OPENAI_API_KEY ||
      process.env.OPENAI_API_KEY === "sk-your-key-here"
    ) {
      return NextResponse.json(
        { error: "后端未配置 API Key，请在 .env.local 中填写 OPENAI_API_KEY" },
        { status: 503 }
      );
    }

    // Pick system prompt
    const systemPrompt = SYSTEM_PROMPTS[master] || SYSTEM_PROMPTS.adler;
    const safeHistory = history
      .filter(
        (item) =>
          (item.role === "user" || item.role === "assistant") &&
          typeof item.content === "string" &&
          item.content.trim()
      )
      .slice(-MAX_HISTORY_MESSAGES)
      .map((item) => ({
        role: item.role,
        content: item.content.slice(0, MAX_MESSAGE_LENGTH),
      }));

    // Build messages array
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      // Last 6 exchanges for context (12 messages max)
      ...safeHistory,
      { role: "user", content: trimmedMessage },
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
