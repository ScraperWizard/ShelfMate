// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface UserData {
  username: string;
  password: string;
  id: string;
  first_name: string;
  last_name: string;
  postal: string;
  email: string;
  telephone_number: string;
}

interface AuthContextProps {
  user: UserData | undefined;
  setUser: (userData: UserData | undefined) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | undefined>(undefined);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const parsedData: UserData = JSON.parse(storedData);
      setUser(parsedData);
    }
  }, []);

  const updateUser = (userData: UserData | undefined) => {
    if (userData === undefined) {
      localStorage.removeItem("userData");
    } else {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
