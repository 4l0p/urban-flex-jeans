"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Step3Props {
  currentStep: number;
  paymentMethod: "credit" | "pix" | "boleto";
  setPaymentMethod: (method: "credit" | "pix" | "boleto") => void;
}

export default function Step3_Payment({
  currentStep,
  paymentMethod,
  setPaymentMethod,
}: Step3Props) {
  const router = useRouter();

  // --- ESTADOS ---
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
    installments: "1",
  });

  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({}); // Novo estado para controle visual
  const [isFlipped, setIsFlipped] = useState(false);

  // Status do Pagamento: 'idle' | 'processing' | 'success' | 'error'
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");

  // --- VALIDAÇÕES CENTRALIZADAS ---
  const validators = {
    number: (value: string) => value.replace(/\s/g, "").length >= 16,
    name: (value: string) => value.trim().length >= 3,
    cvv: (value: string) => value.length >= 3,
    expiry: (value: string) => {
      if (value.length < 5) return false;
      const [m, y] = value.split("/");
      const year = parseInt("20" + y);
      const month = parseInt(m);
      const today = new Date();
      // Lógica de data inválida ou vencida
      if (
        isNaN(month) ||
        isNaN(year) ||
        month < 1 ||
        month > 12 ||
        year < 2025 ||
        new Date(year, month - 1) <
          new Date(today.getFullYear(), today.getMonth())
      ) {
        return false;
      }
      return true;
    },
  };

  // --- MÁSCARAS & CHANGE ---
  const handleCardMask = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    let value = e.target.value;

    // Máscaras
    if (field === "number") {
      value = value
        .replace(/\D/g, "")
        .replace(/(\d{4})(\d)/, "$1 $2")
        .replace(/(\d{4})(\d)/, "$1 $2")
        .replace(/(\d{4})(\d)/, "$1 $2")
        .replace(/(\d{4})\d+?$/, "$1");
    } else if (field === "expiry") {
      value = value.replace(/\D/g, "");
      if (value.length >= 2) {
        const month = parseInt(value.substring(0, 2));
        if (month > 12) value = "12" + value.substring(2);
      }
      value = value
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\/\d{2})\d+?$/, "$1");
    } else if (field === "cvv") {
      value = value.replace(/\D/g, "");
    } else if (field === "name") {
      value = value.toUpperCase();
    }

    setCardData({ ...cardData, [field]: value });

    // Validação em tempo real se já foi tocado
    if (touched[field]) {
      const isValid = validators[field as keyof typeof validators]
        ? validators[field as keyof typeof validators](value)
        : true;
      setErrors((prev: any) => ({ ...prev, [field]: !isValid }));
    }
  };

  // --- VALIDAÇÃO NO BLUR ---
  const handleBlur = (field: string) => {
    setTouched((prev: any) => ({ ...prev, [field]: true }));

    const isValid = validators[field as keyof typeof validators]
      ? validators[field as keyof typeof validators](
          cardData[field as keyof typeof cardData]
        )
      : true;

    setErrors((prev: any) => ({ ...prev, [field]: !isValid }));
  };

  // --- SUBMIT ---
  const handlePaymentSubmit = () => {
    if (paymentMethod === "credit") {
      // 1. Marca todos como tocados para mostrar erros
      setTouched({
        number: true,
        name: true,
        expiry: true,
        cvv: true,
      });

      // 2. Valida
      const numberValid = validators.number(cardData.number);
      const nameValid = validators.name(cardData.name);
      const cvvValid = validators.cvv(cardData.cvv);
      const expiryValid = validators.expiry(cardData.expiry);

      setErrors({
        number: !numberValid,
        name: !nameValid,
        expiry: !expiryValid,
        cvv: !cvvValid,
      });

      if (!numberValid || !nameValid || !expiryValid || !cvvValid) {
        return;
      }
    }

    // 2. Inicia Processamento
    setPaymentStatus("processing");

    // 3. Simula API (Delay de 3s)
    setTimeout(() => {
      const shouldFail = false; // Mude para true para testar erro

      if (shouldFail) {
        setPaymentStatus("error");
      } else {
        setPaymentStatus("success");
        setTimeout(() => {
          router.push("/checkout/thank-you");
        }, 2500);
      }
    }, 3000);
  };

  // Helper para renderizar o Ícone de Check
  const RenderCheckIcon = ({ customClass = "" }) => (
    <div
      className={`absolute top-1/2 -translate-y-1/2 text-green-500 animate-in fade-in zoom-in duration-200 ${
        customClass || "right-4"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );

  // --- RENDERIZAÇÃO ---

  // 1. ESTADO INATIVO
  if (currentStep < 3) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 opacity-50 grayscale select-none pointer-events-none transition-all">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-zinc-950 border border-zinc-700 text-white flex items-center justify-center text-xs font-bold">
            3
          </div>
          <h2 className="text-white font-bold text-sm tracking-wide uppercase">
            Pagamento
          </h2>
        </div>
      </div>
    );
  }

  // 2. ESTADO ATIVO (COM MODAIS DE OVERLAY)
  return (
    <div className="bg-zinc-900 border border-sky-500 ring-1 ring-sky-500/20 shadow-xl shadow-sky-900/10 rounded-2xl overflow-hidden transition-all duration-300 relative">
      {/* === OVERLAY GERAL (Fundo Escuro) === */}
      {paymentStatus !== "idle" && (
        <div className="absolute inset-0 z-50 bg-zinc-950/95 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300 p-6 text-center">
          {/* A. PROCESSANDO */}
          {paymentStatus === "processing" && (
            <>
              <div className="w-16 h-16 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mb-6"></div>
              <p className="text-white font-bold text-sm tracking-widest animate-pulse">
                PROCESSANDO PAGAMENTO...
              </p>
              <p className="text-zinc-500 text-xs mt-2">
                Estamos validando seus dados. Não feche esta tela.
              </p>
            </>
          )}

          {/* B. SUCESSO */}
          {paymentStatus === "success" && (
            <div className="flex flex-col items-center animate-in zoom-in duration-300">
              <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(34,197,94,0.6)]">
                <svg
                  className="w-10 h-10 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                    className="animate-draw-check"
                    style={{
                      strokeDasharray: 50,
                      strokeDashoffset: 50,
                      animation: "drawCheck 0.5s forwards 0.2s",
                    }}
                  />
                </svg>
              </div>
              <p className="text-green-500 font-black text-xl tracking-wide mb-1">
                PAGAMENTO APROVADO!
              </p>
              <p className="text-zinc-400 text-xs">Redirecionando você...</p>
              <style jsx>{`
                @keyframes drawCheck {
                  to {
                    stroke-dashoffset: 0;
                  }
                }
              `}</style>
            </div>
          )}

          {/* C. ERRO */}
          {paymentStatus === "error" && (
            <div className="flex flex-col items-center animate-in zoom-in duration-300">
              <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  stroke="white"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <p className="text-red-500 font-black text-lg tracking-wide mb-2 uppercase">
                Pagamento Recusado
              </p>
              <p className="text-zinc-400 text-xs max-w-[250px] mb-6 leading-relaxed">
                A operadora do cartão não autorizou a transação. Verifique os
                dados ou tente outro cartão.
              </p>
              <button
                onClick={() => setPaymentStatus("idle")}
                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg text-xs uppercase tracking-wide transition-colors border border-zinc-700"
              >
                Tentar Novamente
              </button>
            </div>
          )}
        </div>
      )}

      {/* HEADER DO CARD */}
      <div className="p-5 border-b border-zinc-800 bg-zinc-900/50 flex items-center gap-3">
        <div className="w-6 h-6 rounded-full bg-zinc-950 border border-zinc-700 text-white flex items-center justify-center text-xs font-bold shadow-inner">
          3
        </div>
        <h2 className="text-white font-bold text-sm tracking-wide uppercase">
          Pagamento
        </h2>
      </div>

      {/* CONTEÚDO DO FORMULÁRIO */}
      <div className="p-5">
        <p className="text-[11px] text-zinc-500 mb-5">
          Escolha uma forma de pagamento segura.
        </p>

        {/* ABAS */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-zinc-950 rounded-lg border border-zinc-800 mb-6">
          <button
            onClick={() => setPaymentMethod("credit")}
            className={`py-2.5 text-[10px] font-bold uppercase rounded-md transition-all ${
              paymentMethod === "credit"
                ? "bg-zinc-800 text-white shadow-sm ring-1 ring-white/10"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Cartão
          </button>
          <button
            onClick={() => setPaymentMethod("pix")}
            className={`py-2.5 text-[10px] font-bold uppercase rounded-md transition-all flex flex-col items-center justify-center leading-none gap-0.5 ${
              paymentMethod === "pix"
                ? "bg-green-600 text-white shadow-sm ring-1 ring-white/10"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            PIX <span className="text-[8px] opacity-80">-5% OFF</span>
          </button>
          <button
            onClick={() => setPaymentMethod("boleto")}
            className={`py-2.5 text-[10px] font-bold uppercase rounded-md transition-all ${
              paymentMethod === "boleto"
                ? "bg-zinc-800 text-white shadow-sm ring-1 ring-white/10"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Boleto
          </button>
        </div>

        {/* --- CARTÃO DE CRÉDITO --- */}
        {paymentMethod === "credit" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Cartão 3D */}
            <div className="w-full h-48 perspective-1000 relative mx-auto max-w-[320px]">
              <div
                className="w-full h-full relative transition-transform duration-700 preserve-3d"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                <div
                  className="absolute w-full h-full rounded-xl bg-gradient-to-br from-zinc-700 via-zinc-800 to-black border border-zinc-600 shadow-2xl p-5 flex flex-col justify-between backface-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-7 bg-yellow-500/80 rounded-md flex items-center justify-center overflow-hidden">
                      <div className="w-full h-[1px] bg-black/20 my-[2px]"></div>
                      <div className="w-full h-[1px] bg-black/20 my-[2px]"></div>
                    </div>
                    <p className="text-white font-bold italic opacity-50 text-xs">
                      CREDIT
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-mono text-lg tracking-widest drop-shadow-md mb-3">
                      {cardData.number || "**** **** **** ****"}
                    </p>
                    <div className="flex justify-between items-end">
                      <div className="overflow-hidden">
                        <p className="text-[8px] text-zinc-400 uppercase">
                          Nome do Titular
                        </p>
                        <p className="text-white text-xs font-bold uppercase tracking-wider truncate max-w-[180px]">
                          {cardData.name || "NOME IMPRESSO"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[8px] text-zinc-400 uppercase text-right">
                          Validade
                        </p>
                        <p className="text-white text-xs font-bold font-mono text-right">
                          {cardData.expiry || "MM/AA"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="absolute w-full h-full rounded-xl bg-gradient-to-bl from-zinc-800 to-zinc-900 border border-zinc-600 shadow-2xl overflow-hidden backface-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="w-full h-10 bg-black mt-5 opacity-90"></div>
                  <div className="px-5 mt-4">
                    <div className="text-[8px] text-zinc-400 uppercase text-right pr-2 mb-1">
                      Cód. Segurança
                    </div>
                    <div className="w-full h-8 bg-white rounded flex items-center justify-end px-2">
                      <span className="font-mono text-black font-bold tracking-widest">
                        {cardData.cvv || "***"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider pl-1">
                  Número do Cartão
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                    className={`w-full h-12 bg-zinc-950 border rounded-lg px-4 pl-11 text-sm text-white outline-none transition-all placeholder-zinc-700 
                      ${
                        touched.number && !errors.number
                          ? "border-green-500 focus:border-green-500"
                          : ""
                      }
                      ${
                        touched.number && errors.number
                          ? "border-red-500 focus:border-red-500"
                          : "border-zinc-800 focus:border-sky-500"
                      }
                    `}
                    value={cardData.number}
                    onChange={(e) => handleCardMask(e, "number")}
                    onFocus={() => setIsFlipped(false)}
                    onBlur={() => handleBlur("number")}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                  {touched.number && !errors.number && <RenderCheckIcon />}
                  {touched.number && errors.number && (
                    <p className="absolute -bottom-4 right-0 text-[9px] text-red-500 font-bold uppercase animate-pulse">
                      Informe o número do cartão
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider pl-1">
                  Nome Impresso
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="COMO NO CARTÃO"
                    className={`w-full h-12 bg-zinc-950 border rounded-lg px-4 text-sm text-white outline-none uppercase transition-all placeholder-zinc-700 
                      ${
                        touched.name && !errors.name
                          ? "border-green-500 focus:border-green-500"
                          : ""
                      }
                      ${
                        touched.name && errors.name
                          ? "border-red-500 focus:border-red-500"
                          : "border-zinc-800 focus:border-sky-500"
                      }
                    `}
                    value={cardData.name}
                    onChange={(e) => handleCardMask(e, "name")}
                    onFocus={() => setIsFlipped(false)}
                    onBlur={() => handleBlur("name")}
                  />
                  {touched.name && !errors.name && <RenderCheckIcon />}
                  {touched.name && errors.name && (
                    <p className="absolute -bottom-4 right-0 text-[9px] text-red-500 font-bold uppercase animate-pulse">
                      informe o nome do titular
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider pl-1">
                    Validade
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="MM/AA"
                      maxLength={5}
                      className={`w-full h-12 bg-zinc-950 border rounded-lg px-4 text-sm text-white outline-none text-center transition-all placeholder-zinc-700 
                        ${
                          touched.expiry && !errors.expiry
                            ? "border-green-500 focus:border-green-500"
                            : ""
                        }
                        ${
                          touched.expiry && errors.expiry
                            ? "border-red-500 focus:border-red-500"
                            : "border-zinc-800 focus:border-sky-500"
                        }
                      `}
                      value={cardData.expiry}
                      onChange={(e) => handleCardMask(e, "expiry")}
                      onFocus={() => setIsFlipped(false)}
                      onBlur={() => handleBlur("expiry")}
                    />
                    {touched.expiry && !errors.expiry && <RenderCheckIcon />}
                    {touched.expiry && errors.expiry && (
                      <p className="absolute -bottom-4 right-0 text-[9px] text-red-500 font-bold uppercase animate-pulse">
                        informe mês / ano
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider pl-1">
                    CVV
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="123"
                      maxLength={4}
                      className={`w-full h-12 bg-zinc-950 border rounded-lg px-4 text-sm text-white outline-none text-center transition-all placeholder-zinc-700 
                        ${
                          touched.cvv && !errors.cvv
                            ? "border-green-500 focus:border-green-500"
                            : ""
                        }
                        ${
                          touched.cvv && errors.cvv
                            ? "border-red-500 focus:border-red-500"
                            : "border-zinc-800 focus:border-sky-500"
                        }
                      `}
                      value={cardData.cvv}
                      onChange={(e) => handleCardMask(e, "cvv")}
                      onFocus={() => setIsFlipped(true)}
                      onBlur={() => {
                        setIsFlipped(false);
                        handleBlur("cvv");
                      }}
                    />
                    {/* Se estiver válido e tocado, mostra o check. Se não, mostra o ícone de ajuda padrão */}
                    {touched.cvv && !errors.cvv ? (
                      <RenderCheckIcon customClass="right-3.5" />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                    )}
                    {touched.cvv && errors.cvv && (
                      <p className="absolute -bottom-4 right-0 text-[9px] text-red-500 font-bold uppercase animate-pulse">
                        Informe o CVV
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider pl-1">
                  Parcelamento
                </label>
                <div className="relative">
                  <select
                    className="w-full h-12 bg-zinc-950 border border-zinc-800 rounded-lg px-4 text-sm text-white focus:border-sky-500 outline-none appearance-none transition-all cursor-pointer"
                    value={cardData.installments}
                    onChange={(e) =>
                      setCardData({
                        ...cardData,
                        installments: e.target.value,
                      })
                    }
                    onFocus={() => setIsFlipped(false)}
                  >
                    <option value="1">1x de R$ 99,90 (Sem juros)</option>
                    <option value="2">2x de R$ 49,95 (Sem juros)</option>
                    <option value="3">3x de R$ 33,30 (Sem juros)</option>
                    <option value="4">4x de R$ 24,97 (Sem juros)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4 text-zinc-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Botão Pagar com ícone de Cadeado */}
              <button
                onClick={handlePaymentSubmit}
                className="group relative w-full mt-6 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-sky-500 hover:to-blue-600 text-white font-bold py-4 rounded-lg uppercase tracking-widest shadow-lg shadow-sky-900/20 transform active:scale-[0.98] transition-all flex items-center justify-center"
              >
                <span className="text-sm">PAGAR COM CARTÃO</span>
                <div className="absolute right-6 flex items-center group-hover:translate-x-1 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* --- PIX --- */}
        {paymentMethod === "pix" && (
          <div className="animate-in fade-in zoom-in duration-300">
            {/* Box PIX Atualizado */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 mb-6">
              {/* Header com Logo e Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-white font-bold text-lg flex items-center gap-2">
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-green-500"
                  >
                    <path d="M12 2L2 19h20L12 2zm0 3.8l6.8 11.2H5.2L12 5.8z" />
                    <circle cx="12" cy="13" r="2" />
                  </svg>
                  PIX */}
                  <img
                    className="h-auto w-22"
                    src="/pix.png"
                    alt="Processado por Pix Banco Central"
                  />
                </div>
                <div className="bg-green-500 text-black text-[10px] font-bold px-2 py-1 rounded">
                  Aprovação Imediata + 5% OFF
                </div>
              </div>

              {/* Lista de Benefícios */}
              <ul className="space-y-3 text-zinc-400 text-xs list-disc pl-4 leading-tight">
                <li>30 minutos para pagar</li>
                <li>Pagamento à vista</li>
                <li>Após pagar, seu pedido é aprovado na hora</li>
                <li>Seu pedido chegará mais rápido</li>
              </ul>
            </div>

            {/* Botão PIX - Azul com Cadeado */}
            <button
              onClick={handlePaymentSubmit}
              className="group relative w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-sky-500 hover:to-blue-600 text-white font-bold py-4 rounded-lg uppercase tracking-widest shadow-lg shadow-sky-900/20 transform active:scale-[0.98] transition-all flex items-center justify-center mt-6"
            >
              <span className="text-sm">PAGAR COM PIX</span>
              <div className="absolute right-6 flex items-center group-hover:translate-x-1 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </button>
          </div>
        )}

        {/* --- BOLETO --- */}
        {paymentMethod === "boleto" && (
          <div className="animate-in fade-in zoom-in duration-300">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-8 text-center mb-6">
              <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-3 border border-zinc-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-zinc-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
              <p className="text-white font-bold text-sm">Boleto Bancário</p>
              <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                Vencimento em 3 dias úteis.
                <br />
                Pode levar até 48h para compensar.
              </p>
            </div>

            <button
              onClick={handlePaymentSubmit}
              className="group relative w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 rounded-lg uppercase tracking-widest shadow-lg shadow-black/20 transform active:scale-[0.98] transition-all flex items-center justify-center border border-zinc-700"
            >
              <span className="text-sm">GERAR BOLETO</span>
              <div className="absolute right-6 flex items-center group-hover:translate-x-1 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
