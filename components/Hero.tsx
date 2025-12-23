"use client";

import { useModal } from "@/context/ModalContext";
import { useState } from "react";
import VideoModal from "@/components/VideoModal";

export default function Hero() {
  const { openModal } = useModal();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black">
      {/* --- CAMADA 1: VÍDEO DE FUNDO --- */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />{" "}
        {/* Filtro escuro */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/video-principal.mp4" type="video/mp4" />
        </video>
      </div>

      {/* --- CAMADA 2: CONTEÚDO (Texto e Botões) --- */}
      <div className="relative z-50 text-center px-4 max-w-4xl mx-auto">
        <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-xs md:text-sm font-light tracking-[0.2em] uppercase mb-6 bg-white/10 backdrop-blur-sm text-gray-200">
          Nova Coleção 2025
        </span>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
          URBAN{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            FLEX
          </span>{" "}
          <br />
          EVOLUTION
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          O encontro perfeito entre a tecnologia do conforto e a sofisticação do
          design slim. Redefina seu estilo.
        </p>

        {/* --- AQUI ESTÃO OS BOTÕES --- */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button
            onClick={openModal}
            className="bg-white text-black px-8 py-4 rounded-full font-bold text-sm tracking-widest hover:bg-gray-200 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer"
          >
            COMPRAR AGORA
          </button>

          <button
            onClick={() => setIsVideoOpen(true)}
            className="border border-white/30 text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            VER O VÍDEO
          </button>
        </div>
      </div>
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoSrc="/video-apresentacao.mp4"
      />
    </section>
  );
}
