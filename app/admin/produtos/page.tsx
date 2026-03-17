import { prisma } from "@/lib/prisma"; // Certifique-se de que criou o arquivo lib/prisma.ts
import { revalidatePath } from "next/cache";
import ThemeToggleButton from "./_components/ThemeToggleButton";

export default async function ProdutosAdmin() {
  // O 'product' agora será reconhecido porque rodamos o 'prisma generate'
  const product = await prisma.product
    .findFirst({
      where: { name: { contains: "Kit 2 Camisas" } },
    })
    .catch(() => null);

  async function updateGlobalPrice(formData: FormData) {
    "use server";
    const newPrice = formData.get("price");
    if (!newPrice) return;

    try {
      // O upsert evita qualquer erro de "registro não encontrado"
      await prisma.product.upsert({
        where: { name: "Kit 2 Camisas Urban Flex" },
        update: { price: parseFloat(String(newPrice)) },
        create: {
          name: "Kit 2 Camisas Urban Flex",
          price: parseFloat(String(newPrice)),
          stock: 99,
        },
      });

      revalidatePath("/admin/produtos");
      revalidatePath("/checkout");
    } catch (error) {
      console.error("Erro ao salvar preço:", error);
    }
  }

  return (
    <div className="space-y-8 p-6 text-foreground">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black tracking-tighter uppercase">
          Gerenciador de Oferta
        </h1>
        <ThemeToggleButton />
      </div>

      <div className="bg-card border border-border rounded-3xl p-8 shadow-2xl max-w-2xl">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          💰 Ajustar Preço do Kit
        </h2>

        <form action={updateGlobalPrice} className="space-y-6">
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground font-black text-2xl">
              R$
            </span>
            <input
              name="price"
              type="number"
              step="0.01"
              defaultValue={product?.price || 99.9}
              className="w-full bg-background border-2 border-border rounded-2xl pl-16 py-5 text-4xl font-black outline-none focus:border-sky-500 transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-400 text-white font-black py-5 rounded-2xl shadow-lg shadow-sky-500/20 uppercase tracking-widest"
          >
            Salvar e Atualizar Loja
          </button>
        </form>
      </div>
    </div>
  );
}
