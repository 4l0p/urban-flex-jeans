import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    const updatedOrder = await prisma.order.update({
      where: { id: id },
      data: { status: status },
    });

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
