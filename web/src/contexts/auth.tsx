import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

interface UserInterface {
  name: string;
  last_name: string;
  avatar: string;
  email: string;
}

export interface AuthContextInterface {
  signed: boolean;
  user: UserInterface | null;
  logIn(email: string, password: string): Promise<void>;
  logOut(): void;
  updateUserInfo(name: string, last_name: string, avatar: string): Promise<boolean>;
}

const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserInterface | null>(getUserFromLocalStorage());

  useEffect(() => {
    function loadStorageData() {
      const storedUser = getUserFromLocalStorage()
      const storedToken = localStorage.getItem('@Proffys:token')

      if (storedUser && storedToken && !isTokenOutdated(storedToken)) {
        setUser(storedUser)
        api.defaults.headers['Authorization'] = `Bearer ${storedToken}`
      } else {
        logOut()
      }

    }

    loadStorageData()
  }, []);

  function isTokenOutdated(token: string) {
    const tokenExpireDate = new Date(JSON.parse(atob(token.split('.')[1])).exp)
    if(tokenExpireDate > new Date()) {
      console.log('Token expirado')
      return true
    }
    return false;
  }


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

  async function updateUserInfo(name: string, last_name: string, avatar: string) {
    const response = await api.put('/update-user', {
      name,
      last_name,
      avatar
    })

    if(response.status === 204 && user) {
      setUser({...user, name, last_name, avatar})
      return true
    }
    return false
  }


  return (
    <AuthContext.Provider value={{ signed: !!user, user, logIn, logOut,  updateUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}