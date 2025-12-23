import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-gray-400 border-t border-zinc-900 pt-16 pb-8 text-sm">
      <div className="max-w-7xl mx-auto px-6">
        {/* --- GRID PRINCIPAL (4 COLUNAS) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
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
                <span className="block text-xs uppercase font-bold text-zinc-600 mb-1">
                  WhatsApp / Telefone
                </span>
                <a
                  href="https://wa.me/5581996490084"
                  target="_blank"
                  className="text-white font-bold text-xl hover:text-sky-400 transition-colors"
                >
                  (81) 9 9649-0084
                </a>
              </div>

              <div>
                <span className="block text-xs uppercase font-bold text-zinc-600 mb-1">
                  E-mail
                </span>
                <a
                  href="mailto:atendimento@useurbanflex.com"
                  className="hover:text-sky-400 transition-colors"
                >
                  atendimento@useurbanflex.com
                </a>
              </div>
            </div>
          </div>

          {/* COLUNA 2: AJUDA E SUPORTE (LINKS ATUALIZADOS) */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">
              Ajuda e Suporte
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/empresa"
                  className="hover:text-sky-400 transition-colors hover:pl-2 block"
                >
                  A Empresa
                </Link>
              </li>
              <li>
                <Link
                  href="/troca-devolucao"
                  className="hover:text-sky-400 transition-colors hover:pl-2 block"
                >
                  Troca, Devolução e Garantia
                </Link>
              </li>
              <li>
                <Link
                  href="/seguranca"
                  className="hover:text-sky-400 transition-colors hover:pl-2 block"
                >
                  Segurança e Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/pagamento"
                  className="hover:text-sky-400 transition-colors hover:pl-2 block"
                >
                  Política de Pagamento
                </Link>
              </li>
              <li>
                <Link
                  href="/entrega"
                  className="hover:text-sky-400 transition-colors hover:pl-2 block"
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
            {/* Flex row para forçar mesma linha e gap-4 para espaçamento */}
            <div className="flex items-center gap-4">
              <img
                src="/pix.png"
                alt="Pix"
                className="h-7 object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
              <img
                src="/visa.png"
                alt="Visa"
                className="h-8 object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
              <img
                src="/master.png"
                alt="Mastercard"
                className="h-8 object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
              <img
                src="/elo.png"
                alt="Elo"
                className="h-8 object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          {/* COLUNA 4: SEGURANÇA */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">
              Segurança
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <a
                  href="https://transparencyreport.google.com/safe-browsing/search?url=https://useurbanflex.com"
                  target="_blank"
                  className="opacity-70 hover:opacity-100 transition-opacity"
                >
                  <img
                    src="/certificado2.png"
                    alt="Google Safe Browsing"
                    className="h-auto w-30"
                  />
                </a>
                <a
                  href="https://safeweb.norton.com/report/show?url=www.useurbanflex.com"
                  target="_blank"
                  className="opacity-70 hover:opacity-100 transition-opacity"
                >
                  <img
                    src="/certificado1.png"
                    alt="Norton Safe Web"
                    className="h-auto w-40"
                  />
                </a>
              </div>
              <p className="text-xs text-zinc-500 mt-2">
                Ambiente criptografado e 100% seguro.
              </p>
            </div>
          </div>
        </div>

        {/* --- RODAPÉ LEGAL --- */}
        <div className="border-t border-zinc-900 pt-8 text-center md:text-left">
          <div className="mb-4">
            <span className="text-2xl font-black tracking-tighter text-zinc-700">
              URBAN FLEX
            </span>
          </div>

          <div className="text-[10px] md:text-xs text-zinc-600 leading-relaxed space-y-2">
            <p>
              CNPJ: 33.535.374/0001-60 | Endereço: Rua Helena de Lemos, 330 -
              Sala 104 CXPST 3 - Ilha do Retiro - Recife - PE. CEP: 50.750-630.
            </p>
            <p>
              Vendas sujeitas à análise de confirmação de dados. Preços e
              condições comerciais estão sujeitos à alteração sem aviso prévio.
              As imagens dos produtos são meramente ilustrativas. A reprodução,
              distribuição ou comercialização de qualquer conteúdo deste site,
              seja ele textos, imagens ou informações, é expressamente proibida
              sem autorização prévia.
            </p>
            <p className="font-bold pt-2">
              © {new Date().getFullYear()} Todos os Direitos Reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
