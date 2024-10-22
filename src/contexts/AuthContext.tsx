import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";
import { User } from "../models/user";

// Auth context type
interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

// Default context value
export const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
  loading: true,
  error: null,
});

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkUserLoggedIn();
  }, [token]);

  const checkUserLoggedIn = useCallback(async () => {
    if (token) {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/users/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error checking user login status:", error);
        logout(); // Auto logout if token check fails
        setError("Failed to authenticate. Please log in again.");
      }
    }
    setLoading(false);
  }, [token]);

  const login = useCallback((userData: User, newToken: string) => {
    setUser(userData);
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  }, []);

  // Memoize the context value to avoid unnecessary re-renders
  const authContextValue = useMemo(
    () => ({
      token,
      user,
      login,
      logout,
      loading,
      error,
    }),
    [token, user, loading, error, login, logout]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {loading ? (
        <div>Loading...</div> // You can replace this with a loading spinner component
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
