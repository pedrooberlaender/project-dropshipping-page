import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CreditCard from '../components/CreditCard';
import PixIcon from '../components/PixIcon';
import { useAuth } from '../contexts/AuthContext';
import { useNavbar } from '../contexts/NavbarContext';

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

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setShowLoginModal } = useNavbar();
  const checkoutState = location.state as CheckoutState;

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
              onClick={() => navigate(-1)}
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

  const returnUrl = encodeURIComponent(location.pathname + location.search);

  useEffect(() => {
    if (!user) {
      navigate(`/conta?returnUrl=${returnUrl}`, { 
        state: { 
          message: 'Faça login para continuar com a compra',
          returnUrl: location.pathname + location.search
        }
      });
    }
  }, [user, navigate, returnUrl]);

  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'pix' | 'boleto' | null>(null);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    cardExpiry: '',
    cardCVV: ''
  });

  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert('Por favor, selecione um método de pagamento');
      return;
    }
    // Aqui você implementaria a lógica de processamento do pagamento
    console.log('Processando pagamento:', formData);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </button>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>

        {/* Resumo do Pedido */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resumo do Pedido</h2>
          <div className="space-y-4">
            {checkoutState.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="text-gray-900 dark:text-white font-medium">{item.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">Quantidade: {item.quantity}</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    R$ {item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-900 dark:text-white">Total</span>
                <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                  R$ {checkoutState.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Informações de Pagamento */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Informações de Pagamento</h2>
          
          {/* Seleção do método de pagamento */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Escolha como você quer pagar
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('credit')}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'credit'
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
                    <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Cartão de Crédito</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Pagamento em até 12x</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 ${
                  paymentMethod === 'credit'
                    ? 'border-indigo-600 bg-indigo-600 dark:border-indigo-400 dark:bg-indigo-400'
                    : 'border-gray-300 dark:border-gray-600'
                }`} />
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('pix')}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'pix'
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
                    <PixIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">PIX</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">5% de desconto e aprovação imediata</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 ${
                  paymentMethod === 'pix'
                    ? 'border-indigo-600 bg-indigo-600 dark:border-indigo-400 dark:bg-indigo-400'
                    : 'border-gray-300 dark:border-gray-600'
                }`} />
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('boleto')}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'boleto'
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
                    <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Boleto Bancário</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Vencimento em 3 dias úteis</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 ${
                  paymentMethod === 'boleto'
                    ? 'border-indigo-600 bg-indigo-600 dark:border-indigo-400 dark:bg-indigo-400'
                    : 'border-gray-300 dark:border-gray-600'
                }`} />
              </button>
            </div>
          </div>

          {/* Formulário de Cartão de Crédito */}
          {paymentMethod === 'credit' && (
            <div className="mt-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Número do Cartão
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    onFocus={() => setIsCardFlipped(false)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nome no Cartão
                  </label>
                  <input
                    type="text"
                    name="cardHolder"
                    value={formData.cardHolder}
                    onChange={handleInputChange}
                    onFocus={() => setIsCardFlipped(false)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    placeholder="NOME COMO ESTÁ NO CARTÃO"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Data de Validade
                    </label>
                    <input
                      type="text"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      onFocus={() => setIsCardFlipped(false)}
                      placeholder="MM/AA"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cardCVV"
                      value={formData.cardCVV}
                      onChange={handleInputChange}
                      onFocus={() => setIsCardFlipped(true)}
                      onBlur={() => setIsCardFlipped(false)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Preview do Cartão */}
              <div className="flex justify-center">
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

          {/* Seção PIX */}
          {paymentMethod === 'pix' && (
            <div className="mt-6 space-y-6">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <PixIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  <p className="font-medium text-gray-900 dark:text-white">
                    Pague com PIX
                  </p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Ao clicar em "Gerar QR Code", você receberá um QR Code para fazer o pagamento pelo seu banco.
                  O pagamento será confirmado instantaneamente.
                </p>
              </div>
              
              <div className="flex justify-center">
                <div className="w-48 h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center px-4">
                    Clique em "Gerar QR Code" para visualizar o código PIX
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Seção Boleto */}
          {paymentMethod === 'boleto' && (
            <div className="mt-6 space-y-6">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Pague com Boleto
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    • O boleto será gerado após a finalização da compra
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    • Prazo de vencimento: 3 dias úteis
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    • Após o pagamento, pode levar até 3 dias úteis para a confirmação
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    • O boleto pode ser pago em qualquer banco ou casa lotérica
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="w-full max-w-md bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Valor do Pedido:</span>
                      <span className="font-medium text-gray-900 dark:text-white">R$ {checkoutState.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Taxa do Boleto:</span>
                      <span className="font-medium text-gray-900 dark:text-white">R$ 3,99</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-900 dark:text-white">Total:</span>
                        <span className="font-medium text-gray-900 dark:text-white">R$ {(checkoutState.total + 3.99).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Informações de Entrega */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Informações de Entrega</h2>
          
          {/* Dados do Destinatário */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Dados do Destinatário</h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
              <p className="text-gray-900 dark:text-white">
                <span className="font-medium">{user?.name}</span>
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Endereço de Entrega */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Endereço de Entrega</h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
              <p className="text-gray-900 dark:text-white">
                {user?.address?.street}, {user?.address?.number}
                {user?.address?.complement && ` - ${user.address.complement}`}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {user?.address?.neighborhood}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {user?.address?.city} - {user?.address?.state}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                CEP: {user?.address?.zipCode}
              </p>
            </div>
          </div>
        </div>

        {/* Botão de Finalizar */}
        {paymentMethod && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex flex-col space-y-4">
              {/* Resumo dos Valores */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Subtotal:</span>
                  <span className="text-gray-900 dark:text-white">R$ {checkoutState.total.toFixed(2)}</span>
                </div>
                {paymentMethod === 'pix' && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Desconto PIX (5%):</span>
                    <span>- R$ {(checkoutState.total * 0.05).toFixed(2)}</span>
                  </div>
                )}
                {paymentMethod === 'boleto' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Taxa do Boleto:</span>
                    <span className="text-gray-900 dark:text-white">R$ 3,99</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-gray-900 dark:text-white">Total:</span>
                  <span className="text-gray-900 dark:text-white">
                    {paymentMethod === 'pix' 
                      ? `R$ ${(checkoutState.total * 0.95).toFixed(2)}`
                      : paymentMethod === 'boleto'
                        ? `R$ ${(checkoutState.total + 3.99).toFixed(2)}`
                        : `R$ ${checkoutState.total.toFixed(2)}`
                    }
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-4 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors font-medium text-lg"
                >
                  Finalizar Pedido
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
