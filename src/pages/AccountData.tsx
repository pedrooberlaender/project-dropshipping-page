import { useState, useContext } from 'react';
import { PencilIcon } from 'lucide-react';
import { UserContext } from '../contexts/UserContext';
import { Notification } from '../components/Notification';
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

export function AccountData() {
  const { user, updateName, updateEmail, updatePhone, updatePassword } = useContext(UserContext);
  if (!user) {
    throw new Error('AccountData must be used within a UserProvider');
  }
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const passwordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score += 2;
    else if (password.length >= 6) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score >= 4) return 'forte';
    if (score >= 2) return 'média';
    return 'fraca';
  };

  const handleNameSubmit = async () => {
    if (newName.trim()) {
      const success = await updateName(newName);
      if (success) {
        setIsEditingName(false);
        setNewName('');
        setShowNotification(true);
        setNotificationMessage('Nome atualizado com sucesso!');
      }
    }
  };

  const handleEmailSubmit = async () => {
    if (newEmail === confirmEmail && newEmail.trim()) {
      const success = await updateEmail(newEmail);
      if (success) {
        setIsEditingEmail(false);
        setNewEmail('');
        setConfirmEmail('');
        setShowNotification(true);
        setNotificationMessage('Um link de confirmação foi enviado para seu email!');
      }
    } else {
      setShowNotification(true);
      setNotificationMessage('Os emails não correspondem!');
    }
  };

  const handlePhoneSubmit = async () => {
    if (newPhone.trim()) {
      const success = await updatePhone(newPhone);
      if (success) {
        setIsEditingPhone(false);
        setNewPhone('');
        setShowNotification(true);
        setNotificationMessage('Um código de confirmação foi enviado para seu telefone!');
      }
    }
  };

  const handlePasswordSubmit = async () => {
    if (newPassword === confirmPassword && newPassword.trim() && passwordStrength(newPassword) !== 'fraca') {
      const success = await updatePassword(newPassword);
      if (success) {
        setIsEditingPassword(false);
        setNewPassword('');
        setConfirmPassword('');
        setShowPassword(false);
        setShowNotification(true);
        setNotificationMessage('Um link de confirmação foi enviado para seu email!');
      }
    } else if (passwordStrength(newPassword) === 'fraca') {
      setShowNotification(true);
      setNotificationMessage('A senha é muito fraca!');
    } else {
      setShowNotification(true);
      setNotificationMessage('As senhas não correspondem!');
    }
  };

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(user.address);
  const [isAddressExpanded, setIsAddressExpanded] = useState(false);

  const handleAddressSubmit = async () => {
    await updateFullAddress(editAddress);
    setIsEditingAddress(false);
    setShowNotification(true);
    setNotificationMessage('Endereço atualizado com sucesso!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Notification 
        isVisible={showNotification} 
        message={notificationMessage}
      />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">Dados da Conta</h1>

        {/* Nome */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Nome</p>
            <p className="text-lg text-gray-900 dark:text-gray-100">{user.name}</p>
          </div>
          <button
            onClick={() => setIsEditingName(true)}
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Email */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
            <p className="text-lg text-gray-900 dark:text-gray-100">{user.email}</p>
          </div>
          <button
            onClick={() => setIsEditingEmail(true)}
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Telefone */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Telefone</p>
            <p className="text-lg text-gray-900 dark:text-gray-100">{user.phone}</p>
          </div>
          <button
            onClick={() => setIsEditingPhone(true)}
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Senha */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Senha</p>
            <p className="text-lg text-gray-900 dark:text-gray-100">••••••••</p>
          </div>
          <button
            onClick={() => setIsEditingPassword(true)}
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
        </div>

        {/* CPF */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">CPF</p>
            <p className="text-lg text-gray-900 dark:text-gray-100">{user.cpf}</p>
          </div>
        </div>
      </div>

      {/* Endereço Principal */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <button
          onClick={() => setIsAddressExpanded(!isAddressExpanded)}
          className="w-full p-6 text-left flex items-center justify-between text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <h2 className="text-2xl font-bold">Endereço Principal</h2>
          <svg
            className={`w-6 h-6 transform transition-transform ${isAddressExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isAddressExpanded && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {!isEditingAddress ? (
                <>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Rua</p>
                    <p className="text-lg text-gray-900 dark:text-gray-100">{user.address.street}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Número</p>
                    <p className="text-lg text-gray-900 dark:text-gray-100">{user.address.number}</p>
                  </div>
                  {user.address.complement && (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Complemento</p>
                      <p className="text-lg text-gray-900 dark:text-gray-100">{user.address.complement}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Bairro</p>
                    <p className="text-lg text-gray-900 dark:text-gray-100">{user.address.neighborhood}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Cidade</p>
                    <p className="text-lg text-gray-900 dark:text-gray-100">{user.address.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Estado</p>
                    <p className="text-lg text-gray-900 dark:text-gray-100">{user.address.state}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">CEP</p>
                    <p className="text-lg text-gray-900 dark:text-gray-100">{user.address.zipCode}</p>
                  </div>
                </>
              ) : (
                <>
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
                      value={editAddress.complement || ''}
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
                    <label className="block text-sm text-gray-600 dark:text-gray-400">Cidade</label>
                    <input
                      type="text"
                      value={editAddress.city}
                      onChange={(e) => setEditAddress(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full p-2 mt-1 text-lg border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400">Estado</label>
                    <input
                      type="text"
                      value={editAddress.state}
                      onChange={(e) => setEditAddress(prev => ({ ...prev, state: e.target.value }))}
                      className="w-full p-2 mt-1 text-lg border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400">CEP</label>
                    <input
                      type="text"
                      value={editAddress.zipCode}
                      onChange={(e) => setEditAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                      className="w-full p-2 mt-1 text-lg border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="mt-4 flex items-center space-x-2">
              {!isEditingAddress ? (
                <button
                  onClick={() => {
                    setEditAddress(user.address);
                    setIsEditingAddress(true);
                  }}
                  className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                >
                  <PencilIcon className="h-5 w-5 mr-2" />
                  Editar endereço
                </button>
              ) : (
                <>
                  <button
                    onClick={handleAddressSubmit}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => {
                      setEditAddress(user.address);
                      setIsEditingAddress(false);
                    }}
                    className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    Cancelar
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modais de Edição */}
      <EditModal
        isOpen={isEditingName}
        onClose={() => {
          setIsEditingName(false);
          setNewName('');
        }}
        title="Editar Nome"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            placeholder="Digite seu novo nome"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                setIsEditingName(false);
                setNewName('');
              }}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Cancelar
            </button>
            <button
              onClick={handleNameSubmit}
              disabled={!newName.trim()}
              className={`px-4 py-2 text-white rounded ${
                newName.trim() ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Salvar
            </button>
          </div>
        </div>
      </EditModal>

      <EditModal
        isOpen={isEditingEmail}
        onClose={() => {
          setIsEditingEmail(false);
          setNewEmail('');
          setConfirmEmail('');
        }}
        title="Editar Email"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Novo Email
            </label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              placeholder="Digite seu novo email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirmar Email
            </label>
            <input
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              placeholder="Confirme seu novo email"
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Um link de confirmação será enviado para seu email atual.
          </p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                setIsEditingEmail(false);
                setNewEmail('');
                setConfirmEmail('');
              }}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Cancelar
            </button>
            <button
              onClick={handleEmailSubmit}
              disabled={!newEmail || !confirmEmail || newEmail !== confirmEmail}
              className={`px-4 py-2 text-white rounded ${
                newEmail && confirmEmail && newEmail === confirmEmail
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Salvar
            </button>
          </div>
        </div>
      </EditModal>

      <EditModal
        isOpen={isEditingPhone}
        onClose={() => {
          setIsEditingPhone(false);
          setNewPhone('');
        }}
        title="Editar Telefone"
      >
        <div className="space-y-4">
          <input
            type="tel"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            placeholder="Digite seu novo telefone"
          />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Um código de confirmação será enviado para seu novo número.
          </p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                setIsEditingPhone(false);
                setNewPhone('');
              }}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Cancelar
            </button>
            <button
              onClick={handlePhoneSubmit}
              disabled={!newPhone.trim()}
              className={`px-4 py-2 text-white rounded ${
                newPhone.trim() ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Salvar
            </button>
          </div>
        </div>
      </EditModal>

      <EditModal
        isOpen={isEditingPassword}
        onClose={() => {
          setIsEditingPassword(false);
          setNewPassword('');
          setConfirmPassword('');
          setShowPassword(false);
        }}
        title="Editar Senha"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nova Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                placeholder="Digite sua nova senha"
              />
            </div>
          </div>

          {newPassword && (
            <div className="mt-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">Força da senha:</span>
                <span className={`text-sm font-medium ${
                  passwordStrength(newPassword) === 'forte' ? 'text-green-600 dark:text-green-400' :
                  passwordStrength(newPassword) === 'média' ? 'text-yellow-600 dark:text-yellow-400' :
                  'text-red-600 dark:text-red-400'
                }`}>
                  {passwordStrength(newPassword)}
                </span>
              </div>
              <div className="h-1 w-full bg-gray-200 dark:bg-gray-600 rounded-full mt-1">
                <div
                  className={`h-full transition-all rounded-full ${
                    passwordStrength(newPassword) === 'forte' ? 'w-full bg-green-500 dark:bg-green-400' :
                    passwordStrength(newPassword) === 'média' ? 'w-2/3 bg-yellow-500 dark:bg-yellow-400' :
                    'w-1/3 bg-red-500 dark:bg-red-400'
                  }`}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirmar Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                placeholder="Confirme sua nova senha"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              htmlFor="showPassword"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Mostrar senha
            </label>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                setIsEditingPassword(false);
                setNewPassword('');
                setConfirmPassword('');
                setShowPassword(false);
              }}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Cancelar
            </button>
            <button
              onClick={handlePasswordSubmit}
              disabled={!newPassword || !confirmPassword || newPassword !== confirmPassword || passwordStrength(newPassword) === 'fraca'}
              className={`px-4 py-2 text-white rounded ${
                newPassword && confirmPassword && newPassword === confirmPassword && passwordStrength(newPassword) !== 'fraca'
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Salvar
            </button>
          </div>
        </div>
      </EditModal>
    </div>
  );
}
