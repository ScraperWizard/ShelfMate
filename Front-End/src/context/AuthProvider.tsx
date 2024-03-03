import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextProps {
  accessToken: string | undefined;
  userType: string | undefined; 
  setAccessToken: (token: string | undefined) => void;
  setUserType: (type: string | undefined) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [userType, setUserType] = useState<string | undefined>(undefined); 

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedUserType = localStorage.getItem("userType");
    if (storedToken && storedUserType) {
      setAccessToken(storedToken);
      setUserType(storedUserType); 
    }
  }, []);

  const updateAccessToken = (token: string | undefined) => {
    if (token === undefined) {
      localStorage.removeItem("accessToken");
    } else {
      localStorage.setItem("accessToken", token);
    }
    setAccessToken(token);
  };

  const updateUserType = (type: string | undefined) => {
    if (type === undefined) {
      localStorage.removeItem("userType");
    } else {
      localStorage.setItem("userType", type);
    }
    setUserType(type);
  };

  return (
    <AuthContext.Provider value={{ accessToken, userType, setAccessToken: updateAccessToken, setUserType: updateUserType }}>
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
