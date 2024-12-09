import React, { useState, useEffect } from 'react';
import { HeadphonesIcon, ChevronDown, ChevronUp } from 'lucide-react';

const AtendimentoPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{sender: string, text: string}>>([]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqItems = [
    {
      question: 'Como faço para rastrear meu pedido?',
      answer: 'Você pode rastrear seu pedido através do código de rastreamento enviado no e-mail de confirmação da compra.'
    },
    {
      question: 'Qual é o prazo de entrega?',
      answer: 'O prazo de entrega varia de acordo com a sua localização, geralmente entre 7 a 15 dias úteis.'
    },
    {
      question: 'Como solicitar reembolso?',
      answer: 'Para solicitar reembolso, entre em contato com nosso suporte informando o número do pedido e o motivo da solicitação.'
    },
    {
      question: 'Quais são as formas de pagamento aceitas?',
      answer: 'Aceitamos cartões de crédito, PIX e boleto bancário.'
    },
    {
      question: 'Os produtos têm garantia?',
      answer: 'Sim, todos os nossos produtos possuem garantia. O período varia de acordo com o fabricante.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Add user message
      setMessages(prev => [...prev, { sender: 'user', text: message }]);
      
      // Simulate support response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          sender: 'support',
          text: 'Recebemos sua mensagem! Em breve um de nossos atendentes entrará em contato.'
        }]);
      }, 1000);
      
      setMessage('');
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Central de Atendimento
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Como podemos ajudar você hoje?
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Chat Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <HeadphonesIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-2" />
            <h2 className="text-xl font-semibold">Fale Conosco</h2>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4 h-64 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Enviar
            </button>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b dark:border-gray-700 last:border-0">
                <button
                  className="w-full text-left py-4 flex justify-between items-center hover:text-indigo-600 dark:hover:text-indigo-400"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium">{item.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="pb-4 text-gray-600 dark:text-gray-400">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtendimentoPage;
