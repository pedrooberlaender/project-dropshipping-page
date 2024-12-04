import { useState, useContext } from 'react';
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
  const [notificationType, setNotificationType] = useState('success');
  const [editingData, setEditingData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    password: ''
  });
  const [editAddress, setEditAddress] = useState(user.address);
  const [isAddressExpanded, setIsAddressExpanded] = useState(false);

  const handleDataSubmit = async () => {
    let success = false;
    
    if (editingData.name !== user.name) {
      success = await updateName(editingData.name);
    }
    if (editingData.email !== user.email) {
      success = await updateEmail(editingData.email);
    }
    if (editingData.phone !== user.phone) {
      success = await updatePhone(editingData.phone);
    }
    if (editingData.password !== '') {
      success = await updatePassword(editingData.password);
    }

    if (success) {
      setIsEditingData(false);
      setShowPassword(false);
      setShowNotification(true);
      setNotificationMessage('Dados atualizados com sucesso!');
      setNotificationType('success');
    }
  };

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
        setIsEditingData(false);
        setNewName('');
        setShowNotification(true);
        setNotificationMessage('Nome atualizado com sucesso!');
        setNotificationType('success');
      }
    }
  };

  const handleEmailSubmit = async () => {
    if (newEmail === confirmEmail && newEmail.trim()) {
      const success = await updateEmail(newEmail);
      if (success) {
        setIsEditingData(false);
        setNewEmail('');
        setConfirmEmail('');
        setShowNotification(true);
        setNotificationMessage('Email atualizado com sucesso!');
        setNotificationType('success');
      }
    } else {
      setShowNotification(true);
      setNotificationMessage('Os emails não correspondem!');
      setNotificationType('error');
    }
  };

  const handlePhoneSubmit = async () => {
    if (newPhone.trim()) {
      const success = await updatePhone(newPhone);
      if (success) {
        setIsEditingData(false);
        setNewPhone('');
        setShowNotification(true);
        setNotificationMessage('Telefone atualizado com sucesso!');
        setNotificationType('success');
      }
    }
  };

  const handlePasswordSubmit = async () => {
    if (newPassword === confirmPassword && newPassword.trim() && passwordStrength(newPassword) !== 'fraca') {
      const success = await updatePassword(newPassword);
      if (success) {
        setIsEditingData(false);
        setNewPassword('');
        setConfirmPassword('');
        setShowPassword(false);
        setShowNotification(true);
        setNotificationMessage('Senha atualizada com sucesso!');
        setNotificationType('success');
      }
    } else if (passwordStrength(newPassword) === 'fraca') {
      setShowNotification(true);
      setNotificationMessage('A senha é muito fraca!');
      setNotificationType('error');
    } else {
      setShowNotification(true);
      setNotificationMessage('As senhas não correspondem!');
      setNotificationType('error');
    }
  };

  const handleAddressSubmit = async () => {
    const success = await updateFullAddress(editAddress);
    if (success) {
      setIsEditingAddress(false);
      setShowNotification(true);
      setNotificationMessage('Endereço atualizado com sucesso!');
      setNotificationType('success');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Notification 
        isVisible={showNotification} 
        message={notificationMessage}
        type={notificationType}
        onClose={() => setShowNotification(false)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dados da Conta */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col min-h-[600px]">
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
                        value={editingData.name}
                        onChange={(e) => setEditingData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full p-2 mt-1 text-lg border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400">Email</label>
                      <input
                        type="email"
                        value={editingData.email}
                        onChange={(e) => setEditingData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full p-2 mt-1 text-lg border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400">Telefone</label>
                      <input
                        type="tel"
                        value={editingData.phone}
                        onChange={(e) => setEditingData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full p-2 mt-1 text-lg border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400">Nova Senha</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={editingData.password}
                          onChange={(e) => setEditingData(prev => ({ ...prev, password: e.target.value }))}
                          className="w-full p-2 mt-1 text-lg border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                          placeholder="Deixe em branco para manter a senha atual"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400">CPF</label>
                      <p className="text-lg text-gray-900 dark:text-gray-100">{user.cpf}</p>
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
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    password: ''
                  });
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
                      name: user.name,
                      email: user.email,
                      phone: user.phone,
                      password: ''
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col min-h-[600px]">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">Endereço Principal</h2>
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-4 h-full">
              {!isEditingAddress ? (
                <>
                  <div className="space-y-4">
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
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="mt-auto pt-4">
            {!isEditingAddress ? (
              <button
                onClick={() => setIsEditingAddress(true)}
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
                    setEditAddress(user.address);
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
