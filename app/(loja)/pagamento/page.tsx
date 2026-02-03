import React from "react";

export default function PagamentoPage() {
  return (
    <main className="bg-background min-h-screen pt-32 pb-20 text-muted-foreground transition-colors duration-300">
      {/* Cabeçalho */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-16">
        <span className="text-sky-500 font-bold tracking-[0.2em] uppercase text-sm font-alt">
          Compra Segura
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-foreground mt-4 font-alt tracking-tight">
          POLÍTICA DE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
            PAGAMENTO
          </span>
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
          Oferecemos as opções mais seguras e práticas do mercado para você
          finalizar sua compra com tranquilidade. Escolha a que melhor se adapta
          ao seu estilo.
        </p>
      </section>

      {/* Grid de Formas de Pagamento */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card: Cartão de Crédito */}
          <div className="bg-card border border-border p-8 rounded-2xl hover:border-sky-500/30 transition-all group shadow-sm">
            <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-6 group-hover:bg-sky-500 transition-colors shadow-sm dark:shadow-lg dark:shadow-black/50">
              {/* CORREÇÃO FINAL: text-foreground para a cor base (preto/branco) e group-hover:text-white para o hover */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 text-foreground group-hover:text-white transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3 font-alt">
              Cartão de Crédito
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Aceitamos as principais bandeiras do mercado (Visa, Mastercard,
              Elo).
            </p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                Parcelamento em até 4x
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                Aprovação imediata
              </li>
            </ul>
          </div>

          {/* Card: PIX */}
          <div className="bg-card border border-border p-8 rounded-2xl hover:border-sky-500/30 transition-all group relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 bg-green-500/10 text-green-500 text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
              Recomendado
            </div>
            <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors shadow-sm dark:shadow-lg dark:shadow-black/50">
              {/* CORREÇÃO FINAL: text-foreground */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 text-foreground group-hover:text-white transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3 font-alt">
              PIX
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              A forma mais rápida de receber seu pedido. Pagou, aprovou na hora.
            </p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Aprovação instantânea
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Agilidade no envio
              </li>
            </ul>
          </div>

          {/* Card: Boleto */}
          <div className="bg-card border border-border p-8 rounded-2xl hover:border-sky-500/30 transition-all group shadow-sm">
            <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-6 group-hover:bg-sky-500 transition-colors shadow-sm dark:shadow-lg dark:shadow-black/50">
              {/* CORREÇÃO FINAL: text-foreground */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 text-foreground group-hover:text-white transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3 font-alt">
              Boleto Bancário
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Ideal para quem prefere pagar à vista mas não usa PIX.
            </p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                Vencimento em até 3 dias úteis
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                Aprovação em 1 a 2 dias úteis
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Regras Importantes */}
      <section className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-foreground font-alt mb-8 border-l-4 border-sky-500 pl-4">
          Informações Importantes
        </h2>

        <div className="space-y-8">
          <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
            <h4 className="text-foreground font-bold mb-2">
              1. Confirmação de Pagamento
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              O prazo de entrega do seu pedido começa a contar somente após a
              confirmação do pagamento pela instituição financeira. Você
              receberá um e-mail automático assim que o pagamento for aprovado.
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
            <h4 className="text-foreground font-bold mb-2">
              2. Segurança na Transação
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Utilizamos gateway de pagamento criptografado. Nenhuma informação
              financeira fica salva em nossos servidores. Para sua segurança,
              pedidos pagos com cartão de crédito podem passar por uma análise
              antifraude, que pode levar até 48 horas, embora geralmente ocorra
              em instantes.
            </p>
          </div>
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
