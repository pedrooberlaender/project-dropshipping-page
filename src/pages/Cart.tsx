import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, Truck, Tag, ChevronRight } from 'lucide-react';

const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

const Cart = () => {
  const { state: { items }, removeFromCart, updateQuantity } = useCart();
  const [cep, setCep] = useState('');
  const [coupon, setCoupon] = useState('');

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 5) value = value.slice(0, 5) + '-' + value.slice(5);
    setCep(value);
  };

  const calculateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica de cálculo do frete
    console.log('Calculando frete para CEP:', cep);
  };

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica do cupom de desconto
    console.log('Aplicando cupom:', coupon);
  };

  return (
    <div className="flex-grow bg-gray-50 dark:bg-slate-900/50 min-h-screen py-8 sm:py-12">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="w-24 h-24 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center mb-6">
            <ShoppingBag className="w-12 h-12 text-indigo-500 dark:text-indigo-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Seu carrinho está vazio</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 text-center mb-8 max-w-md">Adicione produtos ao seu carrinho para continuar comprando</p>
          <Link
            to="/"
            className="inline-flex items-center px-8 py-3 text-base border border-transparent rounded-lg shadow-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Continuar comprando
          </Link>
        </div>
      ) : (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500">
              Meu Carrinho
            </h1>
            <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
              {items.length} {items.length === 1 ? 'item' : 'itens'}
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Lista de produtos */}
            <div className="lg:col-span-8">
              <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800/50">
                <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                  {items.map((item) => (
                    <li key={item.id} className="p-6 hover:bg-gray-50 dark:hover:bg-slate-900/50 transition-colors duration-200">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
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
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="space-y-1">
                              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 line-clamp-2">{item.name}</h3>
                              <p className="text-lg font-semibold bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500 bg-clip-text text-transparent">
                                {formatCurrency(item.price)}
                              </p>
                            </div>
                            <div className="relative flex items-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-1 border border-gray-200 dark:border-gray-700/50 shadow-sm">
                              <button
                                onClick={() => item.quantity <= 1 ? removeFromCart(item.id) : updateQuantity(item.id, item.quantity - 1)}
                                className={`relative w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-300 ${
                                  item.quantity <= 1
                                    ? 'text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                                    : 'text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md active:shadow-sm'
                                }`}
                                title={item.quantity <= 1 ? 'Remover item' : 'Diminuir quantidade'}
                              >
                                <div className={`absolute inset-0 rounded-xl bg-gradient-to-b transition-opacity duration-200 ${
                                  item.quantity <= 1
                                    ? 'from-red-50/50 to-transparent dark:from-red-900/10'
                                    : 'from-white/50 to-transparent dark:from-white/5'
                                }`} />
                                <div className="relative transition-transform duration-300">
                                  {item.quantity <= 1 ? (
                                    <Trash2 className="w-4 h-4" />
                                  ) : (
                                    <Minus className="w-4 h-4" />
                                  )}
                                </div>
                              </button>

                              <div className="relative w-12 mx-1">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-base font-medium text-gray-900 dark:text-gray-100 transition-all duration-200 transform">
                                    {item.quantity}
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  value={item.quantity}
                                  readOnly
                                  className="w-full h-9 text-center bg-transparent border-0 focus:ring-0 text-base font-medium text-gray-900 dark:text-gray-100"
                                  style={{ caretColor: 'transparent' }}
                                />
                              </div>

                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="relative w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 transition-all duration-200 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md active:shadow-sm"
                                title="Aumentar quantidade"
                              >
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/50 to-transparent dark:from-white/5 transition-opacity duration-200" />
                                <Plus className="w-4 h-4 relative" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Calcular Frete */}
              <div className="mt-8 bg-white dark:bg-slate-950 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-800/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
                    <Truck className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">Calcule o Frete</h3>
                </div>
                <form onSubmit={calculateShipping} className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        value={cep}
                        onChange={handleCepChange}
                        placeholder="Digite seu CEP"
                        className="w-full px-4 py-3 text-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 border border-gray-300 dark:border-gray-700 dark:bg-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200"
                        maxLength={9}
                      />
                      <a 
                        href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-base text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
                      >
                        Não sei meu CEP
                      </a>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                  >
                    Calcular Frete
                  </button>
                </form>
              </div>

              {/* Explorar mais produtos */}
              <div className="mt-8 bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800/50 overflow-hidden">
                <Link
                  to="/"
                  className="flex items-center justify-between p-6 group hover:bg-gray-50 dark:hover:bg-slate-900/50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <span className="text-xl font-medium text-gray-900 dark:text-gray-100">Explorar mais produtos</span>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" />
                </Link>
              </div>
            </div>

            {/* Resumo do pedido */}
            <div className="lg:col-span-4">
              <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm p-6 space-y-6 sticky top-24 border border-gray-100 dark:border-gray-800/50">
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">Resumo do pedido</h3>

                {/* Cupom de desconto */}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
                      <Tag className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">Cupom de desconto</h4>
                  </div>
                  <form onSubmit={applyCoupon} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                      placeholder="Digite seu cupom"
                      className="flex-1 min-w-0 px-4 py-3 text-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 border border-gray-300 dark:border-gray-700 dark:bg-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 uppercase transition-all duration-200"
                    />
                    <button
                      type="submit"
                      className="px-8 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                    >
                      Aplicar
                    </button>
                  </form>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                  <dl className="space-y-4">
                    <div className="flex justify-between">
                      <dt className="text-base text-gray-600 dark:text-gray-400">Subtotal</dt>
                      <dd className="text-lg font-medium text-gray-900 dark:text-gray-100">{formatCurrency(total)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-base text-gray-600 dark:text-gray-400">Frete</dt>
                      <dd className="text-lg font-medium text-gray-900 dark:text-gray-100">A calcular</dd>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 dark:border-gray-800 pt-4">
                      <dt className="text-xl font-medium text-gray-900 dark:text-gray-100">Total</dt>
                      <dd className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500">
                        {formatCurrency(total)}
                      </dd>
                    </div>
                  </dl>
                </div>

                <button
                  className="w-full px-8 py-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Finalizar compra
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
