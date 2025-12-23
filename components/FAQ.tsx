"use client";

import { useState } from "react";

export default function FAQ() {
  // Estado para controlar qual pergunta está aberta
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "O Kit vem com as duas cores (Azul Claro e Escuro)?",
      answer:
        "Sim! O Kit Essencial foi pensado para cobrir todas as suas necessidades. Você recebe exatamente uma unidade da Deep Blue (Escura) e uma da Sky Blue (Clara) no mesmo pacote.",
    },
    {
      question: "A modelagem Slim Fit aperta muito?",
      answer:
        "Não. Graças à nossa Flex Technology™, a camisa se ajusta ao corpo sem prender seus movimentos. É o visual alinhado do Slim com o conforto de uma malha.",
    },
    {
      question: "Como escolho meu tamanho ideal?",
      answer:
        "Recomendamos pegar o tamanho que você costuma usar em camisetas. Nossa modelagem segue o padrão brasileiro. Se você prefere algo mais solto, opte por um número maior.",
    },
    {
      question: "O tecido desbota ou encolhe?",
      answer:
        "Definitivamente não. Nossas peças passam por um processo de pré-lavagem industrial e fixação de cor (Color Lock), garantindo que o tom se mantenha vivo lavagem após lavagem.",
    },
    {
      question: "Qual o prazo de entrega e garantia?",
      answer:
        "Enviamos em até 24h úteis. O prazo médio é de 5 a 10 dias para todo o Brasil. E se não servir, a primeira troca é por nossa conta em até 7 dias.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-zinc-950 py-24 px-6 border-t border-zinc-900">
      <div className="max-w-3xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <span className="text-sky-500 font-bold tracking-widest uppercase text-sm">
            Dúvidas
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Perguntas Frequentes
          </h2>
        </div>

        {/* Lista de Perguntas */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border border-zinc-800 rounded-lg overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? "bg-zinc-900/50 border-sky-900/50"
                  : "bg-transparent hover:border-zinc-700"
              }`}
            >
              {/* Pergunta (Botão) */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none group"
              >
                <span
                  className={`font-bold text-lg transition-colors ${
                    openIndex === index
                      ? "text-sky-400"
                      : "text-white group-hover:text-gray-200"
                  }`}
                >
                  {faq.question}
                </span>

                {/* Ícone Animado (+ / -) */}
                <span
                  className={`text-2xl transition-transform duration-300 text-sky-500 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                >
                  +
                </span>
              </button>

              {/* Resposta (Slide) */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-48 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 pt-0 text-gray-400 leading-relaxed text-sm md:text-base border-t border-zinc-800/50 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
