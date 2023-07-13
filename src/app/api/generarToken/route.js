import { NextResponse } from "next/server";

function generateNumber() {
  // Generar número aleatorio de 6 dígitos
  const min = 1;
  const max = 999999;
  // Math.random() * 900000;
  // return Math.floor() + 100000;
  const token = Math.floor(Math.random() * (max - min) + min);

  return token.toString().padStart(6, "0");
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const cliente = searchParams.get("cliente");
  console.log(generateNumber());

  return NextResponse.json({ cliente });
}
