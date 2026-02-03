"use client";

import { useState } from "react";

interface OrderSummaryProps {
  shippingMethod: "free" | "express";
  paymentMethod: "credit" | "pix" | "boleto";
  selectedSize: string;
  productPrice: number;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export default function OrderSummary({
  shippingMethod,
  paymentMethod,
  selectedSize,
  productPrice,
  quantity,
  setQuantity,
}: OrderSummaryProps) {
  const SHIPPING_COST_EXPRESS = 14.9;

  const [coupon, setCoupon] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const subtotal = productPrice * quantity;
  const shippingCost = shippingMethod === "free" ? 0 : SHIPPING_COST_EXPRESS;
  const totalBeforeDiscount = subtotal + shippingCost;
  const pixDiscount = paymentMethod === "pix" ? totalBeforeDiscount * 0.05 : 0;

  const finalTotal = totalBeforeDiscount - pixDiscount;

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="space-y-4">
      <section className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl shadow-black/20">
        {/* --- CABEÇALHO MOBILE --- */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-6 bg-card md:hidden outline-none"
        >
          <div className="text-left">
            <h2 className="text-foreground font-bold text-sm uppercase tracking-wide">
              Resumo ({quantity})
            </h2>
            {!isOpen && (
              <p className="text-[10px] text-muted-foreground mt-1">
                Ver detalhes
              </p>
            )}
          </div>
          <div
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 text-muted-foreground"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </button>

        {/* --- CABEÇALHO DESKTOP --- */}
        <div className="hidden md:block p-6 pb-0">
          <h2 className="text-foreground font-bold text-sm uppercase tracking-wide mb-6 border-b border-border pb-4">
            Resumo do Pedido
          </h2>
        </div>

        {/* --- CONTEÚDO --- */}
        <div
          className={`px-6 pb-6 ${
            isOpen
              ? "block animate-in slide-in-from-top-2 fade-in duration-300"
              : "hidden"
          } md:block border-t border-border md:border-t-0 pt-4 md:pt-0`}
        >
          {/* Inputs de Cupom */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Código do cupom"
              className="flex-1 h-10 bg-input border border-border rounded-lg px-3 text-xs text-foreground outline-none focus:border-muted-foreground transition-colors placeholder-muted-foreground"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />

            <button className="h-10 px-4 bg-sky-600 hover:bg-sky-500 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white text-[10px] font-bold uppercase rounded-lg transition-all shadow-lg shadow-sky-500/20 dark:shadow-none active:scale-95 border border-transparent dark:border-zinc-700">
              Adicionar
            </button>
          </div>

          <div className="space-y-3 pb-6 border-b border-border mb-6">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Produtos ({quantity}x)</span>
              <span className="text-foreground">
                {subtotal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Frete</span>
              <span
                className={
                  shippingMethod === "free"
                    ? "text-green-500 font-bold"
                    : "text-foreground"
                }
              >
                {shippingMethod === "free"
                  ? "Grátis"
                  : `R$ ${SHIPPING_COST_EXPRESS.toFixed(2).replace(".", ",")}`}
              </span>
            </div>
            {paymentMethod === "pix" && (
              <div className="flex justify-between text-xs text-green-500">
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
            <div className="flex justify-between items-center pt-3 mt-2 border-t border-border">
              <span className="text-foreground font-bold text-sm">Total</span>
              <span className="text-green-500 font-black text-xl">
                {finalTotal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            {/* MUDANÇA AQUI: Removido bg-muted para ficar transparente */}
            <div className="w-20 h-24 rounded-lg border border-border overflow-hidden relative shrink-0">
              <img
                src="/kit_img_checkout.png"
                className="w-full h-full object-cover"
                alt="Produto"
              />
            </div>
            <div className="flex-1">
              <p className="text-foreground font-bold text-xs leading-tight mb-2">
                Kit 2 Camisas Urban Flex Jeans
              </p>
              <div className="space-y-1 mb-4">
                <p className="text-muted-foreground text-[10px]">
                  <strong>Tamanho:</strong> {selectedSize || "Não selecionado"}
                </p>
                <p className="text-muted-foreground text-[10px]">
                  <strong>Material:</strong> 100% Algodão Premium
                </p>
                <p className="text-muted-foreground text-[10px] leading-tight">
                  Tecnologia FlexWeave c/ Micro Elasticidade.
                </p>
              </div>
              <div className="flex items-center gap-3 bg-input border border-border rounded-md w-fit px-2 h-8">
                <button
                  onClick={handleDecrement}
                  className="text-muted-foreground hover:text-foreground w-6 flex items-center justify-center transition-colors disabled:opacity-30"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="text-xs font-bold text-foreground w-4 text-center select-none">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="text-muted-foreground hover:text-foreground w-6 flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
