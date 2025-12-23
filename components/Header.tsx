"use client";

import Link from "next/link";
import { useModal } from "@/context/ModalContext";
import { useState } from "react";

export default function Header() {
  const { openModal } = useModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para fechar o menu ao clicar em um link
  const closeMenu = () => setIsMenuOpen(false);

  return (
    // z-[100] garante que ele fique acima de qualquer outro elemento da página
    <header className="fixed top-0 left-0 w-full z-[100] bg-white/95 backdrop-blur-md shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGOMARCA */}
        <Link
          href="/"
          className="flex items-center gap-1 group select-none z-50"
          onClick={closeMenu}
        >
          <span className="font-alt text-2xl md:text-3xl font-black tracking-tighter text-[#0f172a]">
            URBAN
          </span>
          <span className="font-alt text-2xl md:text-3xl font-black tracking-tighter text-[#38bdf8]">
            FLEX
          </span>
          <span className="font-alt text-2xl md:text-3xl font-black tracking-tighter text-[#0f172a]">
            JEANS
          </span>
          <div className="w-2 h-2 rounded-full bg-[#38bdf8] mt-3 ml-1 animate-pulse"></div>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#colecao"
            className="text-sm font-bold text-gray-500 hover:text-[#0f172a] transition-colors uppercase tracking-wide cursor-pointer"
          >
            Coleção
          </a>
          <a
            href="#tecnologia"
            className="text-sm font-bold text-gray-500 hover:text-[#0f172a] transition-colors uppercase tracking-wide cursor-pointer"
          >
            Tecnologia
          </a>
          <a
            href="#depoimentos"
            className="text-sm font-bold text-gray-500 hover:text-[#0f172a] transition-colors uppercase tracking-wide cursor-pointer"
          >
            Depoimentos
          </a>

          <button
            onClick={openModal}
            className="bg-[#0f172a] hover:bg-[#38bdf8] text-white px-8 py-3 rounded text-xs font-bold uppercase tracking-widest transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
          >
            Comprar Agora
          </button>
        </nav>

        {/* BOTÃO TOGGLE MOBILE */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-[#0f172a] z-50 relative"
        >
          {isMenuOpen ? (
            // Ícone X (Fechar)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Ícone Hambúrguer (Abrir) - Original do seu código
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        {/* --- MENU MOBILE DROPDOWN --- */}
        <div
          className={`absolute top-0 left-0 w-full bg-white shadow-xl md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-10"
          }`}
        >
          <div className="flex flex-col pt-24 pb-8 px-6 gap-6">
            <a
              href="#colecao"
              onClick={closeMenu}
              className="text-lg font-bold text-[#0f172a] border-b border-gray-100 pb-4 flex justify-between items-center"
            >
              Coleção
              <span className="text-[#38bdf8]">→</span>
            </a>

            <a
              href="#tecnologia"
              onClick={closeMenu}
              className="text-lg font-bold text-[#0f172a] border-b border-gray-100 pb-4 flex justify-between items-center"
            >
              Tecnologia
              <span className="text-[#38bdf8]">→</span>
            </a>

            <a
              href="#depoimentos"
              onClick={closeMenu}
              className="text-lg font-bold text-[#0f172a] border-b border-gray-100 pb-4 flex justify-between items-center"
            >
              Depoimentos
              <span className="text-[#38bdf8]">→</span>
            </a>

            <button
              onClick={() => {
                closeMenu();
                openModal();
              }}
              className="mt-4 w-full bg-[#0f172a] hover:bg-[#38bdf8] text-white py-4 rounded font-bold uppercase tracking-widest shadow-lg transition-colors"
            >
              Comprar Agora
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
