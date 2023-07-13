import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("cliente")?.trim();
  const tokenValue = searchParams.get("token")?.trim();

  if (!username || !tokenValue) {
    return NextResponse.json({
        error: 'Debe enviar un username y un token'
    }, {status: 400});
  }

  const user = await prisma.user.findFirst({
    where: {
      username: username
    }
  });
  if (!user) {
    return NextResponse.json({
        error: `El usuario ${username} no se encuentra registrado`
    }, {status: 400});
  }

  let token = null;
  
  await prisma.$transaction(async (prisma) => {
    const now = new Date();
    token = await prisma.token.findFirst({
      where: {
        userId: user.id,
        isUsed: false,
        value: tokenValue,
        expiredAt: {
          gt: now
        }
      }
    })
    if (token) {
      await prisma.token.update({
        where: {
          id: token.id
        },
        data: {
          isUsed: true
        }
      });
    }
  });

  if (!token) {
    return NextResponse.json({
        error: `El token no es valido`
    }, {status: 400});
  }

  return NextResponse.json({
      message: "Se ha validado el token",
  }, {status: 200});
  
}
