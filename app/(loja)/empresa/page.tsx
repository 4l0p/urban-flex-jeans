export default function EmpresaPage() {
  return (
    <main className="bg-zinc-950 min-h-screen pt-32 pb-20 text-gray-300">
      {/* Título Principal */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-16">
        <span className="text-sky-500 font-bold tracking-[0.2em] uppercase text-sm font-alt">
          Quem Somos
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-white mt-4 font-alt tracking-tight">
          A EVOLUÇÃO DO <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
            ESTILO MASCULINO
          </span>
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-transparent mx-auto mt-8 rounded-full"></div>
      </section>

      {/* Texto de Apresentação */}
      <section className="max-w-3xl mx-auto px-6 mb-20 space-y-6 text-lg leading-relaxed text-zinc-400">
        <p>
          A <strong className="text-white">Urban Flex</strong> nasceu de uma
          necessidade real: o homem moderno não deveria ter que escolher entre
          estar elegante ou estar confortável. Durante muito tempo, a moda
          masculina foi rígida, literalmente.
        </p>
        <p>
          Decidimos quebrar esse padrão. Utilizamos tecnologia têxtil de ponta
          para criar peças que acompanham o ritmo acelerado do dia a dia, sem
          amassar, sem apertar e, acima de tudo, transmitindo confiança.
        </p>
        <p>
          Não vendemos apenas roupas. Vendemos a liberdade de movimento para
          quem constrói o próprio futuro.
        </p>
      </section>

      {/* Grid: Missão, Visão e Valores */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* CARD MISSÃO */}
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:border-sky-500/30 transition-all group hover:-translate-y-1">
            <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center text-sky-400 mb-6 group-hover:bg-sky-500/10 transition-colors">
              {/* Ícone Alvo/Missão */}
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
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-alt">
              Nossa Missão
            </h3>
            <p className="text-sm leading-relaxed">
              Proporcionar conforto extremo e estilo impecável através de
              tecnologia, elevando a autoestima do homem em qualquer ocasião.
            </p>
          </div>

          {/* CARD VISÃO */}
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:border-sky-500/30 transition-all group hover:-translate-y-1">
            <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center text-sky-400 mb-6 group-hover:bg-sky-500/10 transition-colors">
              {/* Ícone Olho/Visão */}
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
            <h3 className="text-xl font-bold text-white mb-3 font-alt">
              Nossa Visão
            </h3>
            <p className="text-sm leading-relaxed">
              Ser a referência nacional em moda inteligente (Smartwear),
              reconhecida pela inovação contínua e excelência no atendimento.
            </p>
          </div>

          {/* CARD VALORES */}
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:border-sky-500/30 transition-all group hover:-translate-y-1">
            <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center text-sky-400 mb-6 group-hover:bg-sky-500/10 transition-colors">
              {/* Ícone Diamante/Valores */}
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
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-alt">
              Nossos Valores
            </h3>
            <ul className="text-sm leading-relaxed list-disc list-inside space-y-1 marker:text-sky-500">
              <li>Qualidade Intransigente</li>
              <li>Foco no Cliente</li>
              <li>Inovação Constante</li>
              <li>Transparência e Ética</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Faixa Final */}
      <section className="mt-24 border-t border-zinc-900 pt-12 text-center">
        <p className="text-zinc-500 text-sm mb-6">
          Junte-se a milhares de homens que já elevaram seu padrão.
        </p>
        <a
          href="/"
          className="inline-flex text-sky-400 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors border-b border-sky-400/30 pb-1 hover:border-sky-400"
        >
          Voltar para a Loja
        </a>
      </section>
    </main>
  );
}
