export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral da sua loja hoje.</p>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium uppercase">
                Vendas Hoje
              </p>
              <h3 className="text-2xl font-bold text-foreground mt-1">
                R$ 1.250,00
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
          <span className="text-xs text-green-500 font-bold">
            +12% comparado a ontem
          </span>
        </div>

        {/* Card 2 */}
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium uppercase">
                Pedidos Pendentes
              </p>
              <h3 className="text-2xl font-bold text-foreground mt-1">4</h3>
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

        {/* Card 3 */}
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium uppercase">
                Total Clientes
              </p>
              <h3 className="text-2xl font-bold text-foreground mt-1">1.482</h3>
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
          <span className="text-xs text-green-500 font-bold">
            +8 novos hoje
          </span>
        </div>
      </div>

      {/* Tabela de Últimos Pedidos */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border">
          <h3 className="font-bold text-foreground">Pedidos Recentes</h3>
        </div>
        <div className="p-6 text-center text-muted-foreground py-12">
          <p>Nenhum pedido recente encontrado.</p>
        </div>
      </div>
    </div>
  );
}
