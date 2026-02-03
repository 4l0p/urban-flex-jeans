import React from "react";

export default function EntregaPage() {
  return (
    // CAMADA 1: Fundo Global e Texto Padrão
    <main className="bg-background min-h-screen pt-32 pb-20 text-muted-foreground transition-colors duration-300">
      {/* Cabeçalho */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-16">
        <span className="text-sky-500 font-bold tracking-[0.2em] uppercase text-sm font-alt">
          Logística Global
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-foreground mt-4 font-alt tracking-tight">
          POLÍTICA DE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
            ENTREGA
          </span>
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
          Enviamos nossos produtos diretamente de nossos armazéns internacionais
          parceiros. Transparência e segurança do pedido até a sua porta.
        </p>
      </section>

      {/* Destaques (Cards) */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CARD 1: Prazo */}
          {/* bg-card: Resolve automaticamente Branco (Light) e Zinc-900 (Dark) */}
          <div className="bg-card border border-border p-6 rounded-xl relative group hover:border-sky-500/30 transition-all shadow-sm">
            <div className="text-sky-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-foreground font-bold text-lg font-alt mb-2">
              Prazo de Entrega
            </h3>
            <p className="text-sm text-muted-foreground">
              Média de{" "}
              <strong className="text-foreground">10 a 20 dias úteis</strong>.
            </p>
            <p className="text-xs text-muted-foreground mt-2 opacity-80">
              Pode variar conforme localidade.
            </p>
          </div>

          {/* CARD 2: Frete */}
          <div className="bg-card border border-border p-6 rounded-xl relative group hover:border-sky-500/30 transition-all shadow-sm">
            <div className="text-sky-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
            </div>
            <h3 className="text-foreground font-bold text-lg font-alt mb-2">
              Custo de Frete
            </h3>
            <p className="text-sm text-muted-foreground">
              <span className="text-green-500 font-bold">Frete Grátis</span>{" "}
              acima de R$ 149,00.
            </p>
            <p className="text-xs text-muted-foreground mt-2 opacity-80">
              Pedidos abaixo: taxa fixa de R$ 9,90.
            </p>
          </div>

          {/* CARD 3: Rastreio */}
          <div className="bg-card border border-border p-6 rounded-xl relative group hover:border-sky-500/30 transition-all shadow-sm">
            <div className="text-sky-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <h3 className="text-foreground font-bold text-lg font-alt mb-2">
              Rastreamento
            </h3>
            <p className="text-sm text-muted-foreground">
              Código enviado em{" "}
              <strong className="text-foreground">3 a 5 dias úteis</strong>.
            </p>
            <p className="text-xs text-muted-foreground mt-2 opacity-80">
              Envios monitorados passo a passo.
            </p>
          </div>
        </div>
      </section>

      {/* Áreas e Taxas */}
      <section className="max-w-4xl mx-auto px-6 mb-16 space-y-8">
        <h2 className="text-2xl font-bold text-foreground font-alt border-l-4 border-sky-500 pl-4">
          Áreas de Entrega e Taxas
        </h2>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            Atendemos todos os CEPs cobertos pelos Correios no Brasil.
            Garantimos a entrega ou reembolso integral em casos de extravio.
          </p>

          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-foreground font-bold mb-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-yellow-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
              Sobre Taxas e Impostos
            </h3>
            <p className="text-sm mb-2">
              Se seu pedido for tributado pela Receita Federal, os Correios
              enviarão uma notificação.
            </p>
            <p className="text-sm text-muted-foreground/80">
              * Em casos raros de tributação excessiva, orientamos contestar o
              valor diretamente nos Correios.
            </p>
          </div>
        </div>
      </section>

      {/* Condições Gerais */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <h2 className="text-2xl font-bold text-foreground font-alt border-l-4 border-sky-500 pl-4 mb-6">
          Condições Gerais
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-foreground font-bold mb-2">
              Cuidados com o endereço
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Confira dados completos no checkout. Erros no endereço podem
              resultar em devolução ao remetente (custo de reenvio: R$ 15,00).
            </p>
          </div>
          <div>
            <h3 className="text-foreground font-bold mb-2">
              Destinatário Ausente
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Os Correios tentam entregar 3 vezes. Sem sucesso, o pacote vai
              para a agência mais próxima (prazo de retirada: 7 dias).
            </p>
          </div>
        </div>
      </section>

      {/* Seguro Entrega (Item 4) */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        {/* CORREÇÃO: Usando variáveis semânticas bg-card e border-border */}
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-foreground font-alt mb-4 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-sky-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
              />
            </svg>
            Seguro Entrega
          </h2>
          <div className="space-y-4 text-muted-foreground text-sm">
            <p>
              <strong className="text-foreground">Express + Seguro:</strong>{" "}
              Reembolso ou reenvio se a entrega ultrapassar 60 dias úteis.
            </p>
            <p>
              <strong className="text-foreground">Express:</strong> Entrega
              prioritária sem cobertura adicional.
            </p>

            {/* Box exceções - Mantido o original que escurece o fundo */}
            <div className="bg-black/5 dark:bg-black/20 p-4 rounded mt-4">
              <p className="text-xs text-muted-foreground uppercase font-bold mb-1">
                Exceções para reembolso:
              </p>
              <ul className="list-disc list-inside text-xs text-muted-foreground">
                <li>Atraso na liberação alfandegária ({">"} 15 dias).</li>
                <li>Não retirada do produto.</li>
                <li>Tentativas de entrega frustradas.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <h2 className="text-2xl font-bold text-foreground font-alt mb-8">
          Perguntas Frequentes
        </h2>
        <div className="space-y-6">
          <div className="border-b border-border pb-4">
            <h4 className="text-foreground font-bold mb-1">
              Posso confiar na entrega?
            </h4>
            <p className="text-sm text-muted-foreground">
              Temos 10 anos de experiência em comércio global. Entrega 100%
              segura.
            </p>
          </div>
          <div className="border-b border-border pb-4">
            <h4 className="text-foreground font-bold mb-1">
              Pedido parado na alfândega?
            </h4>
            <p className="text-sm text-muted-foreground">
              É normal. A Receita Federal pode levar alguns dias para vistoriar.
            </p>
          </div>
          <div className="border-b border-border pb-4">
            <h4 className="text-foreground font-bold mb-1">
              Mudei de endereço. E agora?
            </h4>
            <p className="text-sm text-muted-foreground">
              Se retornar, cobramos um novo frete (R$15,00) para reenvio.
            </p>
          </div>
        </div>
      </section>

      {/* ATENÇÃO (Box Final) */}
      <section className="max-w-4xl mx-auto px-6">
        {/* Box Amarelo adaptável */}
        <div className="border-2 border-yellow-500/30 bg-yellow-50 dark:bg-yellow-900/10 p-8 rounded-xl text-center md:text-left">
          <h2 className="text-yellow-600 dark:text-yellow-500 font-bold text-xl font-alt mb-4 flex items-center justify-center md:justify-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            ATENÇÃO: Clientes do Brasil
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            A taxa de despacho postal (
            <strong className="text-foreground">R$ 15,00</strong>) cobrada pelos
            Correios NÃO é um imposto, mas uma taxa de serviço.
          </p>
          <p className="text-muted-foreground text-xs leading-relaxed opacity-80">
            Pagamento direto no site dos Correios (Minhas Importações).
          </p>
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
