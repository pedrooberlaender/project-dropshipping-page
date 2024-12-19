import { motion } from 'framer-motion';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Notification from '../components/Notification';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (value: string) => void;
  title: string;
  value: string;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSave, title, value }) => {
  if (!isOpen) return null;

  const [newValue, setNewValue] = useState(value);

  const handleSubmit = () => {
    onSave(newValue);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{title}</h2>
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

// Funções de validação
const validateEmail = (email: string) => {
  if (!email) return 'Email é obrigatório.';
  
  // Lista dos provedores de email mais comuns no Brasil
  const validDomains = [
    'gmail.com',
    'hotmail.com',
    'outlook.com',
    'yahoo.com',
    'yahoo.com.br',
    'uol.com.br',
    'bol.com.br',
    'ig.com.br',
    'terra.com.br'
  ];
  
  // Validação básica de formato
  const basicFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!basicFormat.test(email)) return 'E-mail inválido, corrija-o para prosseguir.';
  
  // Validação do provedor
  const domain = email.split('@')[1]?.toLowerCase();
  if (!validDomains.includes(domain)) return 'E-mail inválido, corrija-o para prosseguir.';
  
  return '';
};

const validateCPF = (cpf: string) => {
  // Remove caracteres não numéricos
  const cleanCPF = cpf.replace(/\D/g, '');
  
  // Verifica se tem 11 dígitos
  if (cleanCPF.length !== 11) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
  
  // Valida primeiro dígito
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit > 9) digit = 0;
  if (digit !== parseInt(cleanCPF.charAt(9))) return false;
  
  // Valida segundo dígito
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
  const numbers = phone.replace(/\D/g, '');
  if (!numbers) return 'Telefone é obrigatório.';
  if (numbers.length !== 11) return 'Telefone deve ter 11 dígitos.';
  if (/^(\d)\1+$/.test(numbers)) return 'Telefone inválido.';
  return '';
};

const validatePassword = (password: string) => {
  // Pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return hasMinLength && hasUpperCase && hasNumber && hasSpecialChar;
};

const formatPhone = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};

const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

const validateCEP = (cep: string) => {
  const cepClean = cep.replace(/\D/g, '');
  if (!cepClean) return 'CEP é obrigatório.';
  if (cepClean.length !== 8) return 'CEP inválido.';
  return '';
};

const formatCEP = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 5) return numbers;
  return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
};

const fetchAddressData = async (cep: string) => {
  const cepClean = cep.replace(/\D/g, '');
  if (cepClean.length !== 8) return null;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cepClean}/json/`);
    const data = await response.json();
    
    if (data.erro) return null;
    
    return {
      city: data.localidade,
      state: data.uf,
      neighborhood: data.bairro,
      street: data.logradouro
    };
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    return null;
  }
};

export function AccountData() {
  const { user, updateName, updateEmail, updatePhone, updatePassword, updateFullAddress } = useContext(UserContext);
  if (!user) {
    throw new Error('AccountData must be used within a UserProvider');
  }

  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>( {});

  const [editPersonal, setEditPersonal] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    password: '',
    cpf: user.cpf || '',
  });

  const [editAddress, setEditAddress] = useState(user.address || {
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: ''
  });

  useEffect(() => {
    if (user) {
      setEditPersonal({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        password: '',
        cpf: user.cpf || '',
      });
      setEditAddress(user.address || {
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: ''
      });
    }
  }, [user]);

  const handlePersonalSubmit = async () => {
    let hasErrors = false;
    const errors: { [key: string]: string } = {};

    // Validação do email
    const emailError = validateEmail(editPersonal.email);
    if (emailError) {
      hasErrors = true;
      errors.email = emailError;
    }

    // Validação do telefone
    const phoneError = validatePhone(editPersonal.phone);
    if (phoneError) {
      hasErrors = true;
      errors.phone = phoneError;
    }

    // Validação do CPF
    if (editPersonal.cpf !== user.cpf) {
      if (!validateCPF(editPersonal.cpf)) {
        hasErrors = true;
        errors.cpf = 'CPF inválido.';
      }
    }

    // Validação da senha
    if (editPersonal.password) {
      if (!validatePassword(editPersonal.password)) {
        hasErrors = true;
        errors.password = 'Senha deve ter no mínimo 8 caracteres, uma letra maiúscula, um número e um caractere especial.';
      }
    }

    if (hasErrors) {
      setFieldErrors(errors);
      setNotificationMessage('Por favor, corrija os erros antes de salvar.');
      setNotificationType('error');
      setShowNotification(true);
      return;
    }

    try {
      if (editPersonal.name !== user.name) {
        const success = await updateName(editPersonal.name);
        if (!success) return;
      }

      if (editPersonal.email !== user.email) {
        const success = await updateEmail(editPersonal.email);
        if (!success) return;
      }

      if (editPersonal.phone !== user.phone) {
        const success = await updatePhone(editPersonal.phone);
        if (!success) return;
      }

      if (editPersonal.password) {
        const success = await updatePassword(editPersonal.password);
        if (!success) return;
      }

      setIsEditingPersonal(false);
      setShowPassword(false);
      setNotificationMessage('Dados atualizados com sucesso!');
      setNotificationType('success');
      setShowNotification(true);
      setFieldErrors({});
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      setNotificationMessage('Erro ao atualizar dados.');
      setNotificationType('error');
      setShowNotification(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditPersonal(prev => ({ ...prev, [name]: value }));
    
    // Validação em tempo real para o email
    if (name === 'email') {
      const emailError = validateEmail(value);
      setFieldErrors(prev => ({ ...prev, email: emailError }));
    } else {
      // Limpa o erro quando o usuário começa a digitar em outros campos
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedPhone = formatPhone(value);
    setEditPersonal(prev => ({ ...prev, phone: formattedPhone }));
    setFieldErrors(prev => ({ ...prev, phone: '' }));
  };

  const handleSpecialInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cpf') {
      // Permite apenas números
      const numericValue = value.replace(/\D/g, '');
      formattedValue = formatCPF(numericValue);
    }

    setEditPersonal(prev => ({ ...prev, [name]: formattedValue }));
    // Limpa o erro quando o usuário começa a digitar
    setFieldErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleAddressSubmit = async () => {
    const success = await updateFullAddress(editAddress);
    if (success) {
      setIsEditingAddress(false);
      setNotificationMessage('Endereço atualizado com sucesso!');
      setNotificationType('success');
      setShowNotification(true);
    } else {
      setNotificationMessage('Erro ao atualizar o endereço. Tente novamente.');
      setNotificationType('error');
      setShowNotification(true);
    }
  };

  const scrollToBottom = (containerId: string) => {
    setTimeout(() => {
      const container = document.getElementById(containerId);
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const absoluteContainerTop = containerRect.top + window.pageYOffset;
        const scrollTarget = absoluteContainerTop + containerRect.height - window.innerHeight + 100; // +100px para margem
        
        window.scrollTo({
          top: scrollTarget,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const [cepError, setCepError] = useState('');

  const formatCEP = (cep: string) => {
    return cep.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').substr(0, 9);
  };

  const validateCEP = (cep: string) => {
    const cepRegex = /^[0-9]{5}-[0-9]{3}$/;
    return cepRegex.test(cep);
  };

  const fetchAddressData = async (cep: string) => {
    try {
      setCepError('');
      const cleanCep = cep.replace(/\D/g, '');
      if (cleanCep.length !== 8) {
        setCepError('CEP deve conter 8 dígitos');
        return null;
      }

      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setCepError('CEP não encontrado');
        return null;
      }

      return {
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf
      };
    } catch (error) {
      setCepError('Erro ao buscar CEP');
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {showNotification && (
          <div className="fixed top-4 right-4 z-50">
            <Notification
              message={notificationMessage}
              type={notificationType}
              onClose={() => setShowNotification(false)}
            />
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">Minha Conta</h1>
          <p className="text-gray-600 dark:text-gray-400">Gerencie suas informações pessoais e preferências</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Data Section - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-[#7C3AED] h-[600px] flex flex-col"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Dados Pessoais</h2>
            {!isEditingPersonal ? (
              <div className="flex flex-col flex-grow">
                <div className="flex-grow space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Nome</p>
                    <p className="text-lg text-gray-900 dark:text-white">{user.name || '-'}</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                    <p className="text-lg text-gray-900 dark:text-white">{user.email || '-'}</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">CPF</p>
                    <p className="text-lg text-gray-900 dark:text-white">{user.cpf || '-'}</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Telefone</p>
                    <p className="text-lg text-gray-900 dark:text-white">{user.phone || '-'}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditingPersonal(true)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white rounded-md hover:from-[#8B5CF6] hover:to-[#9333EA]"
                >
                  Editar Dados Pessoais
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); handlePersonalSubmit(); }} className="space-y-4 h-full flex flex-col">
                <div className="flex-grow space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400">Nome</label>
                    <input
                      type="text"
                      name="name"
                      value={editPersonal.name}
                      onChange={(e) => setEditPersonal(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#7C3AED] dark:focus:ring-[#8B5CF6] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editPersonal.email}
                      onChange={(e) => setEditPersonal(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#7C3AED] dark:focus:ring-[#8B5CF6] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400">CPF</label>
                    <input
                      type="text"
                      name="cpf"
                      value={editPersonal.cpf}
                      onChange={(e) => setEditPersonal(prev => ({ ...prev, cpf: e.target.value }))}
                      className="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#7C3AED] dark:focus:ring-[#8B5CF6] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400">Telefone</label>
                    <input
                      type="text"
                      name="phone"
                      value={editPersonal.phone}
                      onChange={(e) => setEditPersonal(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#7C3AED] dark:focus:ring-[#8B5CF6] focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditingPersonal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white rounded-md hover:from-[#8B5CF6] hover:to-[#9333EA]"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Address Section - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-[#7C3AED] h-auto min-h-[600px] flex flex-col"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Endereço</h2>
            {!isEditingAddress ? (
              <div className="flex flex-col flex-grow">
                <div className="flex-grow space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">CEP</p>
                    <p className="text-lg text-gray-900 dark:text-white">{user.address?.zipCode || '-'}</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Rua</p>
                    <p className="text-lg text-gray-900 dark:text-white">{user.address?.street || '-'}</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Número</p>
                    <p className="text-lg text-gray-900 dark:text-white">{user.address?.number || '-'}</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Complemento</p>
                    <p className="text-lg text-gray-900 dark:text-white">{user.address?.complement || '-'}</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Bairro</p>
                    <p className="text-lg text-gray-900 dark:text-white">{user.address?.neighborhood || '-'}</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Cidade</p>
                    <p className="text-lg text-gray-900 dark:text-white">{user.address?.city || '-'}</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Estado</p>
                    <p className="text-lg text-gray-900 dark:text-white">{user.address?.state || '-'}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsEditingAddress(true);
                    setTimeout(() => {
                      const addressForm = document.getElementById('address-form');
                      if (addressForm) {
                        const bottomOffset = addressForm.getBoundingClientRect().bottom;
                        const windowHeight = window.innerHeight;
                        const scrollAmount = bottomOffset - windowHeight + 100; // 100px extra space
                        window.scrollTo({
                          top: window.scrollY + scrollAmount,
                          behavior: 'smooth'
                        });
                      }
                    }, 100); // Small delay to ensure form is rendered
                  }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white rounded-md hover:from-[#8B5CF6] hover:to-[#9333EA]"
                >
                  Editar Endereço
                </button>
              </div>
            ) : (
              <form id="address-form" onSubmit={(e) => { e.preventDefault(); handleAddressSubmit(); }} className="space-y-4 h-full flex flex-col">
                <div className="flex-grow space-y-4 mb-6">
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400">CEP</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={editAddress.zipCode}
                      onChange={(e) => {
                        const value = e.target.value;
                        const formattedCEP = formatCEP(value);
                        setEditAddress(prev => ({ ...prev, zipCode: formattedCEP }));
                        
                        if (value.replace(/\D/g, '').length === 8) {
                          fetchAddressData(value).then(addressData => {
                            if (addressData) {
                              setEditAddress(prev => ({
                                ...prev,
                                street: addressData.street || prev.street,
                                neighborhood: addressData.neighborhood || prev.neighborhood,
                                city: addressData.city,
                                state: addressData.state
                              }));
                            }
                          });
                        }
                      }}
                      onBlur={() => {
                        if (!validateCEP(editAddress.zipCode)) {
                          setCepError('CEP inválido');
                        }
                      }}
                      maxLength={9}
                      placeholder="00000-000"
                      className={`w-full px-3 py-2 mt-1 border ${cepError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#7C3AED] dark:focus:ring-[#8B5CF6] focus:border-transparent`}
                    />
                    {cepError && <p className="mt-1 text-sm text-red-500">{cepError}</p>}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400">Rua</label>
                    <input
                      type="text"
                      name="street"
                      value={editAddress.street}
                      onChange={(e) => setEditAddress(prev => ({ ...prev, street: e.target.value }))}
                      className="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#7C3AED] dark:focus:ring-[#8B5CF6] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400">Número</label>
                    <input
                      type="text"
                      name="number"
                      value={editAddress.number}
                      onChange={(e) => setEditAddress(prev => ({ ...prev, number: e.target.value }))}
                      className="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#7C3AED] dark:focus:ring-[#8B5CF6] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400">Complemento</label>
                    <input
                      type="text"
                      name="complement"
                      value={editAddress.complement}
                      onChange={(e) => setEditAddress(prev => ({ ...prev, complement: e.target.value }))}
                      className="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#7C3AED] dark:focus:ring-[#8B5CF6] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400">Bairro</label>
                    <input
                      type="text"
                      name="neighborhood"
                      value={editAddress.neighborhood}
                      onChange={(e) => setEditAddress(prev => ({ ...prev, neighborhood: e.target.value }))}
                      className="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#7C3AED] dark:focus:ring-[#8B5CF6] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400">Cidade</label>
                    <input
                      type="text"
                      name="city"
                      value={editAddress.city}
                      readOnly
                      className="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400">Estado</label>
                    <input
                      type="text"
                      name="state"
                      value={editAddress.state}
                      readOnly
                      className="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white cursor-not-allowed"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingAddress(false);
                      setCepError('');
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white rounded-md hover:from-[#8B5CF6] hover:to-[#9333EA]"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
