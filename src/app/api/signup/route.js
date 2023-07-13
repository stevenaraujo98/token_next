import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    let body = null;
    
    try {
        body = await request.json()
    } catch {
        return NextResponse.json({
            error: 'Debe enviar un body'
        }, {status: 400});
    }

    const username = body?.username?.trim();

    if (!username) {
        return NextResponse.json({
            error: 'Debe enviar un username'
        }, {status: 400});
    }
    
    try {
        await prisma.$transaction(async (prisma) => {
            await prisma.user.create({
                data: {
                    username: username
                }
            });
        });
    } catch (error) {
        if (error?.code === 'P2002') {
            return NextResponse.json({
                error: 'El usuario ya existe'
            }, {status: 400});
        } else {
            return NextResponse.json({
                error: 'Ha ocurrido un error inesperado'
            }, {status: 500});
        }
    }

    return NextResponse.json({
        message: "Se ha creado el usuario",
    }, {status: 200});
}
