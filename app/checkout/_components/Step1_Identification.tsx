"use client";

import { useState } from "react";

interface Step1Props {
  currentStep: number;
  completeStep: () => void;
  customer: any;
  setCustomer: (data: any) => void;
  goToStep: (step: number) => void;
}

export default function Step1_Identification({
  currentStep,
  completeStep,
  customer,
  setCustomer,
  goToStep,
}: Step1Props) {
  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});

  // --- ALGORITMO DE VALIDAÇÃO DE CPF (REAL) ---
  const isValidCPF = (cpf: string) => {
    if (typeof cpf !== "string") return false;
    cpf = cpf.replace(/[^\d]+/g, "");

    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

    const cpfDigits = cpf.split("").map((el) => +el);
    const rest = (count: number) =>
      ((cpfDigits
        .slice(0, count - 12)
        .reduce((soma, el, index) => soma + el * (count - index), 0) *
        10) %
        11) %
      10;

    return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
  };

  // --- VALIDAÇÕES ---
  const validators = {
    name: (value: string) => {
      // Mínimo: 2 letras + espaço + 2 letras
      const regex = /^[a-zA-ZÀ-ÿ]{2,}\s+[a-zA-ZÀ-ÿ]{2,}/;
      return regex.test(value.trim());
    },
    email: (value: string) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(value);
    },
    cpf: (value: string) => {
      return isValidCPF(value);
    },
    phone: (value: string) => {
      const clean = value.replace(/\D/g, "");
      return clean.length >= 10;
    },
  };

  // --- MÁSCARAS ---
  const masks = {
    cpf: (value: string) => {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
    },
    phone: (value: string) => {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
    },
  };

  // --- HANDLERS ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    let value = e.target.value;

    if (field === "cpf") value = masks.cpf(value);
    if (field === "phone") value = masks.phone(value);

    setCustomer({ ...customer, [field]: value });

    if (touched[field]) {
      const isValid = validators[field as keyof typeof validators](value);
      setErrors((prev: any) => ({ ...prev, [field]: !isValid }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev: any) => ({ ...prev, [field]: true }));
    const isValid = validators[field as keyof typeof validators](
      customer[field]
    );
    setErrors((prev: any) => ({ ...prev, [field]: !isValid }));
  };

  const handleContinue = () => {
    const nameValid = validators.name(customer.name);
    const emailValid = validators.email(customer.email);
    const cpfValid = validators.cpf(customer.cpf);
    const phoneValid = validators.phone(customer.phone);

    setTouched({ name: true, email: true, cpf: true, phone: true });
    setErrors({
      name: !nameValid,
      email: !emailValid,
      cpf: !cpfValid,
      phone: !phoneValid,
    });

    if (nameValid && emailValid && cpfValid && phoneValid) {
      completeStep();
    } else {
      // Se quiser alertar: alert("Verifique os campos em vermelho.");
    }
  };

  // --- RENDERIZAÇÃO CONDICIONAL ---

  // 1. ESTADO FECHADO (RESUMO CORRIGIDO)
  if (currentStep > 1) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex items-start justify-between transition-all">
        <div className="flex gap-4">
          {/* Ícone Verde de Check */}
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0 mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="black"
              className="w-3.5 h-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm uppercase mb-3 pt-1">
              Identificação
            </h3>
            <div className="space-y-1">
              {/* Nome em destaque, Branco */}
              <p className="font-bold text-white text-sm">{customer.name}</p>
              {/* Email Cinza */}
              <p className="text-zinc-400 text-sm">{customer.email}</p>
              {/* CPF Cinza com prefixo */}
              <p className="text-zinc-400 text-sm">CPF {customer.cpf}</p>
              {/* Telefone removido conforme pedido */}
            </div>
          </div>
        </div>
        <button
          onClick={() => goToStep(1)}
          className="p-2 hover:bg-zinc-800 rounded-full group transition-colors mt-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-zinc-500 group-hover:text-sky-400 transition-colors"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </button>
      </div>
    );
  }

  // 2. ESTADO ABERTO (FORMULÁRIO)
  return (
    <div
      className={`bg-zinc-900 border rounded-2xl overflow-hidden transition-all duration-300 ${
        currentStep === 1
          ? "border-sky-500 ring-1 ring-sky-500/20 shadow-xl shadow-sky-900/10"
          : "border-zinc-800 opacity-50"
      }`}
    >
      <div className="p-5 border-b border-zinc-800 bg-zinc-900/50 flex items-center gap-3">
        <div className="w-6 h-6 rounded-full bg-zinc-950 border border-zinc-700 text-white flex items-center justify-center text-xs font-bold shadow-inner">
          1
        </div>
        <h2 className="text-white font-bold text-sm tracking-wide uppercase">
          Identifique-se
        </h2>
      </div>

      <div className="p-5">
        <p className="text-[11px] text-zinc-500 mb-5 leading-relaxed">
          Utilizaremos seu e-mail para: Identificar seu perfil, histórico de
          compra, notificação de pedidos e carrinho de compras.
        </p>

        <div className="space-y-4">
          {/* NOME COMPLETO */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider pl-1">
              Nome Completo
            </label>
            <div className="relative group">
              <input
                type="text"
                placeholder="Ex: Maria da Silva"
                className={`w-full h-12 bg-zinc-950 border rounded-lg px-4 text-sm text-white placeholder-zinc-600 outline-none transition-all
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
                value={customer.name}
                onChange={(e) => handleChange(e, "name")}
                onBlur={() => handleBlur("name")}
              />
              {touched.name && !errors.name && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 animate-in fade-in zoom-in duration-200">
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
              )}
              {touched.name && errors.name && (
                <p className="absolute -bottom-4 right-0 text-[9px] text-red-500 font-bold uppercase tracking-wide animate-pulse">
                  Digite Nome e Sobrenome
                </p>
              )}
            </div>
          </div>

          {/* E-MAIL */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider pl-1">
              E-mail
            </label>
            <div className="relative group">
              <input
                type="email"
                placeholder="Ex: maria@gmail.com"
                className={`w-full h-12 bg-zinc-950 border rounded-lg px-4 text-sm text-white placeholder-zinc-600 outline-none transition-all
                  ${
                    touched.email && !errors.email
                      ? "border-green-500 focus:border-green-500"
                      : ""
                  }
                  ${
                    touched.email && errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-zinc-800 focus:border-sky-500"
                  }
                `}
                value={customer.email}
                onChange={(e) => handleChange(e, "email")}
                onBlur={() => handleBlur("email")}
              />
              {touched.email && !errors.email && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 animate-in fade-in zoom-in duration-200">
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
              )}
            </div>
          </div>

          {/* CPF */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider pl-1">
              CPF
            </label>
            <div className="relative group">
              <input
                type="text"
                placeholder="000.000.000-00"
                maxLength={14}
                className={`w-full h-12 bg-zinc-950 border rounded-lg px-4 text-sm text-white placeholder-zinc-600 outline-none transition-all
                  ${
                    touched.cpf && !errors.cpf
                      ? "border-green-500 focus:border-green-500"
                      : ""
                  }
                  ${
                    touched.cpf && errors.cpf
                      ? "border-red-500 focus:border-red-500"
                      : "border-zinc-800 focus:border-sky-500"
                  }
                `}
                value={customer.cpf}
                onChange={(e) => handleChange(e, "cpf")}
                onBlur={() => handleBlur("cpf")}
              />
              {touched.cpf && !errors.cpf && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 animate-in fade-in zoom-in duration-200">
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
              )}
              {touched.cpf && errors.cpf && (
                <p className="absolute -bottom-4 right-0 text-[9px] text-red-500 font-bold uppercase tracking-wide animate-pulse">
                  CPF Inválido
                </p>
              )}
            </div>
          </div>

          {/* CELULAR */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider pl-1">
              Celular / WhatsApp
            </label>
            <div className="flex gap-2">
              <div className="h-12 w-16 bg-zinc-800 border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 font-bold text-sm select-none">
                +55
              </div>
              <div className="relative flex-1 group">
                <input
                  type="text"
                  placeholder="(00) 00000-0000"
                  maxLength={15}
                  className={`w-full h-12 bg-zinc-950 border rounded-lg px-4 text-sm text-white placeholder-zinc-600 outline-none transition-all
                    ${
                      touched.phone && !errors.phone
                        ? "border-green-500 focus:border-green-500"
                        : ""
                    }
                    ${
                      touched.phone && errors.phone
                        ? "border-red-500 focus:border-red-500"
                        : "border-zinc-800 focus:border-sky-500"
                    }
                  `}
                  value={customer.phone}
                  onChange={(e) => handleChange(e, "phone")}
                  onBlur={() => handleBlur("phone")}
                />
                {touched.phone && !errors.phone && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 animate-in fade-in zoom-in duration-200">
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
                )}
              </div>
            </div>
          </div>
        </div>

        {/* BOTÃO COM SETA FIXA E ABSOLUTE */}
        <button
          onClick={handleContinue}
          className="group relative w-full mt-8 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-sky-500 hover:to-blue-600 text-white font-bold py-4 rounded-lg uppercase tracking-widest shadow-lg shadow-sky-900/20 transform active:scale-[0.98] transition-all flex items-center justify-center"
        >
          <span className="text-sm">CONTINUAR</span>
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

        {/* Ícones de Pagamento no Footer */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-center gap-2 opacity-30">
          <div className="h-5 w-8 bg-zinc-700 rounded"></div>
          <div className="h-5 w-8 bg-zinc-700 rounded"></div>
          <div className="h-5 w-8 bg-zinc-700 rounded"></div>
          <div className="h-5 w-8 bg-zinc-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}
