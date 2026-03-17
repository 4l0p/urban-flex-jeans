import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Definimos quais rotas queremos proteger
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = request.nextUrl.pathname === "/admin/login";

  // 2. Verificamos se existe um cookie de sessão (vamos criar esse cookie no login)
  const isAuthenticated = request.cookies.get("admin_session");

  // REGRA A: Se tentar acessar admin sem estar logado, manda pro login
  if (isAdminPage && !isLoginPage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // REGRA B: Se já estiver logado e tentar ir pro login, manda pro dashboard
  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

// Configura o middleware para rodar apenas nas rotas do admin
export const config = {
  matcher: "/admin/:path*",
};
