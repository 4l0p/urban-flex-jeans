import "./globals.css";
import { Montserrat, Inter } from "next/font/google";
import { Providers } from "./providers"; // <--- Importamos o Providers que você criou no passo anterior

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-montserrat",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Urban Flex Jeans | Evolution",
  description: "A revolução do conforto e estilo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* 1. Removemos a classe fixa {APP_THEME}. 
       2. O 'next-themes' vai injetar 'dark' ou 'light' aqui automaticamente.
       3. Mantemos o suppressHydrationWarning para evitar erros de renderização.
    */
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans bg-background text-foreground antialiased transition-colors duration-300`}
      >
        {/* Envolvemos o children no Providers. 
           Agora, qualquer botão dentro do site poderá trocar o tema globalmente.
        */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
