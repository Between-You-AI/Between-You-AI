import { useBoolean } from '@chakra-ui/react';
import { LoginResponse } from '@stock-esl-manager/api';
import { FC, ReactNode, useEffect, useState } from 'react';
import { AuthContext, AuthContextProps } from './auth-context';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useBoolean(false);
  const [isLoading, setIsLoading] = useBoolean(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      setIsLoggedIn.on();
    }
  }, [setIsLoggedIn]);

  useEffect(() => {
    setIsLoading.off();
  }, [token]);

  const login = (loginResponse: LoginResponse) => {
    setToken(loginResponse.token);
    localStorage.setItem('token', loginResponse.token);
    setIsLoggedIn.on();
  };

  const logout = () => {
    setIsLoggedIn.off();
    localStorage.removeItem('token');
  };

  const value: AuthContextProps = {
    isLoggedIn,
    login,
    logout,
    token,
    isLoading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
