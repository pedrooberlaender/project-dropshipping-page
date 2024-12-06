import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, Check, ArrowRight } from 'lucide-react';

interface FormData {
  email: string;
  name: string;
  document: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { register } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    email: searchParams.get('email') || '',
    name: '',
    document: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateStep = (step: number) => {
    const newErrors: Partial<FormData> = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Nome é obrigatório';
      }
      if (!formData.document.trim()) {
        newErrors.document = 'CPF/CNPJ é obrigatório';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Telefone é obrigatório';
      }
    }

    if (step === 2) {
      if (!formData.password) {
        newErrors.password = 'Senha é obrigatória';
      } else if (formData.password.length < 8) {
        newErrors.password = 'A senha deve ter no mínimo 8 caracteres';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'As senhas não coincidem';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      try {
        await register(formData);
        navigate('/');
      } catch (error) {
        console.error('Erro ao registrar:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-lg mx-auto min-h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-lg mx-auto px-4 py-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar para a loja
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="max-w-lg mx-auto w-full px-4 py-8">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 
                    ${currentStep === 1 
                      ? 'border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400' 
                      : 'border-green-500 bg-green-500 text-white'}`}
                  >
                    {currentStep > 1 ? <Check className="w-6 h-6" /> : '1'}
                  </div>
                  <span className="text-xs mt-2 font-medium text-gray-700 dark:text-gray-300">Dados pessoais</span>
                </div>
                <div className={`flex-1 h-0.5 mx-4 ${currentStep > 1 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2
                    ${currentStep === 2
                      ? 'border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400'
                      : 'border-gray-300 dark:border-gray-600 text-gray-400'}`}
                  >
                    2
                  </div>
                  <span className="text-xs mt-2 font-medium text-gray-700 dark:text-gray-300">Segurança</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {currentStep === 1 ? (
                <>
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        E-mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 rounded-lg border border-gray-300 dark:border-gray-600 
                                 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm
                                 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                                 disabled:cursor-not-allowed
                                 transition-colors duration-200"
                        disabled
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          Nome completo
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Digite seu nome"
                          className={`w-full h-12 px-4 rounded-lg border text-sm
                            ${errors.name
                              ? 'border-red-500 dark:border-red-400'
                              : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                            focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                            transition-colors duration-200`}
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="document" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          CPF ou CNPJ
                        </label>
                        <input
                          type="text"
                          id="document"
                          name="document"
                          value={formData.document}
                          onChange={handleInputChange}
                          placeholder="Digite seu documento"
                          className={`w-full h-12 px-4 rounded-lg border text-sm
                            ${errors.document
                              ? 'border-red-500 dark:border-red-400'
                              : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                            focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                            transition-colors duration-200`}
                        />
                        {errors.document && (
                          <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.document}</p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          Telefone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(00) 00000-0000"
                          className={`w-full h-12 px-4 rounded-lg border text-sm
                            ${errors.phone
                              ? 'border-red-500 dark:border-red-400'
                              : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                            focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                            transition-colors duration-200`}
                        />
                        {errors.phone && (
                          <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-5">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Senha
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Digite sua senha"
                      className={`w-full h-12 px-4 rounded-lg border text-sm
                        ${errors.password
                          ? 'border-red-500 dark:border-red-400'
                          : 'border-gray-300 dark:border-gray-600'
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                        focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                        transition-colors duration-200`}
                    />
                    {errors.password && (
                      <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.password}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Confirmar senha
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirme sua senha"
                      className={`w-full h-12 px-4 rounded-lg border text-sm
                        ${errors.confirmPassword
                          ? 'border-red-500 dark:border-red-400'
                          : 'border-gray-300 dark:border-gray-600'
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                        focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                        transition-colors duration-200`}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-6 mt-8 border-t border-gray-200 dark:border-gray-700">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 
                             hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Voltar
                  </button>
                )}
                <button
                  type={currentStep === 2 ? 'submit' : 'button'}
                  onClick={currentStep === 1 ? handleNext : undefined}
                  className={`px-6 py-3 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                           dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                           transition-colors duration-200 ${currentStep === 1 ? 'ml-auto' : ''}`}
                >
                  {currentStep === 1 ? (
                    <span className="flex items-center">
                      Próximo
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  ) : (
                    'Criar conta'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
