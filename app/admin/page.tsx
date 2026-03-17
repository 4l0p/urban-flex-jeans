import { PrismaClient } from "@prisma/client";
import Link from "next/link";

// Instancia o Prisma
const prisma = new PrismaClient();

// Força o Next.js a atualizar os dados sempre que a página for recarregada
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // 1. Busca todos os pedidos do banco (incluindo dados do cliente)
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { customer: true },
  });

  // 2. Busca todos os clientes do banco para contagem
  const totalCustomersCount = await prisma.customer.count();

  // 3. Cálculos para os "Cards de Métricas"
  const pendingOrdersCount = orders.filter(
    (order) => order.status === "PENDING",
  ).length;

  // Calcula o total de vendas (Soma do totalAmount de todos os pedidos)
  // Nota: Num cenário real, filtraria-se apenas os de 'hoje' ou os 'pagos'
  const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  // Formata o valor monetário para o padrão Brasileiro
  const formattedSales = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(totalSales);

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral da sua loja hoje.</p>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Vendas Totais */}
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium uppercase">
                Vendas Totais
              </p>
              <h3 className="text-2xl font-bold text-foreground mt-1">
                {formattedSales}
              </h3>
            </div>
            <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2: Pedidos Pendentes */}
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium uppercase">
                Pedidos Pendentes
              </p>
              <h3 className="text-2xl font-bold text-foreground mt-1">
                {pendingOrdersCount}
              </h3>
            </div>
            <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">
            Aguardando envio
          </span>
        </div>

        {/* Card 3: Total Clientes */}
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium uppercase">
                Total Clientes
              </p>
              <h3 className="text-2xl font-bold text-foreground mt-1">
                {totalCustomersCount}
              </h3>
            </div>
            <div className="p-2 bg-sky-500/10 rounded-lg text-sky-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Últimos Pedidos */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h3 className="font-bold text-foreground">Pedidos Recentes</h3>
          <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
            {orders.length} encontrados
          </span>
        </div>

        {/* Lógica de Renderização da Tabela */}
        {orders.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground py-12">
            <p>Nenhum pedido recente encontrado.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/30 text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 font-medium">Pedido / Data</th>
                  <th className="px-6 py-4 font-medium">Cliente</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Total</th>
                  <th className="px-6 py-4 font-medium text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-muted/10 transition-colors"
                  >
                    {/* ID e Data */}
                    <td className="px-6 py-4">
                      <div className="font-mono text-xs text-muted-foreground">
                        #{order.id.split("-")[0]}{" "}
                        {/* Mostra só a primeira parte do UUID */}
                      </div>
                      <div className="font-medium text-foreground">
                        {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                      </div>
                    </td>

                    {/* Cliente */}
                    <td className="px-6 py-4">
                      <div className="font-bold text-foreground">
                        {order.customer.name}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {order.customer.email}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
                        ${order.status === "PENDING" ? "bg-yellow-500/10 text-yellow-500" : ""}
                        ${order.status === "PAID" ? "bg-green-500/10 text-green-500" : ""}
                        ${order.status === "CANCELED" ? "bg-red-500/10 text-red-500" : ""}
                      `}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4 font-bold text-foreground">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(order.totalAmount)}
                    </td>

                    {/* Ação */}
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/pedidos/${order.id}`}
                        className="text-sm font-medium text-sky-500 hover:text-sky-400"
                      >
                        Detalhes
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
