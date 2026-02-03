"use client";

import Link from "next/link";
import { useModal } from "@/context/ModalContext";
import { useState } from "react";
import TrackOrderModal from "@/components/TrackOrderModal";

export default function Header() {
  const { openModal } = useModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Estado para controlar o modal de rastreio
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);

  // Função para fechar o menu ao clicar em um link
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
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
            {/* ALTERADO: De <a> para <Link> e adicionado / antes do # */}
            <Link
              href="/#colecao"
              className="text-sm font-bold text-gray-500 hover:text-[#0f172a] transition-colors uppercase tracking-wide cursor-pointer"
            >
              Coleção
            </Link>
            <Link
              href="/#tecnologia"
              className="text-sm font-bold text-gray-500 hover:text-[#0f172a] transition-colors uppercase tracking-wide cursor-pointer"
            >
              Tecnologia
            </Link>
            <Link
              href="/#depoimentos"
              className="text-sm font-bold text-gray-500 hover:text-[#0f172a] transition-colors uppercase tracking-wide cursor-pointer"
            >
              Depoimentos
            </Link>

            {/* --- LINK RASTREAR (DESKTOP) --- */}
            <button
              onClick={() => setIsTrackModalOpen(true)}
              className="flex items-center gap-1.5 text-sm font-bold text-sky-500 hover:text-sky-600 transition-colors uppercase tracking-wide cursor-pointer group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
              Rastrear
            </button>

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
              // Ícone X
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
              // Ícone Hambúrguer
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
              {/* --- LINK RASTREAR (MOBILE) --- */}
              <button
                onClick={() => {
                  closeMenu();
                  setIsTrackModalOpen(true);
                }}
                className="text-lg font-bold text-sky-600 border-b border-sky-100 pb-4 flex justify-between items-center group"
              >
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>
                  Rastrear Pedido
                </div>
                <span className="text-[#38bdf8]">→</span>
              </button>

              {/* ALTERADO: De <a> para <Link> e adicionado / antes do # */}
              <Link
                href="/#colecao"
                onClick={closeMenu}
                className="text-lg font-bold text-[#0f172a] border-b border-gray-100 pb-4 flex justify-between items-center"
              >
                Coleção
                <span className="text-[#38bdf8]">→</span>
              </Link>

              <Link
                href="/#tecnologia"
                onClick={closeMenu}
                className="text-lg font-bold text-[#0f172a] border-b border-gray-100 pb-4 flex justify-between items-center"
              >
                Tecnologia
                <span className="text-[#38bdf8]">→</span>
              </Link>

              <Link
                href="/#depoimentos"
                onClick={closeMenu}
                className="text-lg font-bold text-[#0f172a] border-b border-gray-100 pb-4 flex justify-between items-center"
              >
                Depoimentos
                <span className="text-[#38bdf8]">→</span>
              </Link>

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

      <TrackOrderModal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
      />
    </>
  );
}
