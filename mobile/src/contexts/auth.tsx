import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AsyncStorage } from 'react-native';

interface UserInterface {
  name: string;
  last_name: string;
  avatar: string;
  email: string;
}

export interface AuthContextInterface {
  signed: boolean;
  user: UserInterface | null;
  logIn(email: string, password: string, remember: boolean): Promise<void>;
  logOut(): void;
  updateUserInfo(name: string, last_name: string, avatar: string): Promise<boolean>;
  createNewUser(name: string, last_name: string, email: string, password: string): Promise<boolean>;
}

const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserInterface | null>(null);

  useEffect(() => {
    async function loadStorageData() {
      const storedUser = await getUserFromAsyncStorage()
      const storedToken = await AsyncStorage.getItem('@Proffys:token')

      if (storedUser && storedToken && !isTokenOutdated(storedToken)) {
        setUser(storedUser)
        api.defaults.headers['Authorization'] = `Bearer ${storedToken}`
      } else {
        await logOut()
      }

    }

    loadStorageData()
  }, []);

  function isTokenOutdated(token: string) {
    const tokenExpireDate = new Date(JSON.parse(atob(token.split('.')[1])).exp)
    if (tokenExpireDate > new Date()) {
      console.log('Token expirado')
      return true
    }
    return false;
  }


  async function getUserFromAsyncStorage(): Promise<UserInterface | null> {
    let userString = await AsyncStorage.getItem('@Proffys:user')
    return userString !== null ? JSON.parse(userString) : null
  }

  async function logIn(email: string, password: string, remember: boolean) {

    try {
      const response = await api.post('/login', {
        email,
        password
      });

      if (response.status === 200) {
        const { user, token } = response.data
        if (remember) {
          await AsyncStorage.setItem('@Proffys:user', JSON.stringify(user))
          await AsyncStorage.setItem('@Proffys:token', token)
        } else {
        }
        setUser(user);
        api.defaults.headers['Authorization'] = `Bearer ${token}`

      } else {
        alert(`error ${response.data.error}`)
      }

    } catch (error) {
      alert(error)
    }

  }

  async function logOut() {
    await AsyncStorage.removeItem('@Proffys:user');
    await AsyncStorage.removeItem('@Proffys:token');
    setUser(null);
    delete api.defaults.headers['Authorization']
  }

  async function updateUserInfo(name: string, last_name: string, avatar: string) {
    const response = await api.put('/update-user', {
      name,
      last_name,
      avatar
    })

    if (response.status === 204 && user) {
      setUser({ ...user, name, last_name, avatar })
      return true
    }
    return false
  }

  async function createNewUser(name: string, last_name: string, email: string, password: string) {
    try {
      const response = await api.post('register', {
        name,
        last_name,
        email,
        password
      })

      if (response.status === 201) {
        return true
      }
      console.log("RESPONSE ERROR:", JSON.stringify(response))
      return false
    } catch(err) {
      console.log('error', JSON.stringify(err))
      return false
    }
    
  }


  return (
    <AuthContext.Provider value={{ signed: !!user, user, logIn, logOut, updateUserInfo, createNewUser }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}