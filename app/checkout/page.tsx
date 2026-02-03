"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Step1_Identification from "./_components/Step1_Identification";
import Step2_Delivery from "./_components/Step2_Delivery";
import Step3_Payment from "./_components/Step3_Payment";
import OrderSummary from "./_components/OrderSummary";

// --- Componente de Prova Social ---
const reviews = [
  {
    initials: "LS",
    name: "Lucas S.",
    text: '"Nunca me senti tão seguro em uma compra online! O processo de pagamento é rápido. Recomendo!"',
    stars: 5,
  },
  {
    initials: "AP",
    name: "Ana P.",
    text: '"Gostei muito, qualidade absurda!! Recomendo muito."',
    stars: 5,
  },
  {
    initials: "PM",
    name: "Pedro M.",
    text: '"A experiência de pagamento foi impecável! Usei o PIX e ainda ganhei um desconto extra. Suporte nota 10."',
    stars: 5,
  },
];

const SocialProof = () => (
  // MUDANÇA: bg-zinc-900 -> bg-card | border-zinc-800 -> border-border
  <div className="bg-card border border-border rounded-2xl p-4 md:p-6 shadow-lg opacity-80 hover:opacity-100 transition-opacity mt-6 md:mt-0 space-y-6">
    {reviews.map((review, index) => (
      <div
        key={index}
        // MUDANÇA: border-zinc-800 -> border-border
        className={index !== 0 ? "pt-6 border-t border-border" : ""}
      >
        <div className="flex gap-0.5 text-yellow-500 mb-2 text-xs">
          {Array.from({ length: review.stars }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
        {/* MUDANÇA: text-zinc-400 -> text-muted-foreground */}
        <p className="text-xs text-muted-foreground italic leading-relaxed mb-3">
          {review.text}
        </p>
        <div className="flex items-center gap-3">
          {/* MUDANÇA: bg-zinc-800 -> bg-muted | border-zinc-700 -> border-border | text-white -> text-foreground */}
          <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center text-[10px] font-bold text-foreground shadow-inner">
            {review.initials}
          </div>
          <div>
            {/* MUDANÇA: text-white -> text-foreground */}
            <p className="text-foreground text-xs font-bold">{review.name}</p>
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3 h-3 text-green-500"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
              {/* MUDANÇA: text-zinc-500 -> text-muted-foreground */}
              <span className="text-[10px] text-muted-foreground">
                Cliente Verificado
              </span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

function CheckoutContent() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const [selectedSize, setSelectedSize] = useState("M");
  const [productPrice, setProductPrice] = useState(99.9);

  // ESTADO DA QUANTIDADE ELEVADO PARA O PAI
  const [quantity, setQuantity] = useState(1);

  const [shippingMethod, setShippingMethod] = useState<"free" | "express">(
    "free",
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

  const [timeLeft, setTimeLeft] = useState({ minutes: 10, seconds: 0 });

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
          console.error(error);
        }
      }
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds === 0)
          return prev.minutes === 0
            ? { minutes: 0, seconds: 0 }
            : { minutes: prev.minutes - 1, seconds: 59 };
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const goToStep = (step: number) => {
    if (step > currentStep) return;
    setCurrentStep(step);
  };
  const nextStep = () => setCurrentStep((prev) => prev + 1);

  const handleFinishCheckout = async () => {
    try {
      // 1. Cálculos iniciais (mantendo a lógica antiga para o Front-end)
      const totalProductPrice = productPrice * quantity;

      // 2. Prepara os dados para o Banco de Dados (API)
      const cartItem = {
        name: "Kit 2 Camisas Urban Flex Jeans",
        size: selectedSize,
        quantity: quantity,
        price: productPrice,
      };

      const payload = {
        customer,
        address,
        cart: [cartItem],
        paymentMethod,
        totalAmount: totalProductPrice,
      };

      // 3. CHAMA A API (Mantive a lógica da API que criamos antes para garantir funcionamento)
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        const dataForThankYouPage = {
          customer,
          address,
          paymentMethod,
          shipping: shippingMethod, // Importante: A página de obrigado precisa disso
          size: selectedSize, // Importante: A página de obrigado precisa disso
          price: totalProductPrice, // Importante: Chama 'price' e não 'totalAmount'
          quantity: quantity,
          orderId: data.orderId, // Adicionamos o ID real do banco
        };

        sessionStorage.setItem(
          "checkoutData",
          JSON.stringify(dataForThankYouPage),
        );

        router.push("/checkout/thank-you");
      } else {
        alert("Houve um erro ao processar seu pedido. Tente novamente.");
        console.error("Erro API:", data.error);
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    // MUDANÇA: bg-zinc-950 -> bg-background | text-gray-300 -> text-muted-foreground
    <div className="min-h-screen bg-background text-muted-foreground font-sans selection:bg-sky-500/30 transition-colors duration-300">
      {/* HEADER + TIMER */}
      {/* MUDANÇA: bg-zinc-950 -> bg-background */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm shadow-xl shadow-black/20">
        {/* MUDANÇA: bg-[#0f172a] -> bg-card (Adaptativo) | border-zinc-800 -> border-border */}
        <div className="bg-card text-center py-1.5 border-b border-border">
          {/* MUDANÇA: text-white -> text-foreground */}
          <p className="text-[10px] md:text-xs font-medium text-foreground flex items-center justify-center gap-2 animate-pulse">
            <span>⏱️ Oferta expira em</span>
            <span className="text-yellow-500 font-bold font-mono text-xs md:text-sm">
              00:{String(timeLeft.minutes).padStart(2, "0")}:
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-14 md:h-20 flex items-center justify-between">
          <Link
            href="/"
            // MUDANÇA: text-white -> text-foreground
            className="font-alt text-xl md:text-3xl font-black text-foreground tracking-tighter hover:opacity-90 transition-opacity flex items-center gap-1"
          >
            URBAN<span className="text-sky-500">FLEX</span>
            <span className="hidden md:inline">JEANS</span>{" "}
            <span className="text-sky-500">.</span>
          </Link>

          {/* MUDANÇA: text-gray-400 -> text-muted-foreground */}
          <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-bold text-muted-foreground opacity-80 text-right leading-tight">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 md:w-5 md:h-5 text-green-500 shrink-0"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                clipRule="evenodd"
              />
            </svg>
            <div className="whitespace-nowrap">
              PAGAMENTO
              <br className="md:hidden" />
              <span className="hidden md:inline"> </span>100% SEGURO
            </div>
          </div>
        </div>
      </header>

      {/* TRILHA DE PROGRESSO */}
      {/* MUDANÇA: bg-zinc-900/50 -> bg-background/80 | border-zinc-800 -> border-border */}
      <div className="md:hidden grid grid-cols-3 px-6 py-3 bg-background/80 border-b border-border mb-2 sticky top-[85px] z-40 backdrop-blur-md">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`flex flex-col items-center gap-0.5 ${
              currentStep === step ? "opacity-100" : "opacity-40"
            }`}
            onClick={() => step < currentStep && goToStep(step)}
          >
            <div
              // MUDANÇA: bg-zinc-800 -> bg-muted (Inativo) | bg-white -> bg-foreground (Ativo) | text-black -> text-background (Ativo)
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                currentStep === step
                  ? "bg-foreground text-background scale-110 shadow-lg shadow-black/10"
                  : step < currentStep
                    ? "bg-green-500 text-white cursor-pointer"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {step < currentStep ? "✓" : step}
            </div>
            <span className="text-[8px] uppercase font-bold tracking-wider">
              {step === 1 ? "Dados" : step === 2 ? "Entrega" : "Pagamento"}
            </span>
          </div>
        ))}
      </div>

      {/* GRID PRINCIPAL */}
      <main className="max-w-[1200px] mx-auto px-4 py-4 md:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* COLUNA 1 */}
        <div className="lg:col-span-4 space-y-4 order-2 lg:order-1">
          <div className={`${currentStep === 1 ? "block" : "hidden lg:block"}`}>
            <Step1_Identification
              currentStep={currentStep}
              completeStep={nextStep}
              customer={customer}
              setCustomer={setCustomer}
              goToStep={goToStep}
            />
          </div>

          <div className={`${currentStep === 2 ? "block" : "hidden lg:block"}`}>
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

          <div className="md:hidden block">
            {(currentStep === 1 || currentStep === 2) && <SocialProof />}
          </div>
        </div>

        {/* COLUNA 2 */}
        <div className="lg:col-span-4 order-3 lg:order-2">
          <div className={`${currentStep === 3 ? "block" : "hidden lg:block"}`}>
            <Step3_Payment
              currentStep={currentStep}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              onFinish={handleFinishCheckout}
            />
            <div className="md:hidden mt-4">
              <SocialProof />
            </div>
          </div>
        </div>

        {/* COLUNA 3 */}
        <div className="lg:col-span-4 order-1 lg:order-3">
          <OrderSummary
            shippingMethod={shippingMethod}
            paymentMethod={paymentMethod}
            selectedSize={selectedSize}
            productPrice={productPrice}
            quantity={quantity} // Passando quantidade para o filho
            setQuantity={setQuantity} // Passando setQuantity para o filho
          />
          <div className="hidden md:block mt-6">
            <SocialProof />
          </div>
        </div>
      </main>

      {/* FOOTER */}
      {/* MUDANÇA: border-zinc-900 -> border-border | bg-zinc-950 -> bg-background */}
      <footer className="py-8 md:py-10 border-t border-border text-center bg-background mt-auto">
        <div className="max-w-4xl mx-auto px-6">
          {/* MUDANÇA: text-zinc-600 -> text-muted-foreground */}
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-4">
            Formas de Pagamento
          </p>
          <div className="flex justify-center gap-3 opacity-50 mb-6 md:mb-8 hover:opacity-80">
            <img src="/card-master.svg" alt="" />
            <img src="/card-visa.svg" alt="" />
            <img src="/card-elo.svg" alt="" />
            <img src="/card-amex.svg" alt="" />
            <img src="/card-diners.svg" alt="" />
            <img className="w-20 h-auto" src="/pix.png" alt="" />
          </div>
          {/* MUDANÇA: text-zinc-700 -> text-muted-foreground */}
          <p className="text-[10px] text-muted-foreground">
            URBAN FLEX ® 2025. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        // MUDANÇA: bg-zinc-950 -> bg-background | text-white -> text-foreground
        <div className="min-h-screen bg-background flex items-center justify-center text-foreground">
          Carregando...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
