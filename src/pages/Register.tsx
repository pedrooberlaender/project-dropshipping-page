import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';

type PasswordStrength = 'weak' | 'medium' | 'strong' | '';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>('');

  // Check password match whenever password or confirmPassword changes
  useEffect(() => {
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'As senhas não coincidem'
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        confirmPassword: ''
      }));
    }
  }, [formData.password, formData.confirmPassword]);

  const getPasswordStrength = (password: string): PasswordStrength => {
    if (!password) return '';
    if (password.length <= 6) return 'weak';
    if (password.length <= 8) return 'medium';
    return 'strong';
  };

  const getStrengthColor = (strength: PasswordStrength): string => {
    switch (strength) {
      case 'weak':
        return 'text-red-600 dark:text-red-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'strong':
        return 'text-green-600 dark:text-green-400';
      default:
        return '';
    }
  };

  const getProgressBarColor = (strength: PasswordStrength): string => {
    switch (strength) {
      case 'weak':
        return 'bg-red-500 dark:bg-red-500';
      case 'medium':
        return 'bg-yellow-500 dark:bg-yellow-500';
      case 'strong':
        return 'bg-green-500 dark:bg-green-500';
      default:
        return '';
    }
  };

  const getStrengthWidth = (strength: PasswordStrength): string => {
    switch (strength) {
      case 'weak':
        return 'w-1/3';
      case 'medium':
        return 'w-2/3';
      case 'strong':
        return 'w-full';
      default:
        return 'w-0';
    }
  };

  const getStrengthText = (strength: PasswordStrength): string => {
    switch (strength) {
      case 'weak':
        return 'Senha fraca';
      case 'medium':
        return 'Senha média';
      case 'strong':
        return 'Senha forte';
      default:
        return '';
    }
  };

  useEffect(() => {
    setPasswordStrength(getPasswordStrength(formData.password));
  }, [formData.password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({
      password: '',
      confirmPassword: ''
    });

    // Validate password strength
    if (passwordStrength === 'weak') {
      setErrors(prev => ({
        ...prev,
        password: 'Senha muito fraca. Por favor, escolha uma senha mais forte com pelo menos 7 caracteres.'
      }));
      return;
    }

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: 'As senhas não coincidem'
      });
      return;
    }

    // Add registration logic here
    console.log('Registration attempt:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Criar uma conta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* Nome */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdPerson className="h-5 w-5 text-gray-900 dark:text-gray-300" />
              </div>
              <input
                type="text"
                name="firstName"
                required
                className="appearance-none rounded-lg relative block w-full px-12 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nome"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            {/* Sobrenome */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdPerson className="h-5 w-5 text-gray-900 dark:text-gray-300" />
              </div>
              <input
                type="text"
                name="lastName"
                required
                className="appearance-none rounded-lg relative block w-full px-12 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Sobrenome"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdEmail className="h-5 w-5 text-gray-900 dark:text-gray-300" />
              </div>
              <input
                type="email"
                name="email"
                required
                className="appearance-none rounded-lg relative block w-full px-12 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Senha */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdLock className="h-5 w-5 text-gray-900 dark:text-gray-300" />
              </div>
              <input
                type={showPasswords ? "text" : "password"}
                name="password"
                required
                className="appearance-none rounded-lg relative block w-full px-12 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
                value={formData.password}
                onChange={handleChange}
              />
              {formData.password && (
                <div className="mt-2">
                  <div className="relative h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`absolute top-0 left-0 h-full transition-all duration-300 ${getProgressBarColor(
                        passwordStrength
                      )} ${getStrengthWidth(passwordStrength)}`}
                      style={{ borderRadius: 'inherit' }}
                    ></div>
                  </div>
                  <p className={`mt-1 text-sm font-medium ${getStrengthColor(passwordStrength)}`}>
                    {getStrengthText(passwordStrength)}
                  </p>
                </div>
              )}
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirmar Senha */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdLock className="h-5 w-5 text-gray-900 dark:text-gray-300" />
              </div>
              <input
                type={showPasswords ? "text" : "password"}
                name="confirmPassword"
                required
                className="appearance-none rounded-lg relative block w-full px-12 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirmar senha"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Mostrar Senha Checkbox */}
            <div className="flex items-center">
              <input
                id="show-password"
                name="show-password"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                checked={showPasswords}
                onChange={(e) => setShowPasswords(e.target.checked)}
              />
              <label
                htmlFor="show-password"
                className="ml-2 block text-sm text-gray-900 dark:text-gray-300 cursor-pointer"
              >
                Mostrar senha
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800 transition-colors duration-200"
            >
              Criar conta
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Já tem uma conta? Entre aqui
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
