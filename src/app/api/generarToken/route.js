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
  const username = searchParams.get("cliente")?.trim();

  if (!username) {
    return NextResponse.json({
        error: 'Debe enviar un username'
    }, {status: 400});
  }

  let user = null;
  let token = null;
  await prisma.$transaction(async (prisma) => {
    //
    user = await prisma.user.findFirst({
      where: {
        username: username
      }
    });

    const now = new Date();
    const expiredAt = new Date();
    expiredAt.setMinutes(now.getMinutes() + 1);

    const oldToken = await prisma.token.findFirst({
      where: {
        userId: user.id,
        isUsed: false,
        expiredAt: {
          gt: now, // expiresAt > now
        }
      }
    })
    if(!oldToken) {
      const newToken = await prisma.token.create({
        data: {
          userId: user.id,
          value: generateNumber(),
          expiredAt: expiredAt
        }
      })
      token = newToken;
    } else {
      token = oldToken;
    }    
  });

  if (!user) {
    return NextResponse.json({
        error: `El usuario ${username} no se encuentra registrado`
    }, {status: 400});
  }

  return NextResponse.json({ token: token.value, expiredAt: token.expiredAt, createdAt: token.createdAt });
}
