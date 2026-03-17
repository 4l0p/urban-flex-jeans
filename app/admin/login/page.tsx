"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Estados para os campos
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Criamos uma rota de API simples para validar para não expor a senha no navegador
    try {
      const res = await fetch("/api/admin/login", {
        // O caminho agora inclui /api/
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.success) {
        // Se deu certo, redireciona
        router.push("/admin");
      } else {
        setError("E-mail ou senha incorretos.");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
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
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 rounded-lg text-center font-bold">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">
              E-mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-sky-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-500 hover:bg-sky-400 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 disabled:opacity-50"
          >
            {loading ? "Verificando..." : "ENTRAR NO SISTEMA"}
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
