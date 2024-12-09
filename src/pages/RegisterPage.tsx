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
  birthDate: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  password: string;
  confirmPassword: string;
}

interface PasswordStrength {
  hasMinLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

interface FieldErrors {
  [key: string]: string;
}

interface CepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, login } = useAuth();
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
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const returnUrl = new URLSearchParams(location.search).get('returnUrl') || '/';
  const message = location.state?.message;

  useEffect(() => {
    if (message) {
      // TODO: Mostrar mensagem usando um sistema de toast/notificação
      console.log(message);
    }
  }, [message]);

  // Pegar o email da URL
  const searchParams = new URLSearchParams(window.location.search);
  const emailFromURL = searchParams.get('email');

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    cpf: '',
    phone: '',
    birthDate: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    password: '',
    confirmPassword: '',
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

  useEffect(() => {
    if (isRedirecting) {
      const timer = setTimeout(() => {
        navigate(returnUrl);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isRedirecting, navigate]);

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

  const formatZipCode = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  };

  const validateCPF = (cpf: string) => {
    // Remove non-numeric characters
    const cleanCPF = cpf.replace(/\D/g, '');

    // Check if it has 11 digits
    if (cleanCPF.length !== 11) return false;

    // Check if all digits are the same
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

    // Validate first digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit > 9) digit = 0;
    if (digit !== parseInt(cleanCPF.charAt(9))) return false;

    // Validate second digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit > 9) digit = 0;
    if (digit !== parseInt(cleanCPF.charAt(10))) return false;

    return true;
  };

  const validatePhone = (phone: string) => {
    // Remove non-numeric characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Check if it has either 10 or 11 digits (with DDD)
    if (cleanPhone.length < 10 || cleanPhone.length > 11) return false;
    
    // Check if DDD is valid (10-99)
    const ddd = parseInt(cleanPhone.substring(0, 2));
    if (ddd < 11 || ddd > 99) return false;
    
    // Check if it's not a sequence of same numbers
    if (/^(\d)\1+$/.test(cleanPhone)) return false;
    
    return true;
  };

  const validateBirthDate = (date: string) => {
    // Check format DD/MM/YYYY
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) return false;

    const [day, month, year] = date.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    
    // Check if date is valid
    if (birthDate.getDate() !== day || birthDate.getMonth() !== month - 1 || birthDate.getFullYear() !== year) {
      return false;
    }
    
    // Check if date is not in the future
    if (birthDate > today) return false;
    
    // Check if age is between 18 and 120 years
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age >= 18 && age <= 120;
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
    } else if (name === 'zipCode') {
      formattedValue = formatZipCode(value);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    // Remove o erro enquanto o usuário está digitando
    setFieldErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let error = '';

    if (value.trim() === '') return; // Não mostra erro se o campo estiver vazio

    if (name === 'cpf' && !validateCPF(value)) {
      error = 'CPF inválido.';
    } else if (name === 'phone' && !validatePhone(value)) {
      error = 'Telefone inválido.';
    } else if (name === 'birthDate' && !validateBirthDate(value)) {
      error = 'Data de nascimento inválida.';
    }

    setFieldErrors(prev => ({ ...prev, [name]: error }));
  };

  const fetchAddressFromCep = async (cep: string): Promise<CepResponse | null> => {
    try {
      const cleanCep = cep.replace(/\D/g, '');
      if (cleanCep.length !== 8) return null;

      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();
      
      if (data.erro) return null;
      return data;
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      return null;
    }
  };

  const handleZipCodeBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value;
    if (!cep || cep.length < 8) return;

    try {
      const address = await fetchAddressFromCep(cep);
      if (address) {
        setFormData(prev => ({
          ...prev,
          street: address.logradouro || '',
          neighborhood: address.bairro || '',
          city: address.localidade,
          state: address.uf,
        }));
        setFieldErrors(prev => ({ ...prev, zipCode: '' }));
      } else {
        setFieldErrors(prev => ({ ...prev, zipCode: 'CEP inválido.' }));
      }
    } catch (error) {
      setFieldErrors(prev => ({ ...prev, zipCode: 'Erro ao buscar CEP.' }));
    }
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
        return formData.firstName.trim() && formData.lastName.trim();
      case 2:
        return formData.email.trim() && 
               formData.cpf.trim() && validateCPF(formData.cpf) &&
               formData.phone.trim() && validatePhone(formData.phone) &&
               formData.birthDate && validateBirthDate(formData.birthDate) &&
               !fieldErrors.cpf && !fieldErrors.phone && !fieldErrors.birthDate;
      case 3:
        return formData.street.trim() &&
               formData.number.trim() &&
               formData.neighborhood.trim() &&
               formData.city.trim() &&
               formData.state.trim() &&
               formData.zipCode.trim();
      case 4:
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
        {[1, 2, 3, 4].map((step) => (
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
            {step < 4 && (
              <div
                className={`w-16 h-1 mx-2 ${
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
          onBlur={handleInputBlur}
          maxLength={14}
          placeholder="000.000.000-00"
          className={`w-full h-12 px-4 text-base bg-white dark:bg-gray-800 border ${
            fieldErrors.cpf ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
          } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:text-white transition-colors duration-200`}
          required
        />
        {fieldErrors.cpf && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {fieldErrors.cpf}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="phone" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
          Telefone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleSpecialInputChange}
          onBlur={handleInputBlur}
          maxLength={15}
          placeholder="(00) 00000-0000"
          className={`w-full h-12 px-4 text-base bg-white dark:bg-gray-800 border ${
            fieldErrors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
          } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:text-white transition-colors duration-200`}
          required
        />
        {fieldErrors.phone && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {fieldErrors.phone}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="birthDate" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
          Data de Nascimento
        </label>
        <input
          type="text"
          id="birthDate"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleSpecialInputChange}
          onBlur={handleInputBlur}
          maxLength={10}
          placeholder="DD/MM/AAAA"
          className={`w-full h-12 px-4 text-base bg-white dark:bg-gray-800 border ${
            fieldErrors.birthDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
          } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:text-white transition-colors duration-200`}
          required
        />
        {fieldErrors.birthDate && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {fieldErrors.birthDate}
          </p>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div>
        <label htmlFor="zipCode" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
          CEP
        </label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleSpecialInputChange}
          onBlur={handleZipCodeBlur}
          maxLength={9}
          placeholder="00000-000"
          className={`w-full h-12 px-4 text-base bg-white dark:bg-gray-800 border ${
            fieldErrors.zipCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
          } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:text-white transition-colors duration-200`}
          required
        />
        {fieldErrors.zipCode && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {fieldErrors.zipCode}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="street" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
          Rua
        </label>
        <input
          type="text"
          id="street"
          name="street"
          value={formData.street}
          onChange={handleInputChange}
          className="w-full h-12 px-4 text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:text-white transition-colors duration-200"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="number" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
            Número
          </label>
          <input
            type="text"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleInputChange}
            className="w-full h-12 px-4 text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:text-white transition-colors duration-200"
            required
          />
        </div>
        <div>
          <label htmlFor="complement" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
            Complemento
          </label>
          <input
            type="text"
            id="complement"
            name="complement"
            value={formData.complement}
            onChange={handleInputChange}
            className="w-full h-12 px-4 text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:text-white transition-colors duration-200"
          />
        </div>
      </div>
      <div>
        <label htmlFor="neighborhood" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
          Bairro
        </label>
        <input
          type="text"
          id="neighborhood"
          name="neighborhood"
          value={formData.neighborhood}
          onChange={handleInputChange}
          className="w-full h-12 px-4 text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:text-white transition-colors duration-200"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
            Cidade
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            readOnly
            className="w-full h-12 px-4 text-base bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg cursor-not-allowed"
            required
          />
        </div>
        <div>
          <label htmlFor="state" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
            Estado
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            readOnly
            maxLength={2}
            className="w-full h-12 px-4 text-base bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg cursor-not-allowed"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4">
      <div>
        <label htmlFor="password" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
          Senha
        </label>
        <div className="relative flex items-center">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handlePasswordChange}
            className={`w-full h-12 px-4 text-base bg-white dark:bg-gray-800 border ${
              fieldErrors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
            } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:text-white transition-colors duration-200 pr-10 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 p-1"
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        {fieldErrors.password && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {fieldErrors.password}
          </p>
        )}
        <div className="mt-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">Sua senha deve conter:</p>
          <ul className="mt-1 space-y-1">
            <li className={`text-sm ${passwordStrength.hasMinLength ? 'text-green-500' : 'text-gray-500'}`}>
              <CheckCircle className="inline-block h-4 w-4 mr-1" /> Mínimo de 8 caracteres
            </li>
            <li className={`text-sm ${passwordStrength.hasUpperCase ? 'text-green-500' : 'text-gray-500'}`}>
              <CheckCircle className="inline-block h-4 w-4 mr-1" /> Uma letra maiúscula
            </li>
            <li className={`text-sm ${passwordStrength.hasLowerCase ? 'text-green-500' : 'text-gray-500'}`}>
              <CheckCircle className="inline-block h-4 w-4 mr-1" /> Uma letra minúscula
            </li>
            <li className={`text-sm ${passwordStrength.hasNumber ? 'text-green-500' : 'text-gray-500'}`}>
              <CheckCircle className="inline-block h-4 w-4 mr-1" /> Um número
            </li>
            <li className={`text-sm ${passwordStrength.hasSpecialChar ? 'text-green-500' : 'text-gray-500'}`}>
              <CheckCircle className="inline-block h-4 w-4 mr-1" /> Um caractere especial
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
          Confirmar Senha
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`w-full h-12 px-4 text-base bg-white dark:bg-gray-800 border ${
              formData.password !== formData.confirmPassword && formData.confirmPassword
                ? 'border-red-500 dark:border-red-400'
                : 'border-gray-300 dark:border-gray-700'
            } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent dark:text-white transition-colors duration-200`}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {formData.password !== formData.confirmPassword && formData.confirmPassword && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            As senhas devem coincidir.
          </p>
        )}
      </div>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 4) {
      if (validateStep(currentStep)) {
        try {
          const formDataToSubmit = new FormData();
          Object.entries(formData).forEach(([key, value]) => {
            if (key !== 'confirmPassword') {
              formDataToSubmit.append(key, value);
            }
          });

          await register(formDataToSubmit);
          setShowSuccessMessage(true);
          setIsRedirecting(true);
        } catch (error) {
          console.error('Error during registration:', error);
        }
      }
    } else if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSuccessfulLogin = () => {
    setShowSuccessMessage(true);
    setIsRedirecting(true);
    
    setTimeout(() => {
      navigate(returnUrl);
    }, 3000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRedirecting(true);

    try {
      await login(formData.email, formData.password);
      handleSuccessfulLogin();
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Criar Conta
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {currentStep === 1 && "Bem-vindo! Primeiro, nos diga seu nome"}
              {currentStep === 2 && "Agora, precisamos de algumas informações pessoais"}
              {currentStep === 3 && "Por favor, informe seu endereço"}
              {currentStep === 4 && "Por último, crie uma senha segura"}
            </p>
          </div>

          {renderStepIndicator()}

          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            <div className="flex items-center justify-between pt-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors duration-200"
                >
                  Voltar
                </button>
              )}
              <button
                type="submit"
                className={`ml-auto px-6 py-3 text-base font-medium text-white rounded-lg transition-all duration-200
                  ${validateStep(currentStep)
                    ? 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
                    : 'bg-gray-400 cursor-not-allowed'
                  }`}
                disabled={!validateStep(currentStep)}
              >
                {currentStep < 4 ? 'Continuar' : isRedirecting ? 'Criando conta...' : 'Criar conta'}
              </button>
            </div>
          </form>
        </div>
      </div>
      {showSuccessMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl max-w-sm w-full mx-4">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
              Conta criada com sucesso!
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Você será redirecionado para a página inicial em instantes...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
