import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// IMPORTANTE: Aqui você vai precisar da URL real da sua API na AWS.
// Vamos usar uma variável de ambiente, mas deixei um fallback temporário.
const AWS_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://sua-api-na-aws.com";

export async function POST(request: Request) {
  try {
    // 1. Recebe os dados do nosso front-end
    const data = await request.json();
    const { name, email, cpf, phone } = data;

    // 2. Monta o Payload exatamente como o backend exige (De > Para)
    const payloadParaBackend = {
      nomeCompleto: name,
      email: email,
      // O backend pode preferir CPF sem pontuação, mas vamos mandar como está por enquanto
      cpf: cpf.replace(/\D/g, ""),
      celular: phone,
      // Gerando um ID único temporário se o backend não passar um primeiro
      checkoutId: uuidv4(),
    };

    console.log("📤 Enviando para a AWS:", payloadParaBackend);

    // 3. Faz a requisição para a sua infraestrutura na AWS
    const response = await fetch(`${AWS_API_URL}/checkout/identify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadParaBackend),
    });

    const backendResult = await response.json();

    // 4. Retorna a resposta para o frontend
    if (response.ok) {
      return NextResponse.json({ success: true, data: backendResult });
    } else {
      return NextResponse.json(
        { success: false, message: backendResult.message || "Falha na API" },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Erro na rota de identify:", error);
    return NextResponse.json(
      { success: false, message: "Erro de servidor." },
      { status: 500 },
    );
  }
}
