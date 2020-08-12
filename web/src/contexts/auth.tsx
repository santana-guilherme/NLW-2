import React, { createContext, useState } from 'react';
import api from '../services/api';

export interface AuthContextInterface {
  signed: boolean;
  user: object | null;
  signIn(email: string, password: string): Promise<void>;
  logOut(): void;
}

const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

export const AuthProvider: React.FC = ({ children }) => {
  let userString = localStorage.getItem('user')
  let userObject = userString !== null ? JSON.parse(userString): null

  const [user, setUser] = useState<object | null>(userObject);
  const [token, setToken] = useState('');

  async function signIn(email: string, password: string) {
    const response = await api.post('/login', {
      email,
      password
    });

    const { user, token } = response.data

    if (response.status === 200) {
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user))
      setToken(response.data.token);
    } else {
      alert(`error ${response.data.error}`)
    }
  }

  function logOut() {
    setUser(null);
    localStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}


export default AuthContext;