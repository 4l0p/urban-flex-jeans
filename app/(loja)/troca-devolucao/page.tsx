import React from "react";

export default function TrocaPage() {
  return (
    <main className="bg-background min-h-screen pt-32 pb-20 text-muted-foreground transition-colors duration-300">
      {/* Cabeçalho */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-16">
        <span className="text-sky-500 font-bold tracking-[0.2em] uppercase text-sm font-alt">
          Suporte ao Cliente
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-foreground mt-4 font-alt tracking-tight">
          TROCA, DEVOLUÇÃO <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
            E GARANTIA
          </span>
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
          Queremos que sua experiência seja impecável. Se precisar trocar ou
          devolver, nosso processo é simples, transparente e segue rigorosamente
          o Código de Defesa do Consumidor.
        </p>
      </section>

      {/* Grid de Prazos (Destaques) */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Arrependimento */}
          {/* Adicionado 'group' para controlar o hover dos filhos */}
          <div className="group bg-card border border-border p-6 rounded-xl flex flex-col items-center text-center hover:border-sky-500/30 transition-all shadow-sm cursor-default">
            {/* ÍCONE: bg-secondary (padrão) -> bg-sky-500 (hover) */}
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:bg-sky-500 transition-colors duration-300">
              {/* SVG: text-foreground (padrão) -> text-white (hover) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-foreground group-hover:text-white transition-colors duration-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
            </div>

            <h3 className="text-foreground font-bold text-lg font-alt mb-2">
              Arrependimento
            </h3>
            <p className="text-sm text-muted-foreground">
              Até <strong className="text-foreground">7 dias corridos</strong>{" "}
              após o recebimento para devolver e receber o reembolso total.
            </p>
          </div>

          {/* Card 2: Troca Grátis */}
          <div className="group bg-card border border-border p-6 rounded-xl flex flex-col items-center text-center hover:border-sky-500/30 transition-all shadow-sm cursor-default">
            {/* ÍCONE COM HOVER DINÂMICO */}
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:bg-sky-500 transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-foreground group-hover:text-white transition-colors duration-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
            </div>

            <h3 className="text-foreground font-bold text-lg font-alt mb-2">
              Primeira Troca
            </h3>
            <p className="text-sm text-muted-foreground">
              Errou o tamanho? A primeira troca é por{" "}
              <strong className="text-foreground">nossa conta</strong> (frete de
              envio grátis).
            </p>
          </div>

          {/* Card 3: Garantia */}
          <div className="group bg-card border border-border p-6 rounded-xl flex flex-col items-center text-center hover:border-sky-500/30 transition-all shadow-sm cursor-default">
            {/* ÍCONE COM HOVER DINÂMICO */}
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:bg-sky-500 transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-foreground group-hover:text-white transition-colors duration-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </div>

            <h3 className="text-foreground font-bold text-lg font-alt mb-2">
              Defeitos
            </h3>
            <p className="text-sm text-muted-foreground">
              Garantia de <strong className="text-foreground">90 dias</strong>{" "}
              contra qualquer defeito de fabricação ou costura.
            </p>
          </div>
        </div>
      </section>

      {/* Conteúdo Detalhado */}
      <section className="max-w-4xl mx-auto px-6 space-y-12">
        {/* Bloco 1 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground font-alt border-l-4 border-sky-500 pl-4">
            1. Condições Gerais
          </h2>
          <div className="text-muted-foreground leading-relaxed space-y-2">
            <p>
              Para que a troca ou devolução seja aceita, o produto deve atender
              aos seguintes critérios:
            </p>
            <ul className="list-disc list-inside pl-2 space-y-1 text-muted-foreground">
              <li>Estar com as etiquetas e lacres originais intactos.</li>
              <li>Não apresentar indícios de uso, lavagem ou odores.</li>
              <li>
                Estar acompanhado da Nota Fiscal (DANFE) ou comprovante de
                compra.
              </li>
            </ul>
            <p className="text-xs text-muted-foreground/80 mt-2">
              * Produtos que não atenderem a essas condições poderão ser
              devolvidos ao remetente sem aviso prévio.
            </p>
          </div>
        </div>

        {/* Bloco 2 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground font-alt border-l-4 border-sky-500 pl-4">
            2. Como Solicitar
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Envie um e-mail para{" "}
            <strong className="text-foreground">
              atendimento@urbanflex.com.br
            </strong>{" "}
            ou entre em contato pelo nosso WhatsApp com o número do pedido e o
            motivo da troca. Nossa equipe enviará o código de postagem reversa
            em até 24 horas úteis.
          </p>
        </div>

        {/* Bloco 3 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground font-alt border-l-4 border-sky-500 pl-4">
            3. Reembolso
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            O reembolso será realizado na mesma forma de pagamento utilizada na
            compra.
          </p>
          <ul className="list-disc list-inside pl-2 space-y-1 text-muted-foreground">
            <li>
              <strong className="text-foreground">Cartão de Crédito:</strong> O
              estorno poderá ocorrer em até duas faturas subsequentes.
            </li>
            <li>
              <strong className="text-foreground">PIX ou Boleto:</strong>{" "}
              Depósito em conta corrente em até 5 dias úteis após a análise do
              produto.
            </li>
          </ul>
        </div>
      </section>

      {/* Footer da Página */}
      <div className="text-center mt-20 border-t border-border pt-10">
        <a
          href="/"
          className="text-sky-500 hover:text-foreground transition-colors text-sm font-bold uppercase tracking-widest"
        >
          Voltar para a Loja
        </a>
      </div>
    </main>
  );
}
