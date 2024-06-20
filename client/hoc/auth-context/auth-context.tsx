import { LoginResponse } from '@stock-esl-manager/api';
import { createContext } from 'react';

export interface AuthContextProps {
  isLoggedIn: boolean;
  isLoading: boolean;
  token: string;
  login: (loginResponse: LoginResponse) => void;
  logout: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AuthContext = createContext<AuthContextProps>(null!);
