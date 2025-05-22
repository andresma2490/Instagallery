import { createContext, useState, useEffect, useContext } from "react";

interface LoginCredentials {
  username: string;
  password: string;
}

type AuthContextType = {
  authToken: string | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const AUTH_TOKEN = "MyToken123";
  const AUTH_TOKEN_KEY = "authorizationToken";

  useEffect(() => {
    const initializeAuthToken = () => {
      const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
      setAuthToken(storedToken);
      setIsLoading(false);
    };
    initializeAuthToken();
  }, []);

  const login = ({ username, password }: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "admin" && password === "123456") {
          localStorage.setItem(AUTH_TOKEN_KEY, AUTH_TOKEN);
          setAuthToken(AUTH_TOKEN);
          setIsLoading(false);
          resolve();
        } else {
          const errorMessage = "Invalid username or password.";
          setError(errorMessage);
          setAuthToken(null);
          localStorage.removeItem(AUTH_TOKEN_KEY);
          setIsLoading(false);
          reject(new Error(errorMessage));
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setAuthToken(null);
  };

  const value: AuthContextType = {
    authToken,
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
