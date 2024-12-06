import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, ChevronLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
}

interface PasswordStrength {
  hasMinLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  // Pegar o email da URL
  const searchParams = new URLSearchParams(window.location.search);
  const emailFromURL = searchParams.get('email');

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    cpf: '',
    phone: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
  });

  // Se já tiver email, preencher mas manter na etapa 1
  useEffect(() => {
    if (emailFromURL) {
      setFormData(prev => ({
        ...prev,
        email: emailFromURL
      }));
    }
  }, [emailFromURL]);

  // Redirecionar para home se não tiver email
  useEffect(() => {
    if (!emailFromURL) {
      navigate('/');
    }
  }, [emailFromURL, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const formatBirthDate = (value: string) => {
    // Remove tudo que não for número
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara DD/MM/AAAA
    let formatted = numbers;
    if (numbers.length > 0) {
      formatted = numbers.replace(/^(\d{0,2})(\d{0,2})(\d{0,4}).*/, (_, d, m, y) => {
        let result = '';
        if (d) result += d;
        if (m) result += '/' + m;
        if (y) result += '/' + y;
        return result;
      });
    }
    
    return formatted;
  };

  const validateBirthDate = (date: string) => {
    // Verifica se está no formato correto DD/MM/AAAA
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) return false;

    const [day, month, year] = date.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());

    // Verifica se é uma data válida e se está dentro do intervalo permitido (13-120 anos)
    return birthDate instanceof Date && !isNaN(birthDate.getTime()) &&
           birthDate >= minDate && birthDate <= maxDate;
  };

  const handleSpecialInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (name === 'phone') {
      formattedValue = formatPhone(value);
    } else if (name === 'birthDate') {
      formattedValue = formatBirthDate(value);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formatted = formatBirthDate(value);
    setFormData(prev => ({ ...prev, birthDate: formatted }));
  };

  const checkPasswordStrength = (password: string) => {
    setPasswordStrength({
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, password: value }));
    checkPasswordStrength(value);
  };

  const isPasswordStrong = (password: string) => {
    return password.length >= 8 &&
           /[A-Z]/.test(password) &&
           /[a-z]/.test(password) &&
           /[0-9]/.test(password) &&
           /[!@#$%^&*(),.?":{}|<>]/.test(password);
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.firstName.trim() && 
               formData.lastName.trim() && 
               formData.email;
      case 2:
        return formData.cpf && 
               formData.phone && 
               formData.birthDate && 
               validateBirthDate(formData.birthDate);
      case 3:
        return (
          formData.password &&
          formData.confirmPassword &&
          formData.password === formData.confirmPassword &&
          isPasswordStrong(formData.password)
        );
      default:
        return false;
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((step) => (
          <React.Fragment key={step}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === currentStep
                  ? 'bg-indigo-600 text-white'
                  : step < currentStep
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step < currentStep ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                step
              )}
            </div>
            {step < 3 && (
              <div
                className={`w-20 h-1 mx-2 ${
                  step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderPasswordStrengthIndicator = () => (
    <div className="mt-2 space-y-2">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Sua senha deve conter:
      </p>
      <ul className="space-y-1 text-sm">
        <li className={`flex items-center ${passwordStrength.hasMinLength ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
          <span className="mr-2">{passwordStrength.hasMinLength ? '✓' : '○'}</span>
          Mínimo de 8 caracteres
        </li>
        <li className={`flex items-center ${passwordStrength.hasUpperCase ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
          <span className="mr-2">{passwordStrength.hasUpperCase ? '✓' : '○'}</span>
          Uma letra maiúscula
        </li>
        <li className={`flex items-center ${passwordStrength.hasLowerCase ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
          <span className="mr-2">{passwordStrength.hasLowerCase ? '✓' : '○'}</span>
          Uma letra minúscula
        </li>
        <li className={`flex items-center ${passwordStrength.hasNumber ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
          <span className="mr-2">{passwordStrength.hasNumber ? '✓' : '○'}</span>
          Um número
        </li>
        <li className={`flex items-center ${passwordStrength.hasSpecialChar ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
          <span className="mr-2">{passwordStrength.hasSpecialChar ? '✓' : '○'}</span>
          Um caractere especial
        </li>
      </ul>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nome
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full h-12 px-4 text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:text-white transition-colors duration-200"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sobrenome
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full h-12 px-4 text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:text-white transition-colors duration-200"
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full h-12 px-4 text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:text-white transition-colors duration-200"
          required
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div>
        <label htmlFor="cpf" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
          CPF
        </label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          value={formData.cpf}
          onChange={handleSpecialInputChange}
          maxLength={14}
          placeholder="000.000.000-00"
          className="w-full h-12 px-4 text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:text-white transition-colors duration-200"
          required
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
          Telefone
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleSpecialInputChange}
          maxLength={15}
          placeholder="(00) 00000-0000"
          className="w-full h-12 px-4 text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:text-white transition-colors duration-200"
          required
        />
      </div>
      <div>
        <label htmlFor="birthDate" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
          Data de Nascimento
        </label>
        <div className="relative">
          <input
            type="text"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleBirthDateChange}
            maxLength={10}
            placeholder="DD/MM/AAAA"
            className="w-full h-12 px-4 text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:text-white transition-colors duration-200"
            required
          />
          {formData.birthDate && !validateBirthDate(formData.birthDate) && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              Data inválida.
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="relative">
        <label htmlFor="password" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
          Senha
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handlePasswordChange}
            className="w-full h-12 px-4 text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:text-white transition-colors duration-200"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {formData.password && renderPasswordStrengthIndicator()}
      </div>
      <div className="relative">
        <label htmlFor="confirmPassword" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
          Confirmar Senha
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            className="w-full h-12 px-4 text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:text-white transition-colors duration-200"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {formData.confirmPassword && formData.password !== formData.confirmPassword && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            As senhas não coincidem.
          </p>
        )}
      </div>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        // Registra o usuário usando o contexto de autenticação
        await register(formData.firstName + ' ' + formData.lastName, formData.email, formData.password);
        navigate('/conta');
      } catch (error) {
        console.error('Erro ao registrar:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <button
              onClick={() => currentStep > 1 ? setCurrentStep(prev => prev - 1) : navigate('/')}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
                Criar Conta
              </h2>
              {emailFromURL && currentStep === 1 && (
                <p className="text-center mt-2 text-gray-600 dark:text-gray-400">
                  Bem-vindo! Primeiro, nos diga seu nome
                </p>
              )}
              {currentStep === 2 && (
                <p className="text-center mt-2 text-gray-600 dark:text-gray-400">
                  Agora, precisamos de alguns dados pessoais
                </p>
              )}
              {currentStep === 3 && (
                <p className="text-center mt-2 text-gray-600 dark:text-gray-400">
                  Por último, crie uma senha segura
                </p>
              )}
            </div>
          </div>

          {renderStepIndicator()}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!validateStep(currentStep)}
                className={`w-full h-12 flex justify-center items-center px-6 text-base font-medium rounded-lg text-white
                  ${
                    validateStep(currentStep)
                      ? 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
                      : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                  }
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200`}
              >
                {currentStep === 3 ? 'Criar conta' : 'Continuar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
