import React, { createContext, useState } from 'react';
import api from '../services/api';

interface UserInterface {
  name: string;
  last_name: string;
  avatar: string;
  email: string;
  password: string;
}

export interface AuthContextInterface {
  signed: boolean;
  user: UserInterface | null;
  logIn(email: string, password: string): Promise<void>;
  logOut(): void;
}

const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

export const AuthProvider: React.FC = ({ children }) => {

  const [user, setUser] = useState<UserInterface | null>(getUserFromLocalStorage());


  function getUserFromLocalStorage(): UserInterface | null {
    let userString = localStorage.getItem('user')
    return userString !== null ? JSON.parse(userString): null
  }

  async function logIn(email: string, password: string) {
    const response = await api.post('/login', {
      email,
      password
    });

    if (response.status === 200) {
      const { user, token } = response.data
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user))
      api.defaults.headers['Authorization'] = `Bearer ${token}`

    } else {
      alert(`error ${response.data.error}`)
    }
  }

  function logOut() {
    setUser(null);
    localStorage.removeItem('user');
    delete api.defaults.headers['Authorization']
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}


export default AuthContext;