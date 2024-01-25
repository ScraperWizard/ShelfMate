import React, { createContext, useContext, useState, ReactNode } from "react";

export default interface User {
  username: string;
  password: string;
  id: string;
  first_name: string;
  last_name: string;
  postal: string;
  email: string;
  telephone_number: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth should be inside  AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    username: "",
    password: "",
    id: "",
    first_name: "",
    last_name: "",
    postal: "",
    email: "",
    telephone_number: "",
  });

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const contextValue: AuthContextType = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
