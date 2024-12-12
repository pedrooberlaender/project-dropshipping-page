import React from 'react';
import { motion } from 'framer-motion';

const TrocasDevolucoesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">Política de Trocas e Devoluções</h1>
          <p className="text-gray-600 dark:text-gray-400">Informações sobre o processo de trocas e devoluções</p>
        </motion.div>
        
        <div className="space-y-6">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-[#7C3AED] dark:border-[#7C3AED]"
          >
            <h2 className="text-xl font-medium text-[#7C3AED] dark:text-[#8B5CF6] mb-4">Informações Gerais</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Nossa política de trocas e devoluções foi desenvolvida de acordo com o Código de Defesa do Consumidor.
              Garantimos a troca ou devolução de produtos dentro do prazo de 7 dias corridos após o recebimento,
              desde que atendidas as condições estabelecidas nesta política.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-[#7C3AED] dark:border-[#7C3AED]"
          >
            <h2 className="text-xl font-medium text-[#7C3AED] dark:text-[#8B5CF6] mb-4">Processo de Solicitação</h2>
            <div className="space-y-4">
              {[/* eslint-disable max-len */
                'Entre em contato com nosso atendimento',
                'Informe o número do pedido',
                'Descreva o motivo da troca ou devolução',
                'Aguarde as instruções por email',
                'Embale o produto adequadamente',
                'Envie conforme as instruções recebidas'
              /* eslint-enable max-len */
              ].map((step, index) => (
                <div key={index} className="flex items-start">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#7C3AED]/10 dark:bg-[#7C3AED]/20 text-[#7C3AED] dark:text-[#8B5CF6] text-sm mr-3 shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">{step}</span>
                </div>
              ))}
            </div>
          </motion.section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-[#7C3AED] dark:border-[#7C3AED]"
            >
              <h2 className="text-xl font-medium text-[#7C3AED] dark:text-[#8B5CF6] mb-4">Condições Necessárias</h2>
              <ul className="space-y-3">
                {[/* eslint-disable max-len */
                  'Produto na embalagem original',
                  'Todos os acessórios inclusos',
                  'Sem sinais de uso',
                  'Nota fiscal presente',
                  'Dentro do prazo de 7 dias'
                /* eslint-enable max-len */
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4 mr-2 text-[#7C3AED] dark:text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-[#7C3AED] dark:border-[#7C3AED]"
            >
              <h2 className="text-xl font-medium text-[#7C3AED] dark:text-[#8B5CF6] mb-4">Prazos de Reembolso</h2>
              <div className="space-y-3">
                {[/* eslint-disable max-len */
                  { method: 'Cartão de crédito', time: 'até 2 faturas' },
                  { method: 'PIX', time: 'até 10 dias úteis' },
                  { method: 'Boleto', time: 'até 10 dias úteis' }
                /* eslint-enable max-len */
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <span className="text-gray-600 dark:text-gray-400">{item.method}</span>
                    <span className="text-gray-600 dark:text-gray-400">{item.time}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-[#7C3AED] dark:border-[#7C3AED]"
          >
            <h2 className="text-xl font-medium text-[#7C3AED] dark:text-[#8B5CF6] mb-4">Dúvidas Frequentes</h2>
            <div className="space-y-4">
              <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                <h3 className="font-medium text-[#7C3AED] dark:text-[#8B5CF6] mb-2">Quem paga o frete da devolução?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Em caso de defeito do produto, nós pagamos. Para arrependimento ou desistência, o cliente arca com os custos.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-[#7C3AED] dark:text-[#8B5CF6] mb-2">Qual o prazo para análise do produto?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Após recebermos o produto, a análise é feita em até 5 dias úteis.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] rounded-lg p-8 text-center text-white shadow-lg"
          >
            <h2 className="text-xl font-medium mb-4">Precisa de Ajuda Imediata?</h2>
            <p className="mb-6 text-white/90">
              Nossa equipe está pronta para atender você pelos canais disponíveis durante o horário comercial.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>
              <a
                href="mailto:contato@exemplo.com"
                className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TrocasDevolucoesPage;
