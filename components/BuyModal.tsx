"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "../context/ModalContext";

export default function BuyModal() {
  const { isOpen, closeModal } = useModal();
  const router = useRouter();

  const [size, setSize] = useState("");
  const [shipping, setShipping] = useState<"free" | "express">("free");
  const [isTableOpen, setIsTableOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const sizes = ["PP", "P", "M", "G", "GG", "XG", "XGG"];

  if (!isOpen) return null;

  const basePrice = 99.9;
  const totalPrice = basePrice + (shipping === "express" ? 14.9 : 0);

  const sizeData = [
    { tam: "PP", peito: "96", ombro: "42", comp: "69", manga: "63" },
    { tam: "P", peito: "100", ombro: "44", comp: "70", manga: "64" },
    { tam: "M", peito: "104", ombro: "46", comp: "71", manga: "65" },
    { tam: "G", peito: "108", ombro: "48", comp: "72", manga: "66" },
    { tam: "GG", peito: "112", ombro: "50", comp: "73", manga: "67" },
    { tam: "XG", peito: "116", ombro: "52", comp: "74", manga: "68" },
    { tam: "XGG", peito: "120", ombro: "54", comp: "75", manga: "69" },
  ];

  const selectedSizeData = sizeData.find((data) => data.tam === size);

  const handleSelectSize = (selectedSize: string) => {
    setSize(selectedSize);
    if (sizeError) setSizeError(false);
    setIsTableOpen(false);
  };

  const handleCheckout = () => {
    if (!size) {
      setSizeError(true);
      return;
    }
    setLoading(true);

    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "checkoutData",
        JSON.stringify({
          size,
          shipping,
          price: basePrice,
        }),
      );
    }

    setTimeout(() => {
      router.push("/checkout");
      closeModal();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[110] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      />

      {/* Sidebar - MUDANÇA: bg-zinc-950 -> bg-background | border-zinc-800 -> border-border */}
      <div className="relative w-full max-w-md h-full bg-background border-l border-border shadow-2xl flex flex-col animate-slide-in-right transition-colors duration-300">
        {/* Header Compacto - MUDANÇA: bg-zinc-950 -> bg-background | border-zinc-800 -> border-border */}
        <div className="px-4 py-3 border-b border-border flex justify-between items-center bg-background shrink-0">
          {/* MUDANÇA: text-white -> text-foreground */}
          <h2 className="text-base font-bold text-foreground tracking-tight">
            Kit 2 Camisas Urban Flex
          </h2>
          <button
            onClick={closeModal}
            // MUDANÇA: text-gray-400 -> text-muted-foreground | hover:text-white -> hover:text-foreground
            // MUDANÇA: bg-zinc-900 -> bg-muted/50 | hover:bg-zinc-800 -> hover:bg-muted
            className="text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 flex flex-col p-4 overflow-y-auto">
          {/* Imagens (Altura h-28) */}
          <div className="flex gap-2 h-28 mb-3 shrink-0">
            {/* MUDANÇA: border-zinc-800 -> border-border */}
            <div className="flex-1 relative rounded-lg overflow-hidden border border-border group">
              <img
                src="https://4l0p.github.io/shirt/assets/azul_escuro_principal.png"
                alt="Deep Blue"
                className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[8px] px-1.5 rounded">
                Deep Blue
              </div>
            </div>
            {/* MUDANÇA: border-zinc-800 -> border-border */}
            <div className="flex-1 relative rounded-lg overflow-hidden border border-border group">
              <img
                src="https://4l0p.github.io/shirt/assets/azul_claro_principal.png"
                alt="Sky Blue"
                className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[8px] px-1.5 rounded">
                Sky Blue
              </div>
            </div>
          </div>

          {/* Seleção de Tamanho */}
          <div className="mb-2 shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <span
                // MUDANÇA: text-white -> text-foreground
                className={`font-bold text-xs uppercase tracking-wider transition-colors duration-300 ${
                  sizeError ? "text-red-500 animate-pulse" : "text-foreground"
                }`}
              >
                {sizeError ? "⚠️ SELECIONE:" : "Tamanho (Válido p/ as 2)"}
              </span>
              {size && (
                <span className="text-[10px] text-sky-500 font-bold bg-sky-500/10 px-2 rounded border border-sky-500/20">
                  {size} Selecionado
                </span>
              )}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSelectSize(s)}
                  // MUDANÇA: border-zinc-800 -> border-border | bg-zinc-900 -> bg-muted/20
                  // MUDANÇA: text-gray-400 -> text-muted-foreground
                  className={`h-9 rounded border font-bold transition-all text-xs flex items-center justify-center ${
                    size === s
                      ? "bg-sky-600 border-sky-600 text-white shadow-md shadow-sky-900/30 scale-105 z-10"
                      : sizeError
                        ? "border-red-500 text-red-500 bg-red-500/10"
                        : "border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground bg-muted/20"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* ÁREA DE MEDIDAS */}
          <div className="mb-2 shrink-0">
            {selectedSizeData ? (
              <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-2 animate-fade-in">
                <div className="flex items-center gap-2 mb-1.5 justify-center">
                  <span className="text-sky-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
                      />
                    </svg>
                    Medidas do {selectedSizeData.tam} (cm)
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {["Peito", "Ombro", "Comp", "Manga"].map((label) => {
                    const key = label.toLowerCase();
                    return (
                      // MUDANÇA: bg-zinc-950/80 -> bg-background/80
                      <div
                        key={label}
                        className="bg-background/80 rounded p-1 border border-sky-500/10"
                      >
                        {/* MUDANÇA: text-gray-500 -> text-muted-foreground */}
                        <span className="block text-[8px] text-muted-foreground uppercase">
                          {label}
                        </span>
                        {/* MUDANÇA: text-white -> text-foreground */}
                        <span className="block text-xs font-bold text-foreground">
                          {
                            selectedSizeData[
                              key as keyof typeof selectedSizeData
                            ]
                          }
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              // Tabela Completa Compacta
              // MUDANÇA: border-zinc-800 -> border-border | bg-zinc-900/30 -> bg-muted/10
              <div className="border border-border rounded-lg bg-muted/10 overflow-hidden transition-all duration-300">
                <button
                  onClick={() => setIsTableOpen(!isTableOpen)}
                  // MUDANÇA: text-gray-400 -> text-muted-foreground | hover:text-white -> hover:text-foreground
                  // MUDANÇA: bg-zinc-900 -> bg-muted/30 | hover:bg-zinc-800/50 -> hover:bg-muted/50
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors bg-muted/30"
                >
                  <span className="flex items-center gap-2 text-[10px]">
                    📏 Dúvida no tamanho? Ver Tabela
                  </span>
                  <span
                    className={`transition-transform duration-300 text-[10px] ${
                      isTableOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {isTableOpen && (
                  // MUDANÇA: border-zinc-800 -> border-border | bg-zinc-950/50 -> bg-background/50
                  <div className="border-t border-border bg-background/50 p-1">
                    <table className="w-full text-center text-[9px]">
                      {/* MUDANÇA: text-zinc-500 -> text-muted-foreground | border-zinc-800 -> border-border */}
                      <thead className="text-muted-foreground font-bold border-b border-border">
                        <tr>
                          <th className="py-1">Tam</th>
                          <th className="py-1">Peito</th>
                          <th className="py-1">Ombro</th>
                          <th className="py-1">Comp</th>
                          <th className="py-1">Manga</th>
                        </tr>
                      </thead>
                      {/* MUDANÇA: divide-zinc-800/50 -> divide-border/50 */}
                      <tbody className="divide-y divide-border/50">
                        {sizeData.map((row) => (
                          <tr
                            key={row.tam}
                            onClick={() => handleSelectSize(row.tam)}
                            // MUDANÇA: text-zinc-400 -> text-muted-foreground | hover:bg-zinc-800 -> hover:bg-muted/30 | hover:text-white -> hover:text-foreground
                            className="text-muted-foreground hover:bg-muted/30 cursor-pointer hover:text-foreground transition-colors"
                          >
                            {/* MUDANÇA: text-white -> text-foreground */}
                            <td className="py-0.5 font-bold text-foreground">
                              {row.tam}
                            </td>
                            <td className="py-0.5">{row.peito}</td>
                            <td className="py-0.5">{row.ombro}</td>
                            <td className="py-0.5">{row.comp}</td>
                            <td className="py-0.5">{row.manga}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Frete */}
          <div className="shrink-0 mt-auto">
            {/* MUDANÇA: text-white -> text-foreground */}
            <span className="text-foreground font-bold text-xs uppercase tracking-wider mb-1.5 block">
              Envio
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShipping("free")}
                // MUDANÇA: bg-zinc-900 -> bg-muted/20 | border-zinc-800 -> border-border | hover:border-zinc-700 -> hover:border-muted-foreground
                className={`p-2.5 rounded-lg border text-left transition-all relative ${
                  shipping === "free"
                    ? "bg-sky-500/10 border-green-500 shadow-[0_0_15px_rgba(14,165,233,0.1)]"
                    : "bg-muted/20 border-border hover:border-muted-foreground"
                }`}
              >
                <div className="flex justify-between items-center mb-0.5">
                  <span
                    className={`font-bold text-xs ${
                      shipping === "free" ? "text-green-500" : "text-foreground"
                    }`}
                  >
                    Grátis
                  </span>
                  {shipping === "free" && (
                    <span className="text-green-500 text-[10px]">✓</span>
                  )}
                </div>
                {/* MUDANÇA: text-gray-500 -> text-muted-foreground */}
                <p className="text-muted-foreground text-[9px]">7-15 dias</p>
              </button>

              <button
                onClick={() => setShipping("express")}
                // MUDANÇA: bg-zinc-900 -> bg-muted/20 | border-zinc-800 -> border-border
                className={`p-2.5 rounded-lg border text-left transition-all relative ${
                  shipping === "express"
                    ? "bg-blue-600/10 border-blue-600"
                    : "bg-muted/20 border-border hover:border-muted-foreground"
                }`}
              >
                <div className="flex justify-between items-center mb-0.5">
                  <span
                    className={`font-bold text-xs ${
                      shipping === "express"
                        ? "text-blue-500"
                        : "text-foreground"
                    }`}
                  >
                    Expresso
                  </span>
                  <span className="text-foreground font-bold text-[9px]">
                    +R$14,90
                  </span>
                </div>
                <p className="text-muted-foreground text-[9px]">2-5 dias</p>
              </button>
            </div>
          </div>
        </div>

        {/* Rodapé Fixo */}
        {/* MUDANÇA: bg-zinc-950 -> bg-background | border-zinc-800 -> border-border */}
        <div className="p-4 border-t border-border bg-background shrink-0 z-20 shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
          <div className="flex justify-between items-end mb-3">
            {/* MUDANÇA: text-gray-400 -> text-muted-foreground */}
            <div className="text-muted-foreground text-xs">
              <p>Subtotal: R$ 99,90</p>
              <p
                className={
                  shipping === "free" ? "text-green-600" : "text-sky-600"
                }
              >
                Frete: {shipping === "free" ? "Grátis" : "R$ 14,90"}
              </p>
            </div>
            <div className="text-right">
              {/* MUDANÇA: text-gray-300 -> text-muted-foreground */}
              <p className="text-[10px] text-muted-foreground uppercase font-bold mb-0.5">
                Total
              </p>
              <p className="font-alt text-2xl font-black text-sky-500 leading-none">
                {totalPrice.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="group relative w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-sky-500 hover:to-blue-600 text-white font-bold py-4 rounded-lg uppercase tracking-widest shadow-lg shadow-sky-900/20 transform active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              "Processando..."
            ) : (
              <>
                <span className="text-sm md:text-base">FINALIZAR COMPRA</span>
                <div className="absolute right-6 flex items-center group-hover:translate-x-1 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </>
            )}
          </button>

          <div className="flex justify-center items-center gap-3 mt-3 text-sky-500 text-[9px] uppercase tracking-wider opacity-80">
            <span className="flex items-center gap-1">🔒 Compra Segura</span>
            <span>•</span>
            <span>Satisfação Garantida</span>
          </div>
        </div>
      </div>
    </div>
  );
}
