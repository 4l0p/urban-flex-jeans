"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
// useSearchParams removido pois não vamos mais ler da URL

// Importando nossos Componentes Inteligentes
import Step1_Identification from "./_components/Step1_Identification";
import Step2_Delivery from "./_components/Step2_Delivery";
import Step3_Payment from "./_components/Step3_Payment";
import OrderSummary from "./_components/OrderSummary";

function CheckoutContent() {
  // --- ESTADOS GLOBAIS (O Maestro) ---
  const [currentStep, setCurrentStep] = useState(1);

  // --- ESTADOS DE DADOS DO PRODUTO (Vindo do SessionStorage) ---
  const [selectedSize, setSelectedSize] = useState("M"); // Valor padrão
  const [productPrice, setProductPrice] = useState(99.9); // Valor padrão
  const [shippingMethod, setShippingMethod] = useState<"free" | "express">(
    "free"
  );

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
  });

  const [address, setAddress] = useState({
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<
    "credit" | "pix" | "boleto"
  >("credit");

  // --- TIMER REGRESSIVO ---
  const [timeLeft, setTimeLeft] = useState({ minutes: 10, seconds: 0 });

  // --- RECUPERA DADOS DO NAVEGADOR (SessionStorage) ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem("checkoutData");
      if (storedData) {
        try {
          const data = JSON.parse(storedData);
          if (data.size) setSelectedSize(data.size);
          if (data.price) setProductPrice(Number(data.price));
          if (data.shipping) setShippingMethod(data.shipping);
        } catch (error) {
          console.error("Erro ao ler dados do checkout", error);
        }
      }
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds === 0) {
          return prev.minutes === 0
            ? { minutes: 0, seconds: 0 }
            : { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- NAVEGAÇÃO ---
  const goToStep = (step: number) => setCurrentStep(step);
  const nextStep = () => setCurrentStep((prev) => prev + 1);

  return (
    <div className="min-h-screen bg-zinc-950 text-gray-300 font-sans selection:bg-sky-500/30">
      {/* 1. HEADER + TIMER */}
      <header className="sticky top-0 z-50 bg-zinc-950 shadow-xl shadow-black/20">
        <div className="bg-[#0f172a] text-center py-2 border-b border-zinc-800">
          <p className="text-xs font-medium text-white flex items-center justify-center gap-2 animate-pulse">
            <span>⏱️ Oferta expira em</span>
            <span className="text-yellow-400 font-bold font-mono text-sm">
              00:{String(timeLeft.minutes).padStart(2, "0")}:
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="font-alt text-3xl font-black text-white tracking-tighter hover:opacity-90 transition-opacity"
          >
            URBAN<span className="text-sky-500"> FLEX</span> JEANS{" "}
            <span className="text-sky-500">.</span>
          </Link>
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 opacity-80 text-right leading-tight">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-green-500"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              PAGAMENTO
              <br />
              100% SEGURO
            </div>
          </div>
        </div>
      </header>

      {/* 2. GRID PRINCIPAL (3 COLUNAS) */}
      <main className="max-w-[1200px] mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* === COLUNA 1: DADOS (4/12) === */}
        <div className="lg:col-span-4 space-y-4">
          <Step1_Identification
            currentStep={currentStep}
            completeStep={nextStep}
            customer={customer}
            setCustomer={setCustomer}
            goToStep={goToStep}
          />

          <Step2_Delivery
            currentStep={currentStep}
            completeStep={nextStep}
            address={address}
            setAddress={setAddress}
            shippingMethod={shippingMethod}
            setShippingMethod={setShippingMethod}
            goToStep={goToStep}
            clientName={customer.name}
          />
        </div>

        {/* === COLUNA 2: PAGAMENTO (4/12) === */}
        <div className="lg:col-span-4">
          <Step3_Payment
            currentStep={currentStep}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </div>

        {/* === COLUNA 3: RESUMO (4/12) === */}
        <div className="lg:col-span-4">
          {/* Agora passamos os estados recuperados do SessionStorage */}
          <OrderSummary
            shippingMethod={shippingMethod}
            paymentMethod={paymentMethod}
            selectedSize={selectedSize}
            productPrice={productPrice}
          />
        </div>
      </main>

      {/* 3. FOOTER MINIMALISTA */}
      <footer className="py-10 border-t border-zinc-900 text-center bg-zinc-950">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-4">
            Formas de Pagamento
          </p>
          <div className="flex justify-center gap-3 opacity-30 grayscale mb-8">
            <div className="w-8 h-5 bg-zinc-800 rounded"></div>
            <div className="w-8 h-5 bg-zinc-800 rounded"></div>
            <div className="w-8 h-5 bg-zinc-800 rounded"></div>
            <div className="w-8 h-5 bg-zinc-800 rounded"></div>
          </div>
          <div className="flex justify-center items-center gap-2 mb-6 opacity-30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-white"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-[10px] text-white font-bold">
              AMBIENTE CRIPTOGRAFADO E 100% SEGURO
            </span>
          </div>
          <p className="text-[10px] text-zinc-700">
            URBAN FLEX ® 2025. Todos os direitos reservados.
            <br />
            CNPJ: 00.000.000/0001-00 • Recife - PE
          </p>
        </div>
      </footer>
    </div>
  );
}

// Wrapper Principal
export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
          Carregando Checkout...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
