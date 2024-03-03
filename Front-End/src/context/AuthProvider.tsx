import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextProps {
  accessToken: string | undefined;
  userType: string | undefined;
  username: string | undefined;
  setAccessToken: (token: string | undefined) => void;
  setUserType: (type: string | undefined) => void;
  setUsername: (username: string | undefined) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [userType, setUserType] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedUserType = localStorage.getItem("userType");
    const storedUsername = localStorage.getItem("username");
    if (storedToken && storedUserType && storedUsername) {
      setAccessToken(storedToken);
      setUserType(storedUserType);
      setUsername(storedUsername); 
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

  const updateUsername = (username: string | undefined) => {
    if (username === undefined) {
      localStorage.removeItem("username");
    } else {
      localStorage.setItem("username", username);
    }
    setUsername(username);
  };

  return (
    <AuthContext.Provider value={{ accessToken, userType, username, setAccessToken: updateAccessToken, setUserType: updateUserType, setUsername: updateUsername }}>
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
