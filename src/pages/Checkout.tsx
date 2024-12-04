import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CreditCard from '../components/CreditCard';
import PixIcon from '../components/PixIcon';

interface CheckoutProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product as CheckoutProduct;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
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
    // Aqui você implementaria a lógica de processamento do pagamento
    console.log('Processando pagamento:', formData);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Nenhum produto selecionado</h2>
          <button
            onClick={handleGoBack}
            className="mt-4 text-indigo-600 hover:text-indigo-800"
          >
            Voltar às compras
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <button
          onClick={handleGoBack}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

          {/* Resumo do Pedido */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumo do Pedido</h2>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-600">Quantidade: {product.quantity}</p>
              </div>
              <p className="font-semibold">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </p>
            </div>
          </div>

          {/* Formulário de Pagamento */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Informações Pessoais</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Endereço de Entrega</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cidade
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estado
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CEP
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Informações de Pagamento</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número do Cartão
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    onFocus={() => setIsCardFlipped(false)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome no Cartão
                  </label>
                  <input
                    type="text"
                    name="cardHolder"
                    value={formData.cardHolder}
                    onChange={handleInputChange}
                    onFocus={() => setIsCardFlipped(false)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="NOME COMO ESTÁ NO CARTÃO"
                    required
                  />
                </div>

                {/* Container para campos pequenos e cartão */}
                <div className="flex flex-col md:flex-row gap-6 items-start mb-12">
                  {/* Campos pequenos */}
                  <div className="w-full md:w-1/3 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Data de Validade
                      </label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        onFocus={() => setIsCardFlipped(false)}
                        placeholder="MM/AA"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cardCVV"
                        value={formData.cardCVV}
                        onChange={handleInputChange}
                        onFocus={() => setIsCardFlipped(true)}
                        onBlur={() => setIsCardFlipped(false)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>

                  {/* Cartão */}
                  <div className="w-full md:w-2/3 flex justify-center md:justify-end">
                    <CreditCard
                      cardNumber={formData.cardNumber}
                      cardHolder={formData.cardHolder}
                      expiryDate={formData.cardExpiry}
                      cvv={formData.cardCVV}
                      isFlipped={isCardFlipped}
                    />
                  </div>
                </div>
              </div>

              {/* Botão de PIX */}
              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => {
                    // Aqui você pode adicionar a lógica para gerar o QR Code do PIX
                    console.log('Gerar PIX');
                  }}
                  className="w-full bg-white text-indigo-600 px-6 py-3 rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
                >
                  <PixIcon className="w-6 h-6" />
                  Pagar com PIX
                </button>
              </div>

              {/* Botão de Finalizar Compra */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Finalizar Compra
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
