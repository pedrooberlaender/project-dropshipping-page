import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, Tag, ChevronRight } from 'lucide-react';

const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

const Cart = () => {
  const { state: { items }, removeFromCart, updateQuantity } = useCart();
  const [coupon, setCoupon] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const total = items.reduce((sum, item) => {
    const itemPrice = typeof item.price === 'number' ? item.price : 0;
    const itemQuantity = typeof item.quantity === 'number' ? item.quantity : 0;
    return sum + (itemPrice * itemQuantity);
  }, 0);

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica do cupom de desconto
    console.log('Aplicando cupom:', coupon);
  };

  return (
    <div className="flex-grow bg-gray-50 dark:bg-slate-900/50 min-h-screen">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="w-24 h-24 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center mb-6">
            <ShoppingBag className="w-12 h-12 text-indigo-500 dark:text-indigo-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Seu carrinho está vazio</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 text-center mb-8 max-w-md">
            Adicione produtos ao seu carrinho para continuar comprando
          </p>
          <div className="space-y-4 w-full max-w-md">
            <Link
              to="/"
              className="w-full inline-flex items-center justify-center px-8 py-3 text-base border border-transparent rounded-lg shadow-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Continuar comprando
            </Link>
            {/* Sugestões de Categorias */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <Link to="/eletronicos" className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="text-indigo-600 dark:text-indigo-400 mb-2">🔌</div>
                <div className="text-sm font-medium">Eletrônicos</div>
              </Link>
              <Link to="/smartphones" className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="text-indigo-600 dark:text-indigo-400 mb-2">📱</div>
                <div className="text-sm font-medium">Smartphones</div>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8 sm:py-12">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                <span>Carrinho</span>
                <span>Checkout</span>
                <span>Confirmação</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div className="h-full w-1/3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full" />
              </div>
            </div>

            {/* Header do Carrinho */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500">
                  Meu Carrinho
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {items.length} {items.length === 1 ? 'item' : 'itens'} no seu carrinho
                </p>
              </div>
              <Link 
                to="/"
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium flex items-center gap-1"
              >
                Continuar comprando
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Lista de produtos */}
              <div className="lg:col-span-8 space-y-6">
                {/* Produtos */}
                <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800/50">
                  <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                    {items.map((item) => (
                      <li key={item.id} className="p-6 hover:bg-gray-50 dark:hover:bg-slate-900/50 transition-colors duration-200">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                          {/* Imagem do Produto */}
                          <div className="relative group">
                            <div className="w-full sm:w-32 h-32 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" 
                              />
                            </div>
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg" />
                          </div>

                          {/* Detalhes do Produto */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <div className="space-y-2">
                                <Link 
                                  to={`/produto/${item.id}`}
                                  className="text-lg font-medium text-gray-900 dark:text-gray-100 line-clamp-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                >
                                  {item.name}
                                </Link>
                                <div className="flex items-center gap-2">
                                  <p className="text-lg font-semibold bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500 bg-clip-text text-transparent">
                                    {formatCurrency(item.price)}
                                  </p>
                                  {item.originalPrice && (
                                    <p className="text-sm text-gray-500 line-through">
                                      {formatCurrency(item.originalPrice)}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <span>Vendido e entregue por</span>
                                  <span className="font-medium text-gray-900 dark:text-gray-100">Marketplace</span>
                                </div>
                              </div>

                              {/* Controles de Quantidade e Remoção */}
                              <div className="flex items-center gap-4">
                                <div className="flex items-center bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                  <button
                                    onClick={() => item.quantity <= 1 ? removeFromCart(item.id) : updateQuantity(item.id, item.quantity - 1)}
                                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    aria-label="Diminuir quantidade"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className="w-12 text-center font-medium text-gray-900 dark:text-gray-100">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    aria-label="Aumentar quantidade"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                  aria-label="Remover item"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Garantia e Segurança */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-slate-950 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800/50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">Compra Garantida</h3>
                      <p className="text-sm text-gray-500">Receba o produto ou devolvemos seu dinheiro</p>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-950 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800/50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">Pagamento Seguro</h3>
                      <p className="text-sm text-gray-500">Seus dados sempre protegidos</p>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-950 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800/50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">Entrega grátis</h3>
                      <p className="text-sm text-gray-500">Enviamos para todo o Brasil</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resumo do Pedido */}
              <div className="lg:col-span-4">
                <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800/50 p-6 space-y-6 sticky top-8">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Resumo do Pedido</h2>
                  
                  {/* Cupom de Desconto */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <form onSubmit={applyCoupon} className="flex gap-2">
                      <div className="flex-1">
                        <label htmlFor="coupon" className="sr-only">Cupom de desconto</label>
                        <div className="relative">
                          <Tag className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            id="coupon"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            placeholder="Cupom de desconto"
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                      >
                        Aplicar
                      </button>
                    </form>
                  </div>

                  {/* Valores */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-4">
                    <div className="flex justify-between text-base text-gray-600 dark:text-gray-400">
                      <span>Subtotal</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                    <div className="flex justify-between text-base text-gray-600 dark:text-gray-400">
                      <span>Frete</span>
                      <span className="text-green-500 dark:text-green-400">Grátis</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-gray-100">
                      <span>Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>

                  {/* Botão de Checkout */}
                  <div className="pt-6">
                    <button
                      onClick={() => navigate('/checkout', { state: { items, total } })}
                      className="w-full py-3 px-4 text-base font-medium text-white bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Finalizar Compra
                    </button>
                    <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
                      Pagamento 100% seguro
                    </p>
                  </div>

                  {/* Métodos de Pagamento */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      Aceitamos
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                          <path d="M2 10H22" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <span className="text-sm text-gray-700 dark:text-gray-300">Cartão</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 4L4 8L12 12L20 8L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M4 12L12 16L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M4 16L12 20L20 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-sm text-gray-700 dark:text-gray-300">Pix</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M4 10H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M4 14H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M4 18H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span className="text-sm text-gray-700 dark:text-gray-300">Boleto</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
