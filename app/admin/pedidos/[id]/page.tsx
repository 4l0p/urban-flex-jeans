import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export default async function OrderDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: {
      id: id,
    },
    include: {
      customer: true,
      address: true,
      items: true,
    },
  });

  if (!order) {
    notFound();
  }

  // --- FUNÇÃO DE AÇÃO (SERVER ACTION) ---
  async function updateStatus(newStatus: string) {
    "use server";

    const p = new PrismaClient();
    await p.order.update({
      where: { id: id },
      data: { status: newStatus },
    });

    // Atualiza o cache das páginas para refletir a mudança na hora
    revalidatePath(`/admin/pedidos/${id}`);
    revalidatePath("/admin");
  }

  return (
    <div className="space-y-6">
      {/* Botão de Voltar e Cabeçalho */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin"
          className="p-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            Pedido #{order.id.split("-")[0]}
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase
              ${order.status === "PENDING" ? "bg-yellow-500/10 text-yellow-500" : ""}
              ${order.status === "PAID" ? "bg-green-500/10 text-green-500" : ""}
              ${order.status === "CANCELED" ? "bg-red-500/10 text-red-500" : ""}
              ${order.status === "SHIPPED" ? "bg-blue-500/10 text-blue-500" : ""}
            `}
            >
              {order.status}
            </span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Realizado em {new Date(order.createdAt).toLocaleString("pt-BR")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Card: Itens do Pedido */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-foreground mb-4 border-b border-border pb-4">
              Produtos Comprados
            </h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {item.productName}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Tamanho:{" "}
                      <span className="font-bold text-foreground">
                        {item.size}
                      </span>{" "}
                      | Qtd: {item.quantity}
                    </p>
                  </div>
                  <div className="font-bold text-foreground text-sm">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-foreground mb-4 border-b border-border pb-4">
                Dados do Cliente
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-muted-foreground">Nome:</span>{" "}
                  <span className="font-semibold text-foreground">
                    {order.customer.name}
                  </span>
                </p>
                <p>
                  <span className="text-muted-foreground">E-mail:</span>{" "}
                  <span className="font-semibold text-foreground">
                    {order.customer.email}
                  </span>
                </p>
                <p>
                  <span className="text-muted-foreground">CPF:</span>{" "}
                  <span className="font-semibold text-foreground">
                    {order.customer.cpf}
                  </span>
                </p>
                <p>
                  <span className="text-muted-foreground">Telefone:</span>{" "}
                  <span className="font-semibold text-foreground">
                    {order.customer.phone}
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-foreground mb-4 border-b border-border pb-4">
                Endereço de Entrega
              </h3>
              {order.address ? (
                <div className="space-y-1 text-sm text-foreground">
                  <p className="font-semibold">
                    {order.address.street}, {order.address.number}
                  </p>
                  {order.address.complement && (
                    <p>{order.address.complement}</p>
                  )}
                  <p>{order.address.neighborhood}</p>
                  <p>
                    {order.address.city} - {order.address.state}
                  </p>
                  <p className="text-muted-foreground mt-2 pt-2 border-t border-border">
                    CEP: {order.address.cep}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Endereço não informado.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: Financeiro e Ações */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-foreground mb-4 border-b border-border pb-4">
              Resumo Financeiro
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Método:</span>
                <span className="font-bold uppercase text-foreground">
                  {order.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-border">
                <span className="font-bold text-foreground">Total Pago:</span>
                <span className="text-xl font-black text-sky-500">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(order.totalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* --- SESSÃO DE AÇÕES ATUALIZADA --- */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-foreground mb-4">Ações do Pedido</h3>

            <form
              action={async () => {
                "use server";
                await updateStatus("PAID");
              }}
            >
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition-colors text-sm mb-2 shadow-lg shadow-green-900/20">
                Marcar como Pago
              </button>
            </form>

            <form
              action={async () => {
                "use server";
                await updateStatus("SHIPPED");
              }}
            >
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors text-sm mb-2 shadow-lg shadow-blue-900/20">
                Marcar como Enviado
              </button>
            </form>

            <form
              action={async () => {
                "use server";
                await updateStatus("CANCELED");
              }}
            >
              <button className="w-full bg-muted text-red-500 hover:bg-red-500/10 font-bold py-2 rounded-lg transition-colors text-sm border border-transparent hover:border-red-500/20">
                Cancelar Pedido
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
