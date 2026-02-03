import "./globals.css";
import { Montserrat, Inter } from "next/font/google";
import { APP_THEME } from "@/lib/config"; // <--- Importamos a configuração

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
    /* AQUI APLICAMOS A CLASSE 'dark' ou 'light' baseada na config */
    <html lang="pt-BR" className={APP_THEME} suppressHydrationWarning>
      <body
        /* TROCAMOS: 'bg-zinc-950 text-white' 
           POR: 'bg-background text-foreground' 
           
           Assim, o fundo muda sozinho dependendo do tema.
        */
        className={`${inter.variable} ${montserrat.variable} font-sans bg-background text-foreground antialiased transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
