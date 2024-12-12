import React, { useState } from 'react';
import { Package, Search, Truck, Clock, CreditCard, MapPin } from 'lucide-react';
import { useOrder, Order } from '../contexts/OrderContext';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const MeusPedidos: React.FC = () => {
  const [periodoFiltro, setPeriodoFiltro] = useState('30');
  const { orders } = useOrder();
  const { user } = useAuth();
  
  const filtrarPedidos = () => {
    if (!orders) return [];
    
    const hoje = new Date();
    const diasFiltro = periodoFiltro === 'all' ? Infinity : parseInt(periodoFiltro);
    
    return orders.filter(pedido => {
      if (periodoFiltro === 'all') return true;
      
      const dataPedido = new Date(pedido.createdAt);
      const diffTime = Math.abs(hoje.getTime() - dataPedido.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return diffDays <= diasFiltro;
    });
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const formatarPreco = (preco: number) => {
    return preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const rastrearPedido = (codigoRastreio: string) => {
    window.open(`https://rastreamento.correios.com.br/app/index.php?codigo=${codigoRastreio}`, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aguardando pagamento':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'Pagamento aprovado':
        return 'text-green-600 dark:text-green-400';
      case 'Em preparação':
        return 'text-blue-600 dark:text-blue-400';
      case 'Em trânsito':
        return 'text-indigo-600 dark:text-indigo-400';
      case 'Entregue':
        return 'text-gray-600 dark:text-gray-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const pedidosFiltrados = filtrarPedidos();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Meus Pedidos</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Gerencie seus pedidos e acompanhe suas entregas</p>
        </div>

        <div className="mb-8 flex justify-end">
          <select
            value={periodoFiltro}
            onChange={(e) => setPeriodoFiltro(e.target.value)}
            className="w-48 p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-[#7C3AED] dark:focus:ring-[#7C3AED] shadow-sm"
          >
            <option value="30">Últimos 30 dias</option>
            <option value="60">Últimos 60 dias</option>
            <option value="90">Últimos 90 dias</option>
            <option value="all">Todos os pedidos</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {pedidosFiltrados.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center border-l-4 border-[#7C3AED]">
              <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                Nenhum pedido encontrado
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Você ainda não realizou nenhum pedido neste período.
              </p>
            </div>
          ) : (
            pedidosFiltrados.map((pedido) => (
              <div
                key={pedido.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border-l-4 border-[#7C3AED]"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Pedido #{pedido.id}
                      </h2>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatarData(pedido.createdAt)}
                        </div>
                        <div className="flex items-center">
                          <CreditCard className="w-4 h-4 mr-1" />
                          {pedido.paymentMethod === 'credit' ? 'Cartão de Crédito' : 
                           pedido.paymentMethod === 'debit' ? 'Cartão de Débito' : 
                           pedido.paymentMethod === 'pix' ? 'PIX' : 'Boleto'}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {pedido.address.city}, {pedido.address.state}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {formatarPreco(pedido.total)}
                      </p>
                      <p className={`text-sm font-medium ${getStatusColor(pedido.status)}`}>
                        {pedido.status}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Produtos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {pedido.products.map((produto, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                        >
                          <div className="flex-shrink-0 w-12 h-12">
                            <img
                              src={produto.image}
                              alt={produto.name}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {produto.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Qtd: {produto.quantity}
                              {produto.size && ` • Tam. ${produto.size}`}
                              {produto.color && ` • ${produto.color}`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Truck className="w-5 h-5 mr-2 text-[#7C3AED]" />
                        <span className="font-medium">Código de Rastreio:</span>
                        <span className="ml-2">{pedido.trackingCode}</span>
                      </div>
                      <button
                        onClick={() => rastrearPedido(pedido.trackingCode)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-[#7C3AED] hover:bg-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7C3AED] transition-colors duration-200"
                      >
                        <Search className="w-4 h-4 mr-2" />
                        Rastrear Pedido
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MeusPedidos;
