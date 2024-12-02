import { createContext, useContext, useState, ReactNode } from 'react';

interface Address {
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

interface User {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  address: Address;
}

interface UserContextType {
  user: User | null;
  updateName: (name: string) => Promise<boolean>;
  updateEmail: (email: string) => Promise<boolean>;
  updatePhone: (phone: string) => Promise<boolean>;
  updatePassword: (password: string) => Promise<boolean>;
  updateAddress: (field: keyof Address, value: string) => void;
  updateFullAddress: (address: Address) => Promise<boolean>;
}

const defaultUser: User = {
  name: 'Usuário Teste',
  email: 'usuario@teste.com',
  phone: '(11) 99999-9999',
  cpf: '123.456.789-00',
  address: {
    street: 'Rua Teste',
    number: '123',
    complement: 'Apto 1',
    neighborhood: 'Bairro Teste',
    city: 'Cidade Teste',
    state: 'SP',
    zipCode: '12345-678'
  }
};

export const UserContext = createContext<UserContextType>({
  user: defaultUser,
  updateName: async () => false,
  updateEmail: async () => false,
  updatePhone: async () => false,
  updatePassword: async () => false,
  updateAddress: () => {},
  updateFullAddress: async () => false,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);

  const updateName = async (newName: string) => {
    try {
      // Simulando uma chamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(prev => ({ ...prev, name: newName }));
      return true;
    } catch (error) {
      return false;
    }
  };

  const updateEmail = async (newEmail: string) => {
    try {
      // Simulando uma chamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(prev => ({ ...prev, email: newEmail }));
      return true;
    } catch (error) {
      return false;
    }
  };

  const updatePhone = async (newPhone: string) => {
    try {
      // Simulando uma chamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(prev => ({ ...prev, phone: newPhone }));
      return true;
    } catch (error) {
      return false;
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      // Simulando uma chamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      return false;
    }
  };

  const updateAddress = (field: keyof Address, value: string) => {
    setUser(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const updateFullAddress = async (newAddress: Address) => {
    try {
      // Simulando uma chamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(prev => ({ ...prev, address: newAddress }));
      return true;
    } catch (error) {
      return false;
    }
  };

  const value = {
    user,
    updateName,
    updateEmail,
    updatePhone,
    updatePassword,
    updateAddress,
    updateFullAddress,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
