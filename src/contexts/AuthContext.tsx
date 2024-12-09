import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  cpf?: string;
  phone?: string;
  birthDate?: string;
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (formData: FormData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Verificar se há um usuário salvo no localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Validar se o usuário tem os campos necessários
        if (parsedUser && typeof parsedUser === 'object' && parsedUser.id && parsedUser.name && parsedUser.email) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem('user');
        }
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulação de login com dados completos
    const fakeUser: User = {
      id: '1',
      name: 'Thiago Velasco',
      email: email,
      cpf: '123.456.789-00',
      phone: '(11) 98765-4321',
      birthDate: '1990-01-01',
      address: {
        street: 'Rua das Flores',
        number: '123',
        complement: 'Apto 456',
        neighborhood: 'Jardim das Acácias',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567'
      }
    };
    
    setUser(fakeUser);
    localStorage.setItem('user', JSON.stringify(fakeUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (formData: FormData) => {
    try {
      // Create new user with all registration data
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: `${formData.get('firstName')} ${formData.get('lastName')}`,
        email: formData.get('email') as string,
        cpf: formData.get('cpf') as string,
        phone: formData.get('phone') as string,
        birthDate: formData.get('birthDate') as string,
        address: {
          street: formData.get('street') as string,
          number: formData.get('number') as string,
          complement: formData.get('complement') as string || '',
          neighborhood: formData.get('neighborhood') as string,
          city: formData.get('city') as string,
          state: formData.get('state') as string,
          zipCode: formData.get('zipCode') as string
        }
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
