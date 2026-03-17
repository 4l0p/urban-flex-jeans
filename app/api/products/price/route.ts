import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // 1. Busca o produto no banco pelo nome que definimos no Admin
    const product = await prisma.product.findFirst({
      where: { name: { contains: "Kit 2 Camisas" } },
    });

    // 2. Retorna o preço real do banco.
    // Se o produto ainda não existir, envia 99.90 para não travar o Checkout.
    return NextResponse.json({
      price: product?.price || 99.9,
    });
  } catch (error) {
    // 3. Caso o banco de dados falhe (erro de conexão),
    // envia o preço padrão como segurança.
    console.error("Erro na API de preço:", error);
    return NextResponse.json({ price: 99.9 });
  }
}
