import { NextResponse } from "next/server";

// Fallback temporário, você deverá colocar isso nas suas variáveis de ambiente na Vercel ou onde for hospedar
const AWS_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://sua-api-na-aws.com";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    console.log("📦 Enviando Endereço para a AWS:", payload);

    const response = await fetch(`${AWS_API_URL}/checkout/address`, {
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
          message: backendResult.message || "Falha ao validar endereço.",
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Erro na rota de address:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro de comunicação com o servidor principal.",
      },
      { status: 500 },
    );
  }
}
