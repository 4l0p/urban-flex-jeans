"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/admin");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-foreground tracking-tighter mb-2">
            URBAN<span className="text-sky-500">FLEX</span>
          </h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest">
            Painel Administrativo
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">
              E-mail
            </label>
            <input
              type="email"
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-sky-500 transition-colors"
              placeholder="admin@urbanflex.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">
              Senha
            </label>
            <input
              type="password"
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-sky-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-500 hover:bg-sky-400 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
          >
            {loading ? "Acessando..." : "ENTRAR NO SISTEMA"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground text-xs transition-colors"
          >
            ← Voltar para a Loja
          </Link>
        </div>
      </div>
    </div>
  );
}
