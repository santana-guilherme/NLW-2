import React from 'react'

interface UserInterface {
  name: string;
  last_name: string;
  avatar: string;
  email: string;
  password: string;
}

export interface AppStateInterface {
  signed: boolean;
  user?: UserInterface;
  token?: string;
}

interface ContextInterface {
  appState: AppStateInterface;
  setAppState: React.Dispatch<React.SetStateAction<AppStateInterface>>
}

const appContext = React.createContext<ContextInterface>({
  appState: {
    signed: false
  },
  setAppState: () => {}
})

export default appContext;