export default function Testimonials() {
  const reviews = [
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
  ];

  return (
    <section
      id="depoimentos"
      className="w-full bg-black py-24 px-6 relative border-t border-zinc-900"
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
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 leading-tight">
              Aprovado por quem <br /> entende de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
                Estilo.
              </span>
            </h2>
          </div>

          {/* Resumo de Notas */}
          <div className="text-right hidden md:block">
            <div className="flex text-yellow-500 text-xl mb-2 justify-end gap-1">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <p className="text-gray-400 text-sm font-medium">
              Baseado em +1.200 avaliações de clientes verificados.
            </p>
          </div>
        </div>

        {/* Grid de Depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-zinc-900/40 backdrop-blur-sm p-8 rounded-2xl border border-zinc-800 hover:border-sky-500/50 transition-all duration-300 group hover:-translate-y-2"
            >
              {/* Estrelas */}
              <div className="flex text-yellow-500 mb-6 text-sm">
                {[...Array(review.stars)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              {/* Título do Review */}
              <h3 className="text-white font-bold text-lg mb-3 group-hover:text-sky-400 transition-colors">
                "{review.title}"
              </h3>

              {/* Texto */}
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                {review.text}
              </p>

              {/* Autor */}
              <div className="flex items-center gap-3 border-t border-zinc-800 pt-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-black flex items-center justify-center text-white font-bold text-xs">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{review.name}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-sky-500 font-semibold">
                      {review.role}
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-[10px] text-green-500 uppercase tracking-wide font-bold">
                      Compra Verificada
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
