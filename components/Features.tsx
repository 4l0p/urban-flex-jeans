export default function Features() {
  const features = [
    {
      title: "FlexWeave Technology™",
      desc: "Esqueça o jeans rígido. Nossa fibra inteligente se adapta a cada movimento seu.",
      icon: (
        <svg
          className="w-8 h-8 text-sky-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Algodão Premium",
      desc: "Toque macio que respira. Conforto térmico para o dia todo, do escritório ao happy hour.",
      icon: (
        <svg
          className="w-8 h-8 text-sky-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
    },
    {
      title: "Corte Slim Fit",
      desc: "Modelagem italiana que valoriza o corpo sem apertar. Elegância instantânea.",
      icon: (
        <svg
          className="w-8 h-8 text-sky-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="tecnologia"
      // MUDANÇA: bg-zinc-950 -> bg-background
      className="w-full bg-background py-24 px-6 relative overflow-hidden transition-colors duration-300"
    >
      {/* Luz de fundo (Efeito Glow Azul) - Mantido pois funciona bem nos dois temas */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-16">
          {/* MUDANÇA: text-white -> text-foreground */}
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Mais que Jeans. <br />
            Uma{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
              Experiência.
            </span>
          </h2>
          {/* MUDANÇA: text-gray-400 -> text-muted-foreground */}
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Unimos a durabilidade do denim clássico com a tecnologia de tecidos
            esportivos.
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              // MUDANÇA: bg-zinc-900/50 -> bg-card | border-zinc-800 -> border-border
              className="group p-8 rounded-2xl bg-card border border-border hover:border-sky-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(56,189,248,0.1)] hover:-translate-y-2"
            >
              {/* MUDANÇA: bg-zinc-800 -> bg-muted/20 para ser transparente/sutil no dark e visível no light */}
              <div className="w-14 h-14 bg-muted/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sky-500/10 transition-colors">
                {item.icon}
              </div>
              {/* MUDANÇA: text-white -> text-foreground */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {item.title}
              </h3>
              {/* MUDANÇA: text-gray-400 -> text-muted-foreground */}
              <p className="text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
