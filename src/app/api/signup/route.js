import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ApiError } from "@/utils/errors";
import { ApiResponse } from "@/utils/responses";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    let body = null;

    try {
      body = await request.json();
    } catch {
      throw new ApiError("Debe enviar un body", 400);
    }

    const username = body?.username?.trim();

    if (!username) {
      throw new ApiError("Debe enviar un username", 400);
    }

    await prisma.user.create({
      data: {
        username: username,
      },
    });

    const apiResponse = new ApiResponse(
      {
        message: "Usuario creado correctamente",
      },
      201
    );

    return NextResponse.json(apiResponse.toJson(), {
      status: apiResponse.statusCode,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.toJson(), { status: error.statusCode });
    } else {
      const customError = new ApiError();
      if (error?.code === "P2002") {
        customError.message = "El usuario ya existe";
      }
      return NextResponse.json(customError.toJson(), {
        status: customError.statusCode,
      });
    }
  }
}
