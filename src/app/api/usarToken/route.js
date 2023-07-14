import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ApiError } from "@/utils/errors";
import { ApiResponse } from "@/utils/responses";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const apiResponse = new ApiResponse(null, 200);
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("cliente")?.trim();
    const tokenValue = searchParams.get("token")?.trim();

    if (!username) {
      throw new ApiError("Falta el parametro cliente en la consulta", 400);
    }
    if (!tokenValue) {
      throw new ApiError("Falta el parametro token en la consulta", 400);
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
      token = await prisma.token.findFirst({
        where: {
          userId: user.id,
          isUsed: false,
          value: tokenValue,
          expiredAt: {
            gt: now,
          },
        },
      });
      if (token) {
        await prisma.token.update({
          where: {
            id: token.id,
          },
          data: {
            isUsed: true,
          },
        });
      }
    });

    if (!token) {
      throw new ApiError(`El token no es valido`, 400);
    }

    apiResponse.data = {
      message: "Se ha validado el token",
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
