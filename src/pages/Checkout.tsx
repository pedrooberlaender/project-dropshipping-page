import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CreditCard from '../components/CreditCard';
import PixIcon from '../components/PixIcon';
import { useAuth } from '../contexts/AuthContext';
import { useNavbar } from '../contexts/NavbarContext';
import { useOrder } from '../contexts/OrderContext';

interface CheckoutProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CheckoutState {
  items: CheckoutProduct[];
  total: number;
}

// Função para formatar valores em moeda
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { setShowLoginModal } = useNavbar();
  const { addOrder } = useOrder();
  const [refreshKey, setRefreshKey] = useState(0);

  const checkoutState = useMemo(() => {
    const state = location.state as CheckoutState;
    return state || { items: [], total: 0 };
  }, [location.state]);

  useEffect(() => {
    if (!checkoutState.items.length) {
      navigate(-1);
    }
  }, [checkoutState.items.length, navigate]);

  useEffect(() => {
    if (!user) {
      const returnUrl = encodeURIComponent(location.pathname + location.search);
      navigate(`/conta?returnUrl=${returnUrl}`, { 
        state: { 
          message: 'Faça login para continuar com a compra',
          returnUrl: location.pathname + location.search
        }
      });
    }
  }, [user, navigate, location.pathname, location.search]);

  useEffect(() => {
    const fetchUpdatedUserData = async () => {
      try {
        // Força a busca dos dados mais recentes do localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          await updateUser(parsedUser);
          setRefreshKey(prev => prev + 1); // Força re-render
        }
      } catch (error) {
        console.error('Erro ao atualizar dados do usuário:', error);
      }
    };

    fetchUpdatedUserData();
  }, [location.pathname]); // Executa quando o caminho muda

  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'debit' | 'pix' | 'boleto' | null>(null);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    cardExpiry: '',
    cardCVV: ''
  });

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Formatação específica para cada campo
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '').slice(0, 16);
    } else if (name === 'cardExpiry') {
      formattedValue = value
        .replace(/\D/g, '')
        .slice(0, 4)
        .replace(/(\d{2})(\d{2})/, '$1/$2')
        .slice(0, 5);
    } else if (name === 'cardCVV') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert('Por favor, selecione um método de pagamento');
      return;
    }
    // Aqui você implementaria a lógica de processamento do pagamento
    console.log('Processando pagamento:', formData);
  }, [paymentMethod, formData]);

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleFinalizarCompra = async () => {
    if (!paymentMethod) {
      alert('Selecione uma forma de pagamento');
      return;
    }

    try {
      // Criar o pedido
      const orderData = {
        userId: user?.id || '',
        products: checkoutState.items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        total: checkoutState.total,
        createdAt: new Date().toISOString(),
        paymentMethod,
        address: {
          street: user?.address?.street || '',
          number: user?.address?.number || '',
          complement: user?.address?.complement,
          neighborhood: user?.address?.neighborhood || '',
          city: user?.address?.city || '',
          state: user?.address?.state || '',
          zipCode: user?.address?.zipCode || ''
        }
      };

      // Adicionar o pedido
      addOrder(orderData);

      // Limpar o carrinho
      localStorage.removeItem('cart');

      // Redirecionar para a página de pedidos
      navigate('/pedidos', {
        state: { message: 'Pedido realizado com sucesso!' }
      });
    } catch (error) {
      console.error('Erro ao finalizar compra:', error);
      alert('Erro ao finalizar a compra. Tente novamente.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Atenção
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Para finalizar sua compra, você precisa estar logado na sua conta ou criar uma nova conta.
            </p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => {
                setShowLoginModal(true);
              }}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
            >
              Fazer Login / Criar Conta
            </button>
            
            <button
              onClick={handleGoBack}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              Voltar para o Produto
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!checkoutState?.items?.length) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Nenhum produto selecionado</h2>
          <button
            onClick={handleGoBack}
            className="mt-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200"
          >
            Voltar às compras
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900/50">
      {/* Progress Bar */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm font-medium mb-2">
            <span className="text-gray-500 dark:text-gray-400">Carrinho</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Checkout</span>
            <span className="text-gray-500 dark:text-gray-400">Confirmação</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div className="h-full w-2/3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full" />
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Coluna Principal */}
          <div className="lg:col-span-8 space-y-6">
            {/* Método de Pagamento */}
            <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Método de Pagamento</h2>
              
              {/* Opções de Pagamento */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Cartão de Crédito */}
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      paymentMethod === 'credit' 
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500'
                    }`}
                    onClick={() => setPaymentMethod('credit')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                        <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                          <path d="M2 10H22" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">Cartão de Crédito</h3>
                        <p className="text-sm text-gray-500">Parcele em até 12x</p>
                      </div>
                    </div>
                  </div>

                  {/* Cartão de Débito */}
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      paymentMethod === 'debit' 
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500'
                    }`}
                    onClick={() => setPaymentMethod('debit')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                        <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                          <path d="M2 10H22" stroke="currentColor" strokeWidth="2"/>
                          <path d="M6 14H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">Cartão de Débito</h3>
                        <p className="text-sm text-gray-500">Pagamento à vista</p>
                      </div>
                    </div>
                  </div>

                  {/* Pix */}
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      paymentMethod === 'pix' 
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500'
                    }`}
                    onClick={() => setPaymentMethod('pix')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                        <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 4L4 8L12 12L20 8L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M4 12L12 16L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">Pix</h3>
                        <p className="text-sm text-gray-500">5% de desconto</p>
                      </div>
                    </div>
                  </div>

                  {/* Boleto */}
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      paymentMethod === 'boleto' 
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500'
                    }`}
                    onClick={() => setPaymentMethod('boleto')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                        <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M4 10H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M4 14H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M4 18H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">Boleto</h3>
                        <p className="text-sm text-gray-500">Vencimento em 3 dias úteis</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Formulário de Cartão */}
                {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                  <div className="mt-6 space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Número do Cartão
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-slate-800 dark:text-gray-100 sm:text-sm"
                          placeholder="1234 5678 9012 3456"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          onFocus={() => setIsCardFlipped(false)}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Data de Validade
                          </label>
                          <input
                            type="text"
                            id="expiry"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-slate-800 dark:text-gray-100 sm:text-sm"
                            placeholder="MM/AA"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            onFocus={() => setIsCardFlipped(false)}
                          />
                        </div>
                        <div>
                          <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            CVC
                          </label>
                          <input
                            type="text"
                            id="cvc"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-slate-800 dark:text-gray-100 sm:text-sm"
                            placeholder="123"
                            name="cardCVV"
                            value={formData.cardCVV}
                            onChange={handleInputChange}
                            onFocus={() => setIsCardFlipped(true)}
                            onBlur={() => setIsCardFlipped(false)}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Nome no Cartão
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-slate-800 dark:text-gray-100 sm:text-sm"
                          placeholder="Nome como está no cartão"
                          name="cardHolder"
                          value={formData.cardHolder}
                          onChange={handleInputChange}
                          onFocus={() => setIsCardFlipped(false)}
                        />
                      </div>
                      {paymentMethod === 'credit' && (
                        <div>
                          <label htmlFor="installments" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Parcelas
                          </label>
                          <select
                            id="installments"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-slate-800 dark:text-gray-100 sm:text-sm"
                          >
                            <option>1x de {formatCurrency(checkoutState.total)} sem juros</option>
                            <option>2x de {formatCurrency(checkoutState.total/2)} sem juros</option>
                            <option>3x de {formatCurrency(checkoutState.total/3)} sem juros</option>
                            {/* Adicione mais opções de parcelamento conforme necessário */}
                          </select>
                        </div>
                      )}
                    </div>

                    {/* Preview do Cartão */}
                    <div className="flex justify-center mt-6">
                      <CreditCard
                        cardNumber={formData.cardNumber}
                        cardHolder={formData.cardHolder}
                        expiryDate={formData.cardExpiry}
                        cvv={formData.cardCVV}
                        isFlipped={isCardFlipped}
                      />
                    </div>
                  </div>
                )}

                {/* Conteúdo específico para Pix */}
                {paymentMethod === 'pix' && (
                  <div className="mt-6 p-6 bg-gray-50 dark:bg-slate-800/50 rounded-lg text-center">
                    <div className="w-48 h-48 mx-auto bg-white dark:bg-slate-700 rounded-lg mb-4"></div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Escaneie o QR Code ou copie o código Pix abaixo
                    </p>
                  </div>
                )}

                {/* Conteúdo específico para Boleto */}
                {paymentMethod === 'boleto' && (
                  <div className="mt-6 p-6 bg-gray-50 dark:bg-slate-800/50 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      O boleto será gerado após a confirmação do pedido
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Dados do Usuário */}
            <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Dados do Destinatário</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nome
                    </label>
                    <div className="text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-slate-800 rounded-md px-3 py-2">
                      {user?.name}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <div className="text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-slate-800 rounded-md px-3 py-2">
                      {user?.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Link para Revisar Dados */}
            <div className="px-6 py-2">
              <Link 
                to="/conta"
                className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200 font-bold"
                onClick={() => {
                  sessionStorage.setItem('returnToCheckout', 'true');
                }}
              >
                Necessita revisar seus dados? Clique aqui!
              </Link>
            </div>

            {/* Endereço de Entrega */}
            <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Endereço de Entrega</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Endereço Completo
                    </label>
                    <div className="text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-slate-800 rounded-md px-3 py-2">
                      {user?.address?.street}, {user?.address?.number}
                      {user?.address?.complement && ` - ${user.address.complement}`}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Bairro
                      </label>
                      <div className="text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-slate-800 rounded-md px-3 py-2">
                        {user?.address?.neighborhood}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        CEP
                      </label>
                      <div className="text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-slate-800 rounded-md px-3 py-2">
                        {user?.address?.zipCode}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Cidade
                      </label>
                      <div className="text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-slate-800 rounded-md px-3 py-2">
                        {user?.address?.city}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Estado
                      </label>
                      <div className="text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-slate-800 rounded-md px-3 py-2">
                        {user?.address?.state}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Resumo do Pedido</h2>
              
              <div className="space-y-4">
                {checkoutState.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500">Qtd: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 mt-6 pt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="text-gray-900 dark:text-gray-100">{formatCurrency(checkoutState.total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Frete</span>
                  <span className="text-green-500">Grátis</span>
                </div>
                {paymentMethod === 'pix' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Desconto Pix (5%)</span>
                    <span className="text-green-500">-{formatCurrency(checkoutState.total * 0.05)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-medium">
                  <span className="text-gray-900 dark:text-gray-100">Total</span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {formatCurrency(paymentMethod === 'pix' ? checkoutState.total * 0.95 : checkoutState.total)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleFinalizarCompra}
                className="w-full mt-6 py-3 px-4 text-base font-medium text-white bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Finalizar Pedido
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
