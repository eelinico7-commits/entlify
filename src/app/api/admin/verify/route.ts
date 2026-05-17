import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (!password || typeof password !== "string") {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  const valid = password === process.env.ADMIN_PASSWORD;
  return NextResponse.json({ valid });
}
