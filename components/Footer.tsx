"use client";

import Link from "next/link";
import { useState } from "react";
import TrackOrderModal from "./TrackOrderModal"; // Ajustei para o padrão (sem 'r' extra se for o caso, ou mantenha Tracker)

export default function Footer() {
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900 pt-16 pb-8 text-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          {/* --- GRID SUPERIOR (4 COLUNAS) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* COLUNA 1: ATENDIMENTO */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">
                Atendimento
              </h3>
              <div className="flex flex-col gap-4">
                <p className="leading-relaxed">
                  Das 9h às 12h e 13h às 17h,
                  <br />
                  de segunda à sexta-feira.
                </p>
                <div>
                  <span className="block text-xs uppercase font-bold text-zinc-500 mb-1">
                    WhatsApp / Telefone
                  </span>
                  <a
                    href="https://wa.me/5581996490084"
                    target="_blank"
                    className="text-white font-bold text-xl hover:text-sky-500 transition-colors"
                  >
                    (81) 9 9649-0084
                  </a>
                </div>
                <div>
                  <span className="block text-xs uppercase font-bold text-zinc-500 mb-1">
                    E-mail
                  </span>
                  <a
                    href="mailto:atendimento@useurbanflex.com"
                    className="hover:text-sky-500 transition-colors"
                  >
                    atendimento@useurbanflex.com
                  </a>
                </div>
              </div>
            </div>

            {/* COLUNA 2: AJUDA E SUPORTE */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">
                Ajuda e Suporte
              </h3>
              <ul className="flex flex-col gap-3">
                {/* O botão foi removido daqui e movido para baixo */}
                <li>
                  <Link
                    href="/empresa"
                    className="hover:text-sky-500 transition-colors hover:pl-2 block"
                  >
                    A Empresa
                  </Link>
                </li>
                <li>
                  <Link
                    href="/troca-devolucao"
                    className="hover:text-sky-500 transition-colors hover:pl-2 block"
                  >
                    Troca, Devolução e Garantia
                  </Link>
                </li>
                <li>
                  <Link
                    href="/seguranca"
                    className="hover:text-sky-500 transition-colors hover:pl-2 block"
                  >
                    Segurança e Privacidade
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pagamento"
                    className="hover:text-sky-500 transition-colors hover:pl-2 block"
                  >
                    Política de Pagamento
                  </Link>
                </li>
                <li>
                  <Link
                    href="/entrega"
                    className="hover:text-sky-500 transition-colors hover:pl-2 block"
                  >
                    Política de Entrega
                  </Link>
                </li>
              </ul>
            </div>

            {/* COLUNA 3: PAGAMENTO */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">
                Pagamento
              </h3>
              <div className="flex items-center gap-3">
                <img
                  src="/pix.png"
                  alt="Pix"
                  className="h-6 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
                <img
                  src="/visa.png"
                  alt="Visa"
                  className="h-6 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
                <img
                  src="/master.png"
                  alt="Mastercard"
                  className="h-6 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
                <img
                  src="/elo.png"
                  alt="Elo"
                  className="h-6 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            {/* COLUNA 4: SEGURANÇA */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">
                Segurança
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3 items-center">
                  <a
                    href="https://transparencyreport.google.com/safe-browsing/search?url=https://useurbanflex.com"
                    target="_blank"
                    className="hover:opacity-90 transition-all"
                  >
                    <img
                      src="/certificado2.png"
                      alt="Google Safe Browsing"
                      className="h-8 w-auto object-contain"
                    />
                  </a>
                  <a
                    href="https://safeweb.norton.com/report/show?url=www.useurbanflex.com"
                    target="_blank"
                    className="hover:opacity-90 transition-all"
                  >
                    <img
                      src="/certificado1.png"
                      alt="Norton Safe Web"
                      className="h-8 w-auto object-contain"
                    />
                  </a>
                </div>
                <p className="text-xs text-zinc-500 mt-2">
                  Ambiente criptografado e 100% seguro.
                </p>
              </div>
            </div>
          </div>

          {/* --- NOVA ÁREA CENTRALIZADA: RASTREAR PEDIDO (ENTRE AS DIVS) --- */}
          <div className="w-full flex justify-center pb-12">
            <button
              onClick={() => setIsTrackModalOpen(true)}
              className="group flex items-center gap-3 bg-zinc-900 border border-zinc-800 hover:border-sky-500/50 hover:bg-zinc-800 text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest transition-all shadow-lg hover:shadow-sky-900/20 active:scale-95"
            >
              <span className="p-1.5 bg-sky-500/10 rounded-full group-hover:bg-sky-500 text-sky-500 group-hover:text-white transition-colors duration-300">
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
              </span>
              RASTREAR MEU PEDIDO
            </button>
          </div>

          {/* --- DIV DE BAIXO: RODAPÉ LEGAL --- */}
          <div className="border-t border-zinc-900 pt-8 text-center md:text-left">
            <div className="mb-4">
              <span className="text-2xl font-black tracking-tighter text-zinc-700">
                URBAN FLEX
              </span>
            </div>
            <div className="text-[10px] md:text-xs text-zinc-500 leading-relaxed space-y-2">
              <p>
                CNPJ: 33.535.374/0001-60 | Endereço: Rua Helena de Lemos, 330 -
                Sala 104 CXPST 3 - Ilha do Retiro - Recife - PE. CEP:
                50.750-630.
              </p>
              <p>
                Vendas sujeitas à análise de confirmação de dados. Preços e
                condições comerciais estão sujeitos à alteração sem aviso
                prévio. As imagens dos produtos são meramente ilustrativas. A
                reprodução, distribuição ou comercialização de qualquer conteúdo
                deste site, seja ele textos, imagens ou informações, é
                expressamente proibida sem autorização prévia.
              </p>
              <p className="font-bold pt-2">
                © {new Date().getFullYear()} Todos os Direitos Reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL GLOBAL */}
      <TrackOrderModal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
      />
    </>
  );
}
