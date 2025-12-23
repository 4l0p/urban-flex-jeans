import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ModalProvider } from "@/context/ModalContext";
import BuyModal from "@/components/BuyModal";

export default function LojaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModalProvider>
      <Header />
      {children}
      <BuyModal />
      <Footer />
    </ModalProvider>
  );
}
