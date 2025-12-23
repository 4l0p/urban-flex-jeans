import React from "react";

export default function EntregaPage() {
  return (
    <main className="bg-zinc-950 min-h-screen pt-32 pb-20 text-gray-300">
      {/* Cabeçalho */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-16">
        <span className="text-sky-500 font-bold tracking-[0.2em] uppercase text-sm font-alt">
          Logística Global
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-white mt-4 font-alt tracking-tight">
          POLÍTICA DE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
            ENTREGA
          </span>
        </h1>
        <p className="text-zinc-400 mt-6 max-w-2xl mx-auto">
          Enviamos nossos produtos diretamente de nossos armazéns internacionais
          parceiros. Transparência e segurança do pedido até a sua porta.
        </p>
      </section>

      {/* Destaques (Item 1) */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card Prazo */}
          <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-xl relative group hover:border-sky-500/30 transition-all">
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
            <h3 className="text-white font-bold text-lg font-alt mb-2">
              Prazo de Entrega
            </h3>
            <p className="text-sm text-zinc-400">
              Média de{" "}
              <strong className="text-white">10 a 20 dias úteis</strong>.
            </p>
            <p className="text-xs text-zinc-500 mt-2">
              Pode variar conforme localidade e condições alfandegárias.
            </p>
          </div>

          {/* Card Frete */}
          <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-xl relative group hover:border-sky-500/30 transition-all">
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
            <h3 className="text-white font-bold text-lg font-alt mb-2">
              Custo de Frete
            </h3>
            <p className="text-sm text-zinc-400">
              <span className="text-green-500 font-bold">Frete Grátis</span>{" "}
              acima de R$ 149,00.
            </p>
            <p className="text-xs text-zinc-500 mt-2">
              Pedidos abaixo desse valor: taxa fixa de R$ 9,90.
            </p>
          </div>

          {/* Card Rastreio */}
          <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-xl relative group hover:border-sky-500/30 transition-all">
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
            <h3 className="text-white font-bold text-lg font-alt mb-2">
              Rastreamento
            </h3>
            <p className="text-sm text-zinc-400">
              Código enviado em{" "}
              <strong className="text-white">3 a 5 dias úteis</strong>.
            </p>
            <p className="text-xs text-zinc-500 mt-2">
              Graças à nossa parceria cross-border, os envios chegam mais
              rápido.
            </p>
          </div>
        </div>
      </section>

      {/* Áreas e Taxas (Item 2) */}
      <section className="max-w-4xl mx-auto px-6 mb-16 space-y-8">
        <h2 className="text-2xl font-bold text-white font-alt border-l-4 border-sky-500 pl-4">
          Áreas de Entrega e Taxas
        </h2>

        <div className="space-y-6 text-zinc-400 leading-relaxed">
          <p>
            Atendemos todos os CEPs cobertos pelos Correios no Brasil.
            Garantimos a entrega ou reembolso integral em casos de extravio.
          </p>

          <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
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
              enviarão uma notificação com o valor do imposto (geralmente até
              60% do valor declarado) e instruções para retirada.
            </p>
            <p className="text-sm text-zinc-500">
              * Em casos raros de tributação excessiva, orientamos contestar o
              valor diretamente nos Correios.
            </p>
          </div>
        </div>
      </section>

      {/* Condições Gerais (Item 3) */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <h2 className="text-2xl font-bold text-white font-alt border-l-4 border-sky-500 pl-4 mb-6">
          Condições Gerais
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-white font-bold mb-2">
              Cuidados com o endereço
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Confira dados completos no checkout. Erros no endereço podem
              resultar em devolução ao remetente, com custo de reenvio por sua
              conta (R$ 15,00).
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-2">Destinatário Ausente</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Os Correios tentam entregar 3 vezes. Sem sucesso, o pacote vai
              para a agência mais próxima e deve ser retirado em até 7 dias
              corridos.
            </p>
          </div>
        </div>
      </section>

      {/* Seguro Entrega (Item 4) */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="bg-gradient-to-r from-sky-900/20 to-transparent border border-sky-500/20 p-6 rounded-xl">
          <h2 className="text-xl font-bold text-white font-alt mb-4 flex items-center gap-2">
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
          <div className="space-y-4 text-zinc-300 text-sm">
            <p>
              <strong className="text-white">Express + Seguro:</strong>{" "}
              Reembolso ou reenvio se a entrega ultrapassar 60 dias úteis.
            </p>
            <p>
              <strong className="text-white">Express:</strong> Entrega
              prioritária sem cobertura adicional.
            </p>
            <div className="bg-black/20 p-4 rounded mt-4">
              <p className="text-xs text-zinc-500 uppercase font-bold mb-1">
                Exceções para reembolso:
              </p>
              <ul className="list-disc list-inside text-xs text-zinc-400">
                <li>Atraso superior a 15 dias na liberação alfandegária.</li>
                <li>Não retirada do produto (quando há taxas pendentes).</li>
                <li>Tentativas de entrega frustradas.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ (Item 5) */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <h2 className="text-2xl font-bold text-white font-alt mb-8">
          Perguntas Frequentes
        </h2>
        <div className="space-y-6">
          <div className="border-b border-zinc-800 pb-4">
            <h4 className="text-white font-bold mb-1">
              Posso confiar na entrega?
            </h4>
            <p className="text-sm text-zinc-400">
              Temos 10 anos de experiência em comércio global, com transparência
              e compromisso. Entrega 100% segura.
            </p>
          </div>

          <div className="border-b border-zinc-800 pb-4">
            <h4 className="text-white font-bold mb-1">
              Meu pedido está "parado na alfândega". O que fazer?
            </h4>
            <p className="text-sm text-zinc-400">
              É normal! A Receita Federal pode levar alguns dias para vistoriar.
              Aguarde a liberação.
            </p>
          </div>

          <div className="border-b border-zinc-800 pb-4">
            <h4 className="text-white font-bold mb-1">
              Mudei de endereço. E agora?
            </h4>
            <p className="text-sm text-zinc-400">
              Se o produto retornar para nós, cobramos um novo frete no valor de
              R$15,00 para reenviar para seu novo endereço, gerando um novo
              rastreio.
            </p>
          </div>

          <div className="border-b border-zinc-800 pb-4">
            <h4 className="text-white font-bold mb-1">
              Comprei vários itens, mas só recebi parte.
            </h4>
            <p className="text-sm text-zinc-400">
              Itens de fornecedores diferentes têm códigos de rastreio separados
              e podem chegar em datas distintas.
            </p>
          </div>
        </div>
      </section>

      {/* ATENÇÃO (Box Final) */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="border-2 border-yellow-600/50 bg-yellow-900/10 p-8 rounded-xl text-center md:text-left">
          <h2 className="text-yellow-500 font-bold text-xl font-alt mb-4 flex items-center justify-center md:justify-start gap-2">
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
          <p className="text-zinc-300 text-sm leading-relaxed mb-4">
            Desde 27/08/2018 os Correios cobram uma taxa fixa de{" "}
            <strong>R$ 15,00</strong> para encomendas internacionais (Despacho
            Postal). Esse valor <strong>NÃO É um imposto</strong>, mas uma taxa
            de serviço.
          </p>
          <p className="text-zinc-400 text-xs leading-relaxed">
            O pagamento deve ser feito diretamente no site dos Correios (Minhas
            Importações). É fundamental acompanhar o envio pelo código de
            rastreamento para saber quando pagar essa taxa e liberar sua
            entrega. O rastreio fica disponível em sua conta em um prazo de 3 a
            12 dias úteis.
          </p>
        </div>
      </section>

      {/* Footer da Página */}
      <div className="text-center mt-20 border-t border-zinc-900 pt-10">
        <a
          href="/"
          className="text-sky-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
        >
          Voltar para a Loja
        </a>
      </div>
    </main>
  );
}
