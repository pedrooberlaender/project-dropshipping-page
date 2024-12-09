import React, { useState, useRef } from 'react';

interface ReturnRequest {
  reason: string;
  description: string;
  image: File | null;
}

const TrocasDevolucoesPage: React.FC = () => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const returnReasons = [
    'Pedido veio errado',
    'Pedido veio quebrado ou danificado',
    'Tamanho não corresponde ao anunciado',
    'Produto diferente do anunciado',
    'Arrependimento da compra',
    'Outro motivo'
  ];

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Aqui você pode implementar a lógica para enviar os dados para o backend
    const returnRequest: ReturnRequest = {
      reason: selectedReason,
      description,
      image
    };

    console.log('Solicitação de devolução:', returnRequest);
    
    // Mostrar mensagem de sucesso
    setShowSuccessMessage(true);
    
    // Resetar formulário
    setSelectedReason('');
    setDescription('');
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // Esconder mensagem após 5 segundos
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Trocas e Devoluções
        </h1>

        {showSuccessMessage && (
          <div className="mb-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            Solicitação coletada, logo entraremos em contato para prosseguirmos com o pedido
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Motivo da devolução
            </label>
            <select
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="">Selecione um motivo</option>
              {returnReasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Descreva o problema
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Descreva detalhadamente o problema..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Anexar foto do problema
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Solicitar Devolução
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrocasDevolucoesPage;
