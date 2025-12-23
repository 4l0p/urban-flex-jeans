import Hero from "@/components/Hero";
import Features from "@/components/Features"; // <--- Importamos o Features
import ProductShowcase from "@/components/ProductShowcase";
import Testimonials from "@/components/Testemonials";
import FAQ from "@/components/FAQ";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    // Mantemos o fundo preto (bg-black) para garantir a continuidade entre as seções
    <main className="min-h-screen bg-black text-white selection:bg-sky-500 selection:text-white">
      {/* 1. O Vídeo de entrada */}
      <Hero />

      {/* 2. Os diferenciais (Cards escuros) logo abaixo */}
      <Features />
      <ProductShowcase />
      <Gallery />
      <Testimonials />
      <FAQ />
    </main>
  );
}
