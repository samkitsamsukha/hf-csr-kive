import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback((userData) => {
    setUser(userData);
    setError(null);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateUserEvents = useCallback((event) => {
    if (user) {
      setUser((prevUser) => ({
        ...prevUser,
        events: [...prevUser.events, event]
      }));
    }
  }, [user]);

  const value = {
    user,
    isLoading,
    error,
    login,
    logout,
    updateUserEvents
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}