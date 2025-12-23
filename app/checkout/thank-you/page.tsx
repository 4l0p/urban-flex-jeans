"use client";

import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center p-6">
      {/* Animação de Sucesso Fixa */}
      <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(34,197,94,0.4)] animate-in zoom-in duration-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="black"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </div>

      <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tighter">
        PEDIDO CONFIRMADO!
      </h1>
      <p className="text-zinc-400 mb-8 max-w-md">
        Obrigado pela compra. Você receberá os detalhes e o código de rastreio
        no seu e-mail em breve.
      </p>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8 w-full max-w-sm">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-zinc-500">Pedido:</span>
          <span className="text-white font-mono font-bold">#98234-BR</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500">Previsão:</span>
          <span className="text-green-500 font-bold">2 a 5 dias úteis</span>
        </div>
      </div>

      <Link
        href="/"
        className="px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-full uppercase tracking-widest text-sm transition-all"
      >
        Voltar para a Loja
      </Link>
    </div>
  );
}
