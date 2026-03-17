import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const response = NextResponse.json({ success: true });

    // Cria o cookie de sessão que dura 24 horas
    response.cookies.set("admin_session", "true", {
      httpOnly: true, // Segurança: o navegador não consegue ler via script
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 dia
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
