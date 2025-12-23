import React from "react";

export default function SegurancaPage() {
  return (
    <main className="bg-zinc-950 min-h-screen pt-32 pb-20 text-gray-300">
      {/* Cabeçalho */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-16">
        <span className="text-sky-500 font-bold tracking-[0.2em] uppercase text-sm font-alt">
          Dados Protegidos
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-white mt-4 font-alt tracking-tight">
          SEGURANÇA E <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
            PRIVACIDADE
          </span>
        </h1>
        <p className="text-zinc-400 mt-6 max-w-2xl mx-auto">
          Sua tranquilidade é nossa prioridade. Utilizamos criptografia de ponta
          para garantir que seus dados estejam blindados do início ao fim da
          compra.
        </p>
      </section>

      {/* Destaque Segurança (SSL) */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 p-8 md:p-12 rounded-2xl flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
            {/* Ícone Cadeado/SSL */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2 font-alt">
              Ambiente 100% Seguro (SSL)
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              Nosso site conta com Certificado de Segurança SSL (Secure Socket
              Layer). Isso cria um "túnel" criptografado entre você e nosso
              servidor. Garantimos que dados críticos como número de cartão de
              crédito <strong className="text-white">jamais</strong> ficam
              expostos ou são armazenados de forma insegura.
            </p>
          </div>
        </div>
      </section>

      {/* Blocos de Política */}
      <section className="max-w-4xl mx-auto px-6 space-y-16">
        {/* Privacidade */}
        <div className="flex gap-6">
          <div className="hidden md:block w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center text-sky-500 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-4 font-alt">
              Privacidade e Uso de Dados
            </h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                A <strong>Urban Flex Jeans</strong> assume o compromisso de não
                comercializar ou transferir seus dados para terceiros.
                Respeitamos sua privacidade acima de tudo.
              </p>
              <p>
                As informações coletadas (como nome e e-mail) são utilizadas
                internamente apenas para:
              </p>
              <ul className="list-disc list-inside space-y-1 text-zinc-500 pl-2">
                <li>Processar e entregar seus pedidos com eficiência.</li>
                <li>
                  Melhorar nossa comunicação e oferecer produtos que façam
                  sentido para você.
                </li>
                <li>
                  Análises estatísticas internas para aprimorar a experiência no
                  site.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Coleta de Informações */}
        <div className="flex gap-6">
          <div className="hidden md:block w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center text-sky-500 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-4 font-alt">
              Quais dados coletamos?
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Coletamos apenas o necessário para realizar sua compra com
              segurança fiscal e logística:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                <span className="text-white font-bold block mb-1">
                  Dados Pessoais
                </span>
                <span className="text-sm text-zinc-500">
                  Nome, CPF, Data de Nascimento (para emissão de Nota Fiscal).
                </span>
              </div>
              <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                <span className="text-white font-bold block mb-1">
                  Dados de Contato
                </span>
                <span className="text-sm text-zinc-500">
                  E-mail, Telefone e Endereço de Entrega completo.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* E-mails e Anti-Spam */}
        <div className="flex gap-6">
          <div className="hidden md:block w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center text-sky-500 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-4 font-alt">
              E-mails e Anti-SPAM
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Somos contra SPAM. Nossos e-mails promocionais são enviados apenas
              se você autorizar (opt-in). Caso não queira mais receber nossas
              ofertas exclusivas, basta clicar no link de descadastro presente
              no rodapé de qualquer e-mail nosso. Simples e transparente.
            </p>
          </div>
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
