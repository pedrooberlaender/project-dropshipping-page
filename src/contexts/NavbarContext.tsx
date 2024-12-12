import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavbarContextType {
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

interface NavbarProviderProps {
  children: ReactNode;
}

export const NavbarProvider = ({ children }: NavbarProviderProps) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <NavbarContext.Provider value={{ showLoginModal, setShowLoginModal }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
};
