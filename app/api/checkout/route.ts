import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Instancia o cliente do Prisma
const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // 1. Recebe os dados enviados pelo Front-end
    const body = await request.json();
    const { customer, address, cart, paymentMethod, totalAmount } = body;

    // 2. Validação básica
    if (!customer || !address || !cart || cart.length === 0) {
      return NextResponse.json(
        { success: false, error: "Dados de checkout incompletos." },
        { status: 400 },
      );
    }

    // 3. Salva tudo no Banco de Dados em uma única ação (Nested Writes)
    const newOrder = await prisma.order.create({
      data: {
        totalAmount: totalAmount,
        paymentMethod: paymentMethod,
        status: "PENDING",

        // Cria o Cliente
        customer: {
          create: {
            name: customer.name,
            email: customer.email,
            cpf: customer.cpf,
            phone: customer.phone,
          },
        },

        // Cria o Endereço
        address: {
          create: {
            cep: address.cep,
            street: address.street,
            number: address.number,
            complement: address.complement || "",
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state,
          },
        },

        // Cria os Itens do carrinho
        items: {
          create: cart.map((item: any) => ({
            productName: item.name,
            size: item.size,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    // 4. Retorna sucesso para a loja
    return NextResponse.json({
      success: true,
      orderId: newOrder.id,
    });
  } catch (error) {
    console.error("Erro no checkout:", error);
    return NextResponse.json(
      { success: false, error: "Erro interno ao salvar pedido." },
      { status: 500 },
    );
  }
}
