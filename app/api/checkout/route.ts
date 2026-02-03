import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    // 1. Receber os dados que vêm do formulário (Front-end)
    const body = await request.json();
    const { customer, address, cart, paymentMethod, totalAmount } = body;

    // 2. Usar o Prisma para criar TUDO no banco de dados em uma única transação
    const order = await prisma.order.create({
      data: {
        totalAmount: totalAmount,
        paymentMethod: paymentMethod,
        status: "PENDING", // Começa como pendente

        // Criar o Cliente vinculado a este pedido
        customer: {
          create: {
            name: customer.name,
            email: customer.email,
            cpf: customer.cpf,
            phone: customer.phone,
          },
        },

        // Criar o Endereço vinculado a este pedido
        address: {
          create: {
            street: address.street,
            number: address.number,
            complement: address.complement,
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state,
            cep: address.cep,
          },
        },

        // Criar os Itens do carrinho vinculados a este pedido
        items: {
          create: cart.map((item: any) => ({
            productName: item.name,
            size: item.size || "U", // Pega o tamanho ou 'U' se não tiver
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    // 3. Devolver sucesso e o ID do pedido criado
    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error("Erro ao processar pedido:", error);
    return NextResponse.json(
      { success: false, error: "Erro ao criar pedido no banco de dados" },
      { status: 500 }
    );
  }
}
