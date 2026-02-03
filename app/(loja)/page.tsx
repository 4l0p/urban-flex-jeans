import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProductShowcase from "@/components/ProductShowcase";
import Testimonials from "@/components/Testemonials";
import FAQ from "@/components/FAQ";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    // MUDANÇA: bg-black -> bg-background | text-white -> text-foreground
    // Adicionei transition-colors para suavizar a troca
    <main className="min-h-screen bg-background text-foreground selection:bg-sky-500 selection:text-white transition-colors duration-300">
      {/* 1. O Vídeo de entrada */}
      <Hero />

      {/* 2. Os diferenciais logo abaixo */}
      <Features />
      <ProductShowcase />
      <Gallery />
      <Testimonials />
      <FAQ />
    </main>
  );
}
