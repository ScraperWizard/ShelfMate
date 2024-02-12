import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextProps {
  accessToken: string | undefined;
  setAccessToken: (token: string | undefined) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setAccessToken(storedToken);
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

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken: updateAccessToken }}>
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
