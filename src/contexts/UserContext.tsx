import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext'; // Assuming AuthContext is in a separate file

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
  birthDate: string;
  address: Address;
}

interface UserContextType {
  user: User | null;
  updateName: (name: string) => Promise<boolean>;
  updateEmail: (email: string) => Promise<boolean>;
  updatePhone: (phone: string) => Promise<boolean>;
  updatePassword: (password: string) => Promise<boolean>;
  updateFullAddress: (address: Address) => Promise<boolean>;
}

const defaultUser: User = {
  name: '',
  email: '',
  phone: '',
  cpf: '',
  birthDate: '',
  address: {
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: ''
  }
};

export const UserContext = createContext<UserContextType>({
  user: defaultUser,
  updateName: async () => false,
  updateEmail: async () => false,
  updatePhone: async () => false,
  updatePassword: async () => false,
  updateFullAddress: async () => false,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState<User>(() => {
    // Tenta carregar os dados do usuário do localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Verifica se os dados são válidos
        if (parsedUser && typeof parsedUser === 'object' && parsedUser.name !== undefined) {
          return parsedUser;
        }
      } catch (error) {
        console.error('Error parsing saved user:', error);
      }
    }
    return defaultUser;
  });

  useEffect(() => {
    if (authUser) {
      const updatedUser = {
        ...user, // Mantém os dados existentes
        ...authUser, // Sobrescreve com os dados do authUser
        address: {
          ...user.address, // Mantém os dados de endereço existentes
          ...(authUser.address || {}) // Sobrescreve com os dados de endereço do authUser
        }
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  }, [authUser]);

  const updateName = async (name: string) => {
    try {
      if (!name.trim()) {
        throw new Error('Nome não pode estar vazio');
      }
      const updatedUser = { ...user, name };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Error updating name:', error);
      return false;
    }
  };

  const updateEmail = async (email: string) => {
    try {
      if (!email.trim() || !email.includes('@')) {
        throw new Error('Email inválido');
      }
      const updatedUser = { ...user, email };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Error updating email:', error);
      return false;
    }
  };

  const updatePhone = async (phone: string) => {
    try {
      if (!phone.trim() || phone.length < 10) {
        throw new Error('Telefone inválido');
      }
      const updatedUser = { ...user, phone };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Error updating phone:', error);
      return false;
    }
  };

  const updatePassword = async (password: string) => {
    try {
      // Não salvamos a senha no localStorage por segurança
      // Aqui você deve implementar a chamada à API para atualizar a senha
      return true;
    } catch (error) {
      console.error('Error updating password:', error);
      return false;
    }
  };

  const updateFullAddress = async (address: Address) => {
    try {
      const updatedUser = { ...user, address };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Error updating address:', error);
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateName,
        updateEmail,
        updatePhone,
        updatePassword,
        updateFullAddress
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
