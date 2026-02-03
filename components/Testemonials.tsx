"use client";

import { useState } from "react";

// --- LISTA DE DEPOIMENTOS (Total: 15 itens = 5 linhas) ---
const allReviews = [
  // LINHA 1 (Iniciais)
  {
    name: "Ricardo Silva",
    role: "Empresário",
    stars: 5,
    title: "Impecável",
    text: "Eu viajo muito a trabalho e precisava de algo que não amassasse fácil e fosse elegante. O kit superou minhas expectativas. A azul escura é perfeita para reuniões.",
  },
  {
    name: "Carlos Eduardo",
    role: "Arquiteto",
    stars: 5,
    title: "Tecnologia Real",
    text: "Quando li sobre 'Flex Technology' achei que fosse marketing, mas o tecido realmente estica nos lugares certos. É o conforto de uma camiseta com a classe de uma social.",
  },
  {
    name: "Felipe Souza",
    role: "Advogado",
    stars: 5,
    title: "Melhor Custo-Benefício",
    text: "Já paguei o triplo em marcas famosas que entregam menos qualidade. O acabamento é de primeira e o caimento Slim Fit ficou sob medida. Recomendo este kit.",
  },

  // LINHA 2 (Profissões Variadas)
  {
    name: "Ricardo Gomes",
    role: "Diretor Criativo",
    stars: 5,
    title: "Não desbota",
    text: "Melhor custo benefício que encontrei. O preto não desbota e o tecido respira bem, ideal para quem trabalha em agência.",
  },
  {
    name: "Juliana Paes",
    role: "Designer de Interiores",
    stars: 4,
    title: "Design Minimalista",
    text: "O design é minimalista e elegante. O corte da peça valoriza a postura. Atendimento da loja foi nota 10.",
  },
  {
    name: "Marcos Silva",
    role: "Corretor de Imóveis",
    stars: 5,
    title: "Entrega Rápida",
    text: "Chegou antes do prazo. A embalagem é premium e a peça é muito bem acabada. Passo confiança para meus clientes com ela.",
  },

  // LINHA 3
  {
    name: "André Souza",
    role: "Engenheiro de Software",
    stars: 5,
    title: "Estilo Tech",
    text: "Estilo Tech que eu procurava. Combina com tudo, tênis ou sapato. Uso tanto no home office quanto presencial.",
  },
  {
    name: "Lucas Mendes",
    role: "Publicitário",
    stars: 5,
    title: "Conforto Elastano",
    text: "O elastano faz toda a diferença no conforto. Recomendo demais para quem passa o dia todo fora.",
  },
  {
    name: "Paulo H.",
    role: "Consultor Financeiro",
    stars: 5,
    title: "Medidas Exatas",
    text: "A tabela de medidas funcionou perfeitamente. M ficou exato. O tecido tem um toque gelado muito bom.",
  },

  // LINHA 4
  {
    name: "Gustavo Rocha",
    role: "Representante Comercial",
    stars: 5,
    title: "Elegância no Calor",
    text: "Uso todo dia para visitar clientes. Mantém a elegância mesmo no calor, não marca o suor.",
  },
  {
    name: "Felipe T.",
    role: "Engenheiro Civil",
    stars: 5,
    title: "Durabilidade",
    text: "Material robusto, costura firme. É camisa pra durar anos, mesmo visitando obra e escritório no mesmo dia.",
  },
  {
    name: "Thiago B.",
    role: "Médico",
    stars: 5,
    title: "Compra Fluida",
    text: "Experiência de compra fluida e produto top. Uso por baixo do jaleco e é extremamente confortável.",
  },

  // LINHA 5
  {
    name: "Marcelo D.",
    role: "Fotógrafo",
    stars: 5,
    title: "Fotos Fiéis",
    text: "Visual moderno e tecido que não esquenta. As fotos no site são fiéis ao produto real.",
  },
  {
    name: "Bruno K.",
    role: "Gerente de Projetos",
    stars: 5,
    title: "Pós-lavagem",
    text: "Já lavei várias vezes e continua igual. Comprarei as outras cores para renovar o guarda-roupa.",
  },
  {
    name: "Leandro P.",
    role: "Cliente Verificado",
    stars: 5,
    title: "Vale o Preço",
    text: "Simplesmente a melhor camisa que já tive. Vale cada centavo investido.",
  },
];

export default function Testimonials() {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <section
      id="depoimentos"
      className="w-full bg-background py-24 px-6 relative border-t border-border transition-colors duration-300"
    >
      {/* Background Decorativo */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center mb-16 w-full">
          <div className="max-w-2xl">
            <span className="text-sky-500 font-bold tracking-widest uppercase text-sm">
              Feedback
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2 leading-tight">
              Aprovado por quem <br /> entende de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
                Estilo.
              </span>
            </h2>
          </div>

          {/* Resumo de Notas */}
          <div className="text-right hidden md:block mt-4">
            <div className="flex text-yellow-500 text-xl mb-2 justify-center gap-1">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <p className="text-muted-foreground text-sm font-medium">
              Baseado em +1.200 avaliações de clientes verificados.
            </p>
          </div>
        </div>

        {/* Grid de Depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allReviews.slice(0, visibleCount).map((review, index) => (
            <div
              key={index}
              className="bg-card backdrop-blur-sm p-8 rounded-2xl border border-border hover:border-sky-500/50 transition-all duration-300 group hover:-translate-y-2 shadow-sm flex flex-col"
            >
              {/* Estrelas */}
              <div className="flex text-yellow-500 mb-6 text-sm">
                {[...Array(review.stars)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              {/* Título do Review */}
              <h3 className="text-foreground font-bold text-lg mb-3 group-hover:text-sky-400 transition-colors">
                "{review.title}"
              </h3>

              {/* Texto */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
                {review.text}
              </p>

              {/* Autor */}
              <div className="flex items-center gap-3 border-t border-border pt-6 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-black flex items-center justify-center text-white font-bold text-xs shrink-0">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-foreground font-bold text-sm">
                    {review.name}
                  </p>
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-xs text-sky-500 font-semibold">
                      {review.role}
                    </span>
                    <span className="text-muted-foreground hidden md:inline">
                      •
                    </span>
                    <span className="text-[10px] text-green-500 uppercase tracking-wide font-bold whitespace-nowrap">
                      Compra Verificada
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botão Ver Mais */}
        {visibleCount < allReviews.length && (
          <div className="mt-16 text-center animate-fade-in">
            <button
              onClick={handleShowMore}
              className="group inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-sky-500 text-muted-foreground hover:text-sky-500 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:bg-sky-500/5"
            >
              Carregar Mais Depoimentos
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 group-hover:translate-y-0.5 transition-transform"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            {/* Contador Removido para manter a sensação de lista infinita */}
          </div>
        )}
      </div>
    </section>
  );
}
