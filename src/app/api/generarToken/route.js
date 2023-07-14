import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ApiError } from "@/utils/errors";
import { ApiResponse } from "@/utils/responses";

const prisma = new PrismaClient();

function generateNumber() {
  // Generar número aleatorio de 6 dígitos
  const min = 1;
  const max = 999999;
  const token = Math.floor(Math.random() * (max - min + 1) + min);
  return token.toString().padStart(6, "0");
}

export async function GET(request) {
  try {
    const apiResponse = new ApiResponse(null, 200);
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("cliente")?.trim();

    if (!username) {
      throw new ApiError("Falta el parametro cliente en la consulta", 400);
    }

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      throw new ApiError(
        `El usuario ${username} no se encuentra registrado`,
        404
      );
    }

    let token = null;
    await prisma.$transaction(async (prisma) => {
      const now = new Date();
      const expiredAt = new Date();
      // expiredAt.setMinutes(now.getMinutes() + 1);
      expiredAt.setSeconds(now.getSeconds() + 59);

      const oldToken = await prisma.token.findFirst({
        where: {
          userId: user.id,
          isUsed: false,
          expiredAt: {
            gt: now, // expiresAt > now
          },
        },
      });
      
      if (!oldToken) {
        const newToken = await prisma.token.create({
          data: {
            userId: user.id,
            value: generateNumber(),
            expiredAt: expiredAt,
          },
        });
        token = newToken;
      } else {
        token = oldToken;
      }
    });

    apiResponse.data = {
      token: token.value,
      expiredAt: token.expiredAt,
      createdAt: token.createdAt,
    };

    return NextResponse.json(apiResponse.toJson(), {
      status: apiResponse.statusCode,
    });

  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.toJson(), { status: error.statusCode });
    } else {
      const customError = new ApiError();
      return NextResponse.json(customError.toJson(), {
        status: customError.statusCode,
      });
    }
  }
}
