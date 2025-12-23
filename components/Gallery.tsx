export default function Gallery() {
  const images = [
    // Foto Grande Esquerda (Lifestyle / Modelo andando)
    "/image_9.png",
    // Foto Pequena Direita Superior (Detalhe da gola/tecido)
    "/image_10.png",
    // Foto Pequena Direita Inferior (Outro ângulo)
    "/image_11.png",
  ];

  return (
    <section className="w-full bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sky-500 font-bold tracking-widest uppercase text-xs">
            Lifestyle
          </span>
          <h2 className="text-3xl font-bold text-white mt-2">
            Detalhes que Importam
          </h2>
        </div>

        {/* Grid Bento (Estilo Apple) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[600px]">
          {/* Imagem Principal (Ocupa 2 colunas) */}
          <div className="md:col-span-2 relative group overflow-hidden rounded-2xl h-[400px] md:h-full">
            <img
              src={images[0]}
              alt="Lifestyle Urban Flex"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute bottom-6 left-6">
              <p className="text-white font-bold text-xl">Caimento Perfeito</p>
              <p className="text-gray-300 text-sm">
                Do escritório ao happy hour.
              </p>
            </div>
          </div>

          {/* Coluna Direita (2 imagens empilhadas) */}
          <div className="flex flex-col gap-4 h-[400px] md:h-full">
            <div className="flex-1 relative group overflow-hidden rounded-2xl">
              <img
                src={images[1]}
                alt="Detalhe Tecido"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-bold text-sm">
                  Acabamento Premium
                </p>
              </div>
            </div>

            <div className="flex-1 relative group overflow-hidden rounded-2xl">
              <img
                src={images[2]}
                alt="Detalhe Costura"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-bold text-sm">
                  Costura Reforçada
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
