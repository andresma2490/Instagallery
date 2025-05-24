import { createContext, useState, useEffect, useContext, useRef } from "react";

export interface LoginCredentials {
  username: string;
  password: string;
}

export type AuthContextType = {
  tokenRef: React.RefObject<string | null>;
  authToken: string | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const tokenRef = useRef<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const AUTH_TOKEN = "MyToken123";

  useEffect(() => {
    tokenRef.current = authToken;
  }, [authToken]);

  const login = ({ username, password }: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "admin" && password === "123456") {
          setAuthToken(AUTH_TOKEN);
          setIsLoading(false);
          resolve();
        } else {
          const errorMessage = "Invalid username or password.";
          setError(errorMessage);
          setAuthToken(null);
          setIsLoading(false);
          reject(new Error(errorMessage));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setAuthToken(null);
  };

  const value: AuthContextType = {
    authToken,
    tokenRef,
    isLoading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
