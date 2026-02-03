"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<any>(null);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    setOrderId(`#UF-${randomId}`);

    const storedData = sessionStorage.getItem("checkoutData");
    if (storedData) {
      setOrderData(JSON.parse(storedData));
    }
  }, []);

  if (
    !orderData &&
    typeof window !== "undefined" &&
    !sessionStorage.getItem("checkoutData")
  ) {
    return (
      // MUDANÇA: bg-zinc-950 -> bg-background | text-white -> text-foreground
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-foreground">
        <p>Carregando pedido...</p>
        <Link href="/" className="text-sky-500 hover:underline mt-4 text-sm">
          Voltar para a loja
        </Link>
      </div>
    );
  }

  // Fallback visual
  const data = orderData || {
    address: {
      street: "Rua Exemplo",
      number: "123",
      neighborhood: "Bairro",
      city: "Cidade",
      state: "UF",
    },
    shipping: "express",
    paymentMethod: "credit",
    price: 99.9,
  };

  // --- LÓGICA DE CÁLCULO ---
  const hasDiscount =
    data.paymentMethod === "pix" || data.paymentMethod === "boleto";

  const productFinalPrice = hasDiscount ? data.price * 0.95 : data.price;

  const shippingCost = data.shipping === "free" ? 0 : 14.9;

  const totalValue = productFinalPrice + shippingCost;

  return (
    // MUDANÇA: bg-zinc-950 -> bg-background | text-zinc-300 -> text-muted-foreground
    <div className="min-h-screen bg-background text-muted-foreground font-sans selection:bg-green-500/30 pb-20 transition-colors duration-300">
      {/* HEADER */}
      {/* MUDANÇA: bg-zinc-950 -> bg-background | border-zinc-800 -> border-border */}
      <header className="h-20 border-b border-border flex items-center justify-center bg-background sticky top-0 z-50">
        <Link
          href="/"
          // MUDANÇA: text-white -> text-foreground
          className="font-alt text-2xl font-black text-foreground tracking-tighter"
        >
          URBAN<span className="text-sky-500">FLEX</span>{" "}
          <span className="text-sky-500">.</span>
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 pt-10">
        <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="black" // Ícone preto para contrastar com o verde
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          {/* MUDANÇA: text-white -> text-foreground */}
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2 tracking-tight">
            Pedido Confirmado!
          </h1>
          {/* MUDANÇA: text-zinc-400 -> text-muted-foreground */}
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            Obrigado pela compra. Enviamos um e-mail de confirmação para você.
          </p>
          {/* MUDANÇA: bg-zinc-900 -> bg-muted/20 | border-zinc-800 -> border-border | text-zinc-300 -> text-muted-foreground */}
          <div className="mt-6 inline-block bg-muted/20 border border-border rounded-full px-6 py-2 text-sm font-mono text-muted-foreground">
            {/* MUDANÇA: text-white -> text-foreground */}
            Pedido: <span className="text-foreground font-bold">{orderId}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
          {/* CARTÃO DO PRODUTO */}
          {/* MUDANÇA: bg-zinc-900/50 -> bg-card | border-zinc-800 -> border-border */}
          <section className="bg-card border border-border rounded-2xl p-6 md:col-span-2">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                  clipRule="evenodd"
                />
              </svg>
              Resumo da Compra
            </h2>
            <div className="flex gap-4 items-start">
              {/* MUDANÇA: bg-zinc-800 -> bg-muted | border-zinc-700 -> border-border */}
              <div className="w-20 h-24 bg-muted rounded-lg overflow-hidden shrink-0 border border-border">
                <img
                  src="/kit_img_checkout.png"
                  className="w-full h-full object-cover"
                  alt="Produto"
                />
              </div>
              <div className="flex-1">
                {/* MUDANÇA: text-white -> text-foreground */}
                <h3 className="text-foreground font-bold text-sm mb-1">
                  Kit 2 Camisas Urban Flex Jeans
                </h3>
                {/* MUDANÇA: text-zinc-400 -> text-muted-foreground */}
                <p className="text-xs text-muted-foreground mb-2">
                  Tamanho: {/* MUDANÇA: text-zinc-200 -> text-foreground */}
                  <span className="text-foreground font-medium">
                    {data.size || "M"}
                  </span>
                </p>
                {/* MUDANÇA: border-zinc-800/50 -> border-border/50 */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">
                    Total Pago
                  </span>
                  <span className="text-green-500 font-bold text-lg">
                    {totalValue.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* DETALHES DE ENTREGA */}
          {/* MUDANÇA: bg-zinc-900/50 -> bg-card | border-zinc-800 -> border-border */}
          <section className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M3.375 4.5C2.339 4.5 1.5 5.339 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
                <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
                <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
              </svg>
              Endereço de Entrega
            </h2>
            {/* MUDANÇA: text-zinc-300 -> text-muted-foreground */}
            <div className="space-y-1 text-sm text-muted-foreground">
              {/* MUDANÇA: text-white -> text-foreground */}
              <p className="font-bold text-foreground">
                {data.address?.street}, {data.address?.number}
              </p>
              <p>{data.address?.neighborhood}</p>
              <p>
                {data.address?.city} - {data.address?.state}
              </p>
              {/* MUDANÇA: border-zinc-800 -> border-border */}
              <p className="text-zinc-500 text-xs mt-2 pt-2 border-t border-border">
                Método: {/* MUDANÇA: text-zinc-300 -> text-foreground */}
                <span className="text-foreground">
                  {data.shipping === "express"
                    ? "Expresso (2-3 dias)"
                    : "Grátis (5-7 dias)"}
                </span>
              </p>
            </div>
          </section>

          {/* FORMA DE PAGAMENTO */}
          {/* MUDANÇA: bg-zinc-900/50 -> bg-card | border-zinc-800 -> border-border */}
          <section className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                  clipRule="evenodd"
                />
              </svg>
              Pagamento
            </h2>
            <div className="flex items-center gap-3">
              {data.paymentMethod === "pix" && (
                <>
                  <img src="/pix.png" alt="Pix" className="h-6 opacity-80" />
                  <div>
                    {/* MUDANÇA: text-white -> text-foreground */}
                    <p className="text-foreground text-sm font-bold">
                      Pix (Aprovado)
                    </p>
                    {/* MUDANÇA: text-zinc-500 -> text-muted-foreground */}
                    <p className="text-xs text-muted-foreground">
                      Pagamento instantâneo
                    </p>
                  </div>
                </>
              )}
              {data.paymentMethod === "credit" && (
                <>
                  {/* MUDANÇA: bg-zinc-800 -> bg-muted | border-zinc-700 -> border-border */}
                  <div className="w-10 h-7 bg-muted rounded border border-border flex items-center justify-center">
                    {/* MUDANÇA: bg-zinc-600/50 -> bg-muted-foreground/30 */}
                    <div className="w-6 h-4 bg-muted-foreground/30 rounded-sm"></div>
                  </div>
                  <div>
                    {/* MUDANÇA: text-white -> text-foreground */}
                    <p className="text-foreground text-sm font-bold">
                      Cartão de Crédito
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Final **** (Processado)
                    </p>
                  </div>
                </>
              )}
              {data.paymentMethod === "boleto" && (
                <>
                  {/* MUDANÇA: bg-zinc-800 -> bg-muted */}
                  <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      // MUDANÇA: text-white -> text-foreground
                      className="w-6 h-6 text-foreground"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
                      />
                    </svg>
                  </div>
                  <div>
                    {/* MUDANÇA: text-white -> text-foreground */}
                    <p className="text-foreground text-sm font-bold">
                      Boleto Bancário
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Aguardando pagamento
                    </p>
                    <button className="text-[10px] text-sky-500 hover:text-sky-400 font-bold mt-1 uppercase tracking-wide">
                      Ver Boleto
                    </button>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>

        <div className="mt-10 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <Link
            href="/"
            // MUDANÇA: bg-white -> bg-foreground | text-black -> text-background
            // MUDANÇA: hover:bg-zinc-200 -> hover:opacity-90
            className="bg-foreground hover:opacity-90 text-background font-bold py-4 px-10 rounded-full transition-all inline-flex items-center gap-2 transform hover:scale-105 shadow-lg shadow-black/10 dark:shadow-white/10"
          >
            VOLTAR PARA A LOJA
          </Link>
        </div>
      </main>
    </div>
  );
}
