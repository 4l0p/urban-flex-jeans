"use client";

import { useState, useEffect } from "react";

export default function Gallery() {
  // Estado para controlar qual imagem está aberta no Modal (null = fechado)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  // Lista Completa de Imagens
  const galleryItems = [
    // --- ORIGINAIS (Destaques) ---
    {
      src: "/image_9.png",
      title: "Caimento Perfeito",
      desc: "Do escritório ao happy hour.",
    },
    {
      src: "/image_10.png",
      title: "Acabamento Premium",
      desc: "Detalhes que fazem a diferença.",
    },
    {
      src: "/image_11.png",
      title: "Costura Reforçada",
      desc: "Durabilidade para o dia a dia.",
    },

    // --- NOVAS (Thumbnails) ---
    {
      src: "/gallery_1.jpg",
      title: "Liberdade de Movimento",
      desc: "Tecnologia Elastano Flex.",
    },
    {
      src: "/gallery_2.jpg",
      title: "Gola Estruturada",
      desc: "Não deforma com o tempo.",
    },
    {
      src: "/gallery_3.jpg",
      title: "Modelagem Slim",
      desc: "Ajuste moderno ao corpo.",
    },
    {
      src: "/gallery_4.jpg",
      title: "Cores Vivas",
      desc: "Resistente a desbotamento.",
    },
    {
      src: "/gallery_5.jpg",
      title: "Versatilidade",
      desc: "Combina com tudo.",
    },
    {
      src: "/gallery_6.jpg",
      title: "Estilo Atemporal",
      desc: "Para qualquer ocasião.",
    },
  ];

  // Funções do Modal
  const openModal = (index: number) => setSelectedImageIndex(index);
  const closeModal = () => setSelectedImageIndex(null);

  // Navegação dentro do Modal
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev! + 1) % galleryItems.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (prev) => (prev! - 1 + galleryItems.length) % galleryItems.length,
      );
    }
  };

  // Fechar com a tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // --- CORREÇÃO 1: TRAVAR O SCROLL DO CORPO QUANDO O MODAL ESTIVER ABERTO ---
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = "hidden"; // Trava rolagem
    } else {
      document.body.style.overflow = "unset"; // Destrava rolagem
    }
    // Cleanup ao desmontar o componente ou fechar modal
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImageIndex]);

  return (
    <section
      className="w-full bg-background py-20 px-4 transition-colors duration-300"
      id="galeria"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sky-500 font-bold tracking-widest uppercase text-xs">
            Show Room
          </span>
          <h2 className="text-3xl font-bold text-foreground mt-2">
            Detalhes que Importam
          </h2>
        </div>

        {/* --- GRID DESTAQUE --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[600px] mb-4">
          <div
            onClick={() => openModal(0)}
            className="md:col-span-2 relative group overflow-hidden rounded-2xl h-[400px] md:h-full bg-black cursor-zoom-in"
          >
            <img
              src={galleryItems[0].src}
              alt={galleryItems[0].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 z-10">
              <p className="text-white font-bold text-xl">
                {galleryItems[0].title}
              </p>
              <p className="text-gray-300 text-sm">{galleryItems[0].desc}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 h-[400px] md:h-full">
            {[1, 2].map((idx) => (
              <div
                key={idx}
                onClick={() => openModal(idx)}
                className="flex-1 relative group overflow-hidden rounded-2xl bg-black cursor-zoom-in"
              >
                <img
                  src={galleryItems[idx].src}
                  alt={galleryItems[idx].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 z-10">
                  <p className="text-white font-bold text-sm">
                    {galleryItems[idx].title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- THUMBNAILS --- */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {galleryItems.slice(3).map((item, index) => {
            const realIndex = index + 3;
            return (
              <div
                key={realIndex}
                onClick={() => openModal(realIndex)}
                className="relative group overflow-hidden rounded-xl aspect-square bg-muted cursor-zoom-in border border-transparent hover:border-sky-500 transition-all"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
            );
          })}
        </div>
      </div>

      {/* --- MODAL (LIGHTBOX) --- */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Botão Fechar (X) */}
          <button className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Container da Imagem */}
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center">
            {/* Imagem */}
            <img
              src={galleryItems[selectedImageIndex].src}
              alt={galleryItems[selectedImageIndex].title}
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Texto/Legenda */}
            <div
              className="mt-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight">
                {galleryItems[selectedImageIndex].title}
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                {galleryItems[selectedImageIndex].desc}
              </p>
            </div>

            {/* --- CORREÇÃO 2: SETAS DE NAVEGAÇÃO VISÍVEIS NO MOBILE --- */}
            {/* Ajustei o posicionamento (left-0 no mobile vs -left-20 no desktop) */}

            {/* Seta Esquerda (Anterior) */}
            <button
              onClick={prevImage}
              className="absolute left-0 md:-left-20 top-1/2 -translate-y-1/2 p-3 text-white/70 md:text-white/30 hover:text-white transition-all hover:scale-110 z-50 bg-black/20 md:bg-transparent rounded-full md:rounded-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8 md:w-10 md:h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            {/* Seta Direita (Próxima) */}
            <button
              onClick={nextImage}
              className="absolute right-0 md:-right-20 top-1/2 -translate-y-1/2 p-3 text-white/70 md:text-white/30 hover:text-white transition-all hover:scale-110 z-50 bg-black/20 md:bg-transparent rounded-full md:rounded-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8 md:w-10 md:h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
