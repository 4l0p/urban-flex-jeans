"use client";

import { useModal } from "@/context/ModalContext";

export default function ProductShowcase() {
  const { openModal } = useModal();

  return (
    <section
      id="colecao"
      // MUDANÇA: bg-zinc-950 -> bg-background | border-zinc-900 -> border-border
      className="w-full bg-background py-24 px-4 md:px-0 border-t border-border transition-colors duration-300"
    >
      {/* TÍTULO */}
      <div className="text-center mb-10 relative z-10">
        <span className="text-sky-500 font-bold tracking-[0.3em] uppercase text-xs md:text-sm">
          Best Seller
        </span>
        {/* MUDANÇA: text-white -> text-foreground */}
        <h2 className="text-4xl md:text-6xl font-black text-foreground mt-3 tracking-tighter">
          O KIT{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-700">
            ESSENCIAL
          </span>
        </h2>
        {/* MUDANÇA: text-gray-400 -> text-muted-foreground */}
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-lg px-4">
          Leve as duas cores mais versáteis da moda masculina e esteja pronto
          para qualquer ocasião.
        </p>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* IMAGENS DAS CAMISAS */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-0 md:gap-4 relative pb-48 md:pb-0">
          {/* CAMISA 1 */}
          <div className="w-full md:w-1/2 h-[450px] md:h-[700px] relative group overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none border border-border hover:border-sky-500/50 transition-all duration-500">
            <img
              src="https://4l0p.github.io/shirt/assets/azul_escuro_principal.png"
              alt="Camisa Deep Blue"
              className="absolute inset-0 w-full h-full object-cover opacity-90 md:opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            />
            {/* MUDANÇA: bg-black/60 -> bg-black/70 (Fixo escuro para contraste com a foto) e borda sutil */}
            <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-md px-4 py-2 rounded text-white font-bold text-sm uppercase tracking-wider border border-white/10 z-10">
              01. Deep Blue
            </div>
            {/* MUDANÇA: from-zinc-950 -> from-background (Faz a imagem fundir com o fundo da página) */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
          </div>

          {/* SÍMBOLO MAIS (+) */}
          {/* MUDANÇA: bg-black -> bg-background | border-zinc-800 -> border-border | text-white -> text-foreground */}
          <div className="z-20 -my-6 md:my-0 md:-mx-12 relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-background border-4 border-border rounded-full shadow-[0_0_40px_rgba(56,189,248,0.3)] animate-pulse shrink-0">
            <span className="text-3xl md:text-5xl font-bold text-foreground">
              +
            </span>
          </div>

          {/* CAMISA 2 */}
          <div className="w-full md:w-1/2 h-[450px] md:h-[700px] relative group overflow-hidden rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none border border-border hover:border-sky-500/50 transition-all duration-500">
            <img
              src="https://4l0p.github.io/shirt/assets/azul_claro_principal.png"
              alt="Camisa Sky Blue"
              className="absolute inset-0 w-full h-full object-cover opacity-90 md:opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="absolute top-6 right-6 bg-black/70 backdrop-blur-md px-4 py-2 rounded text-white font-bold text-sm uppercase tracking-wider border border-white/10 z-10">
              02. Sky Blue
            </div>
            {/* MUDANÇA: from-zinc-950 -> from-background */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
          </div>
        </div>

        {/* --- ÁREA DE PREÇO --- */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-30">
          {/* MUDANÇA: bg-black/80 -> bg-card/90 | border -> border-border */}
          <div className="bg-card/95 backdrop-blur-xl border border-sky-500/30 rounded-2xl p-6 text-center shadow-[0_0_50px_rgba(14,165,233,0.15)] animate-fade-in-up">
            <div className="flex justify-center items-center gap-2 mb-1">
              <span className="text-muted-foreground text-sm font-normal">
                De
              </span>
              <span className="text-muted-foreground text-lg font-bold line-through decoration-red-500 decoration-2">
                R$ 299,00
              </span>
            </div>

            {/* MUDANÇA: text-sky-200 -> text-sky-500 (Para ler no branco e no preto) */}
            <p className="text-sky-500 text-xs uppercase tracking-widest font-bold mb-1">
              O Kit Completo por apenas
            </p>

            {/* PREÇO AZUL SKY */}
            <div className="flex justify-center items-baseline gap-1 mb-4">
              <span className="text-xl md:text-2xl text-sky-400 font-bold">
                R$
              </span>
              <span className="font-alt text-6xl md:text-7xl font-black text-sky-400 tracking-tighter drop-shadow-[0_0_20px_rgba(56,189,248,0.4)]">
                99
              </span>
              <span className="text-xl md:text-2xl text-sky-400 font-bold">
                ,00
              </span>
            </div>

            <div className="inline-block w-full p-1 bg-gradient-to-r from-sky-500 to-blue-700 rounded-full shadow-[0_0_20px_rgba(14,165,233,0.3)]">
              <button
                onClick={openModal}
                // MUDANÇA: bg-black -> bg-background | text-white -> text-foreground | hover:bg-zinc-900 -> hover:opacity-90
                // Isso cria um botão branco no light (dentro da borda azul) e preto no dark.
                className="bg-background text-foreground w-full py-4 rounded-full font-bold text-base md:text-lg tracking-widest uppercase hover:opacity-90 transition-colors flex items-center justify-center gap-2"
              >
                Garantir Meu Kit Agora
              </button>
            </div>

            <p className="text-muted-foreground text-[10px] mt-3 uppercase tracking-wider">
              ⚡ Oferta válida enquanto durar o estoque
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
