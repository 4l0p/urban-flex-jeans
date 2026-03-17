import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProductShowcase from "@/components/ProductShowcase";
import Testimonials from "@/components/Testemonials";
import FAQ from "@/components/FAQ";
import Gallery from "@/components/Gallery";

// 1. Importamos o Prisma para buscar o preço direto no servidor
import { prisma } from "@/lib/prisma";

export default async function Home() {
  // 2. Buscamos o preço do kit no banco de dados
  const product = await prisma.product
    .findFirst({
      where: { name: { contains: "Kit 2 Camisas" } },
    })
    .catch(() => null);

  // Valor padrão de segurança caso o banco esteja vazio
  const price = product?.price || 99.9;

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-sky-500 selection:text-white transition-colors duration-300">
      {/* 3. Passamos o preço para os componentes que precisam dele.
          Você precisará ajustar esses componentes para aceitarem a prop 'price'.
      */}
      <Hero price={price} />

      <Features />

      {/* O Showcase geralmente mostra o preço final de compra */}
      <ProductShowcase price={price} />

      <Gallery />
      <Testimonials />
      <FAQ />
    </main>
  );
}
