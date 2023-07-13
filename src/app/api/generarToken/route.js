import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateNumber() {
  // Generar número aleatorio de 6 dígitos
  const min = 1;
  const max = 999999;
  const token = Math.floor(Math.random() * (max - min + 1) + min);
  return token.toString().padStart(6, "0");
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const clientField = searchParams.get("cliente");
  
  await prisma.$transaction(async (prisma) => {
    //
  });

  console.log(generateNumber());

  return NextResponse.json({ cliente, token: generateNumber()});
}
