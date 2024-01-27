import React, { createContext, useContext, useState, ReactNode } from "react";

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
  user: UserData | null;
  login: (userData: UserData) => void;
  // logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  const login = (userData: UserData) => {
    setUser(userData);
  };
 // Remainder to me: I created this function so that it sets the user informmation to null after logging out or something like that
  // const logout = () => {
  //   setUser(null);
  // };

  return (
    <AuthContext.Provider value={{ user, login,  }}>
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
