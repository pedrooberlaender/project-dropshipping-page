import { useState, useContext, useEffect } from 'react';
import { PencilIcon } from 'lucide-react';
import { UserContext } from '../contexts/UserContext';
import Notification from '../components/Notification';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

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

  const [isEditingData, setIsEditingData] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const [editingData, setEditingData] = useState({
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
      setEditingData({
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

  const handleDataSubmit = async () => {
    let hasErrors = false;
    const errors: { [key: string]: string } = {};

    // Validação do email
    const emailError = validateEmail(editingData.email);
    if (emailError) {
      hasErrors = true;
      errors.email = emailError;
    }

    // Validação do telefone
    const phoneError = validatePhone(editingData.phone);
    if (phoneError) {
      hasErrors = true;
      errors.phone = phoneError;
    }

    // Validação do CPF
    if (editingData.cpf !== user.cpf) {
      if (!validateCPF(editingData.cpf)) {
        hasErrors = true;
        errors.cpf = 'CPF inválido.';
      }
    }

    // Validação da senha
    if (editingData.password) {
      if (!validatePassword(editingData.password)) {
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
      if (editingData.name !== user.name) {
        const success = await updateName(editingData.name);
        if (!success) return;
      }

      if (editingData.email !== user.email) {
        const success = await updateEmail(editingData.email);
        if (!success) return;
      }

      if (editingData.phone !== user.phone) {
        const success = await updatePhone(editingData.phone);
        if (!success) return;
      }

      if (editingData.password) {
        const success = await updatePassword(editingData.password);
        if (!success) return;
      }

      setIsEditingData(false);
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
    setEditingData(prev => ({ ...prev, [name]: value }));
    
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
    setEditingData(prev => ({ ...prev, phone: formattedPhone }));
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

    setEditingData(prev => ({ ...prev, [name]: formattedValue }));
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

  return (
    <div className="max-w-7xl mx-auto p-6">
      {showNotification && (
        <div className="fixed top-4 right-4 z-50">
          <Notification
            message={notificationMessage}
            type={notificationType}
            onClose={() => setShowNotification(false)}
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dados da Conta */}
        <div id="account-data" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col min-h-[600px]">
          <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">Dados da Conta</h1>
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-4 h-full">
              {!isEditingData ? (
                <>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Nome</p>
                      <p className="text-lg text-gray-900 dark:text-gray-100">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                      <p className="text-lg text-gray-900 dark:text-gray-100">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Telefone</p>
                      <p className="text-lg text-gray-900 dark:text-gray-100">{user.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Senha</p>
                      <p className="text-lg text-gray-900 dark:text-gray-100">••••••••</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">CPF</p>
                      <p className="text-lg text-gray-900 dark:text-gray-100">{user.cpf}</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400">Nome</label>
                      <input
                        type="text"
                        name="name"
                        value={editingData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-1 text-lg border rounded dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={editingData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-1 text-lg border rounded dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400">Telefone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={editingData.phone}
                        onChange={handlePhoneChange}
                        placeholder="(00) 00000-0000"
                        maxLength={15}
                        className="w-full p-2 mt-1 text-lg border rounded dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400">Nova Senha</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={editingData.password}
                          onChange={handleInputChange}
                          placeholder="Deixe em branco para manter a senha atual"
                          className="w-full p-2 mt-1 text-lg border rounded dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400">CPF</label>
                      <input
                        type="text"
                        name="cpf"
                        value={editingData.cpf}
                        onChange={handleSpecialInputChange}
                        maxLength={14}
                        placeholder="000.000.000-00"
                        className="w-full p-2 mt-1 text-lg border rounded dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="mt-auto pt-4">
            {!isEditingData ? (
              <button
                onClick={() => {
                  setIsEditingData(true);
                  setEditingData({
                    name: user.name || '',
                    email: user.email || '',
                    phone: user.phone || '',
                    password: '',
                    cpf: user.cpf || '',
                  });
                  scrollToBottom('account-data');
                }}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center justify-center gap-2"
              >
                <PencilIcon className="h-5 w-5" />
                Editar Dados
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleDataSubmit}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Salvar
                </button>
                <button
                  onClick={() => {
                    setIsEditingData(false);
                    setEditingData({
                      name: user.name || '',
                      email: user.email || '',
                      phone: user.phone || '',
                      password: '',
                      cpf: user.cpf || '',
                    });
                    setShowPassword(false);
                  }}
                  className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Endereço Principal */}
        <div id="address-data" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col min-h-[600px]">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">Endereço Principal</h2>
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-4 h-full">
              {!isEditingAddress ? (
                <>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Rua</p>
                      <p className="text-lg text-gray-900 dark:text-gray-100">{user.address?.street}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Número</p>
                      <p className="text-lg text-gray-900 dark:text-gray-100">{user.address?.number}</p>
                    </div>
                    {user.address?.complement && (
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Complemento</p>
                        <p className="text-lg text-gray-900 dark:text-gray-100">{user.address.complement}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Bairro</p>
                      <p className="text-lg text-gray-900 dark:text-gray-100">{user.address?.neighborhood}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Cidade</p>
                      <p className="text-lg text-gray-900 dark:text-gray-100">{user.address?.city}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Estado</p>
                      <p className="text-lg text-gray-900 dark:text-gray-100">{user.address?.state}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">CEP</p>
                      <p className="text-lg text-gray-900 dark:text-gray-100">{user.address?.zipCode}</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400">Rua</label>
                      <input
                        type="text"
                        value={editAddress.street}
                        onChange={(e) => setEditAddress(prev => ({ ...prev, street: e.target.value }))}
                        className="w-full p-2 mt-1 text-lg border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400">Número</label>
                      <input
                        type="text"
                        value={editAddress.number}
                        onChange={(e) => setEditAddress(prev => ({ ...prev, number: e.target.value }))}
                        className="w-full p-2 mt-1 text-lg border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400">Complemento</label>
                      <input
                        type="text"
                        value={editAddress.complement}
                        onChange={(e) => setEditAddress(prev => ({ ...prev, complement: e.target.value }))}
                        className="w-full p-2 mt-1 text-lg border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400">Bairro</label>
                      <input
                        type="text"
                        value={editAddress.neighborhood}
                        onChange={(e) => setEditAddress(prev => ({ ...prev, neighborhood: e.target.value }))}
                        className="w-full p-2 mt-1 text-lg border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                      />
                    </div>
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
                                  city: addressData.city,
                                  state: addressData.state,
                                  neighborhood: addressData.neighborhood || prev.neighborhood
                                }));
                                setFieldErrors(prev => ({ ...prev, zipCode: '' }));
                              } else {
                                setFieldErrors(prev => ({ ...prev, zipCode: 'CEP não encontrado.' }));
                              }
                            });
                          }
                        }}
                        placeholder="00000-000"
                        maxLength={9}
                        className={`w-full p-2 mt-1 text-lg border rounded dark:bg-gray-700 dark:text-gray-100 ${
                          fieldErrors.zipCode ? 'border-red-500' : 'dark:border-gray-600'
                        }`}
                      />
                      {fieldErrors.zipCode && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {fieldErrors.zipCode}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400">Cidade</label>
                      <input
                        type="text"
                        name="city"
                        value={editAddress.city}
                        readOnly
                        className="w-full p-2 mt-1 text-lg border rounded dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400">Estado</label>
                      <input
                        type="text"
                        name="state"
                        value={editAddress.state}
                        readOnly
                        className="w-full p-2 mt-1 text-lg border rounded dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="mt-auto pt-4">
            {!isEditingAddress ? (
              <button
                onClick={() => {
                  setIsEditingAddress(true);
                  scrollToBottom('address-data');
                }}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center justify-center gap-2"
              >
                <PencilIcon className="h-5 w-5" />
                Editar Endereço
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleAddressSubmit}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Salvar
                </button>
                <button
                  onClick={() => {
                    setIsEditingAddress(false);
                    setEditAddress(user.address || {
                      street: '',
                      number: '',
                      complement: '',
                      neighborhood: '',
                      city: '',
                      state: '',
                      zipCode: ''
                    });
                  }}
                  className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
