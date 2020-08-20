import React, { createContext, useState, useEffect, useContext } from 'react';
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

  useEffect(() => {
    function loadStorageData() {
      const storedUser = getUserFromLocalStorage()
      const storedToken = localStorage.getItem('@Proffys:token')

      if (storedUser && storedToken) {
        setUser(storedUser)
        api.defaults.headers['Authorization'] = `Bearer ${storedToken}`
      }
    }

    loadStorageData()
  }, []);


  function getUserFromLocalStorage(): UserInterface | null {
    let userString = localStorage.getItem('@Proffys:user')
    return userString !== null ? JSON.parse(userString) : null
  }

  async function logIn(email: string, password: string) {

    try {
      const response = await api.post('/login', {
        email,
        password
      });

      if (response.status === 200) {
        const { user, token } = response.data
        localStorage.setItem('@Proffys:user', JSON.stringify(user))
        localStorage.setItem('@Proffys:token', token)
        setUser(user);
        api.defaults.headers['Authorization'] = `Bearer ${token}`

      } else {
        alert(`error ${response.data.error}`)
      }

    } catch (error) {
      alert(error)
    }

  }

  function logOut() {
    localStorage.removeItem('@Proffys:user');
    localStorage.removeItem('@Proffys:token');
    setUser(null);
    delete api.defaults.headers['Authorization']
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}