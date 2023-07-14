import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ApiResponse } from "@/utils/responses";

const prisma = new PrismaClient();

export async function GET() {
  const apiResponse = new ApiResponse(null, 200);

  const users = await prisma.user.findMany();

  console.log("asasas");
  console.log(users);

  apiResponse.data = users;
  return NextResponse.json(apiResponse.toJson(), {
    status: apiResponse.statusCode,
  });
}
