import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface OrderProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

export interface Order {
  id: string;
  userId: string;
  products: OrderProduct[];
  total: number;
  status: 'Aguardando pagamento' | 'Pagamento aprovado' | 'Em preparação' | 'Em trânsito' | 'Entregue';
  trackingCode: string;
  createdAt: string;
  paymentMethod: 'credit' | 'debit' | 'pix' | 'boleto';
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'trackingCode' | 'status'>) => void;
  getOrders: () => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useAuth();

  // Carregar pedidos do localStorage ao iniciar ou quando o usuário mudar
  useEffect(() => {
    if (user) {
      const storedOrders = localStorage.getItem(`orders_${user.id}`);
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      } else {
        // Se não houver pedidos salvos para este usuário, limpa os pedidos
        setOrders([]);
      }
    } else {
      // Se não houver usuário logado, limpa os pedidos
      setOrders([]);
    }
  }, [user]);

  // Salvar pedidos no localStorage quando houver alterações
  useEffect(() => {
    if (user) {
      localStorage.setItem(`orders_${user.id}`, JSON.stringify(orders));
    }
  }, [orders, user]);

  const generateTrackingCode = () => {
    const prefix = 'BR';
    const numbers = Math.random().toString().slice(2, 12);
    return `${prefix}${numbers}`;
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'trackingCode' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      trackingCode: generateTrackingCode(),
      status: 'Aguardando pagamento',
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);
  };

  const getOrders = () => {
    return orders;
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
