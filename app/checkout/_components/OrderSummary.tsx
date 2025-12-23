"use client";

import { useState } from "react";

interface OrderSummaryProps {
  shippingMethod: "free" | "express";
  paymentMethod: "credit" | "pix" | "boleto";
  selectedSize: string; // <-- NOVO: Recebe o tamanho
  productPrice: number; // <-- NOVO: Recebe o preço
}

export default function OrderSummary({
  shippingMethod,
  paymentMethod,
  selectedSize,
  productPrice,
}: OrderSummaryProps) {
  const SHIPPING_COST_EXPRESS = 14.9;

  const [quantity, setQuantity] = useState(1);
  const [coupon, setCoupon] = useState("");

  // Usando os dados recebidos via props (agora dinâmicos)
  const subtotal = productPrice * quantity;
  const shippingCost = shippingMethod === "free" ? 0 : SHIPPING_COST_EXPRESS;

  const totalBeforeDiscount = subtotal + shippingCost;
  const pixDiscount = paymentMethod === "pix" ? totalBeforeDiscount * 0.05 : 0;
  const finalTotal = totalBeforeDiscount - pixDiscount;

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="space-y-4">
      <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl shadow-black/20">
        <h2 className="text-white font-bold text-sm uppercase tracking-wide mb-6 border-b border-zinc-800/50 pb-4">
          Resumo do Pedido
        </h2>

        {/* CUPOM */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Código do cupom"
            className="flex-1 h-10 bg-zinc-950 border border-zinc-800 rounded-lg px-3 text-xs text-white outline-none focus:border-zinc-700 transition-colors placeholder-zinc-600"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button className="h-10 px-4 bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-bold uppercase rounded-lg transition-colors border border-zinc-700">
            Adicionar
          </button>
        </div>

        {/* VALORES */}
        <div className="space-y-3 pb-6 border-b border-zinc-800 mb-6">
          <div className="flex justify-between text-xs text-zinc-400">
            <span>Produtos ({quantity}x)</span>
            <span className="text-white">
              {subtotal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>

          <div className="flex justify-between text-xs text-zinc-400">
            <span>Frete</span>
            <span
              className={
                shippingMethod === "free"
                  ? "text-green-500 font-bold"
                  : "text-white"
              }
            >
              {shippingMethod === "free"
                ? "Grátis"
                : `R$ ${SHIPPING_COST_EXPRESS.toFixed(2).replace(".", ",")}`}
            </span>
          </div>

          {paymentMethod === "pix" && (
            <div className="flex justify-between text-xs text-green-500 animate-in fade-in slide-in-from-left-2">
              <span>Desconto Pix (5%)</span>
              <span>
                -{" "}
                {pixDiscount.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center pt-3 mt-2 border-t border-zinc-800">
            <span className="text-white font-bold text-sm">Total</span>
            <span className="text-green-500 font-black text-xl">
              {finalTotal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        </div>

        {/* PRODUTO + DETALHES TÉCNICOS */}
        <div className="flex gap-4 items-start">
          <div className="w-20 h-24 rounded-lg bg-zinc-800 border border-zinc-700 overflow-hidden relative shrink-0">
            {/* Imagem do Produto (Se for sempre o mesmo kit, pode manter fixo. Se mudar, precisaria vir via URL também) */}
            <img
              src="/kit_img_checkout.png"
              className="w-full h-full object-cover"
              alt="Produto"
            />
          </div>

          <div className="flex-1">
            <p className="text-white font-bold text-xs leading-tight mb-2">
              Kit 2 Camisas Urban Flex Jeans
            </p>

            {/* Detalhes Técnicos dinâmicos */}
            <div className="space-y-1 mb-4">
              <p className="text-zinc-500 text-[10px]">
                {/* Aqui mostramos o tamanho que veio da URL */}
                <strong>Tamanho:</strong> {selectedSize || "Não selecionado"}
              </p>
              <p className="text-zinc-500 text-[10px]">
                <strong>Material:</strong> 100% Algodão Premium
              </p>
              <p className="text-zinc-500 text-[10px] leading-tight">
                Tecnologia FlexWeave c/ Micro Elasticidade para maior conforto.
              </p>
            </div>

            {/* Seletor de Quantidade */}
            <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-md w-fit px-2 h-8">
              <button
                onClick={handleDecrement}
                className="text-zinc-500 hover:text-white w-6 flex items-center justify-center transition-colors disabled:opacity-30"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="text-xs font-bold text-white w-4 text-center select-none">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="text-zinc-500 hover:text-white w-6 flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PROVA SOCIAL */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg opacity-80 hover:opacity-100 transition-opacity">
        <div className="flex gap-0.5 text-yellow-500 mb-3 text-xs">★★★★★</div>
        <p className="text-xs text-zinc-400 italic leading-relaxed mb-4">
          "Nunca me senti tão seguro em uma compra online! O processo de
          pagamento é rápido. Recomendo!"
        </p>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-white shadow-inner">
            LS
          </div>
          <div>
            <p className="text-white text-xs font-bold">Lucas S.</p>
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3 h-3 text-green-500"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-[10px] text-zinc-500">
                Cliente Verificado
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
