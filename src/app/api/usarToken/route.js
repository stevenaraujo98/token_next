import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const cliente = searchParams.get("cliente");
  const token = searchParams.get("token");

  return NextResponse.json({ cliente, token });
}
