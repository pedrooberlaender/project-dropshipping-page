import React from 'react';
import { motion } from 'framer-motion';

const AtendimentoPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">Central de Atendimento</h1>
          <p className="text-gray-600 dark:text-gray-400">Estamos aqui para ajudar você</p>
        </motion.div>

        <div className="space-y-6">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-[#7C3AED] dark:border-[#7C3AED]"
          >
            <h2 className="text-xl font-medium text-[#7C3AED] dark:text-[#8B5CF6] mb-4">Canais de Atendimento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-[#7C3AED] dark:text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400">atendimento@exemplo.com</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Resposta em até 24 horas</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-[#7C3AED] dark:text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Telefone</h3>
                  <p className="text-gray-600 dark:text-gray-400">(11) 1234-5678</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Seg a Sex, 9h às 18h</p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-[#7C3AED] dark:border-[#7C3AED]"
          >
            <h2 className="text-xl font-medium text-[#7C3AED] dark:text-[#8B5CF6] mb-4">Perguntas Frequentes</h2>
            <div className="space-y-4">
              <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                <h3 className="font-medium text-[#7C3AED] dark:text-[#8B5CF6] mb-2">Como faço para rastrear meu pedido?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Você pode rastrear seu pedido através do código de rastreamento enviado por email ou acessando sua conta na seção "Meus Pedidos".
                </p>
              </div>
              <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                <h3 className="font-medium text-[#7C3AED] dark:text-[#8B5CF6] mb-2">Qual o prazo de entrega?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  O prazo de entrega varia de acordo com sua localização e o método de envio escolhido. Após a confirmação do pagamento, você poderá ver o prazo estimado.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-[#7C3AED] dark:text-[#8B5CF6] mb-2">Como solicitar reembolso?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Para solicitar reembolso, acesse nossa política de trocas e devoluções ou entre em contato com nosso atendimento.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-l-4 border-[#7C3AED] dark:border-[#7C3AED]"
          >
            <h2 className="text-xl font-medium text-[#7C3AED] dark:text-[#8B5CF6] mb-4">Horário de Atendimento</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Segunda a Sexta</span>
                <span className="text-gray-900 dark:text-white">09:00 - 18:00</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Sábado</span>
                <span className="text-gray-900 dark:text-white">09:00 - 13:00</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600 dark:text-gray-400">Domingo e Feriados</span>
                <span className="text-gray-900 dark:text-white">Fechado</span>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] rounded-lg p-8 text-center text-white shadow-lg"
          >
            <h2 className="text-xl font-medium mb-4">Precisa de Ajuda Imediata?</h2>
            <p className="mb-6 text-white/90">
              Nossa equipe está pronta para atender você pelos canais disponíveis durante o horário comercial.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://wa.me/5511123456789"
                className="inline-flex items-center justify-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-md text-white hover:bg-white/20 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                WhatsApp
              </a>
              <a
                href="mailto:atendimento@exemplo.com"
                className="inline-flex items-center justify-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-md text-white hover:bg-white/20 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </a>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default AtendimentoPage;
