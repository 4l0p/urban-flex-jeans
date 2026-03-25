import { NextResponse } from "next/server";

const AWS_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://sua-api-na-aws.com";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    console.log("🪙 Solicitando PIX na AWS:", payload);

    const response = await fetch(`${AWS_API_URL}/checkout/pix`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const backendResult = await response.json();

    if (response.ok) {
      // Retorna os dados do PIX (o QR Code, a linha digitável, etc.) que o backend devolveu
      return NextResponse.json({ success: true, data: backendResult });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: backendResult.message || "Falha ao gerar o PIX.",
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Erro na rota de PIX:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro de comunicação com o servidor principal.",
      },
      { status: 500 },
    );
  }
}
