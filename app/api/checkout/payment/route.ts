import { NextResponse } from "next/server";

const AWS_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://sua-api-na-aws.com";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    console.log("💳 Processando Pagamento na AWS:", payload);

    const response = await fetch(`${AWS_API_URL}/checkout/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const backendResult = await response.json();

    if (response.ok) {
      return NextResponse.json({ success: true, data: backendResult });
    } else {
      return NextResponse.json(
        {
          success: false,
          message:
            backendResult.message || "Pagamento recusado pela operadora.",
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Erro na rota de pagamento:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro de comunicação com o servidor de pagamentos.",
      },
      { status: 500 },
    );
  }
}
