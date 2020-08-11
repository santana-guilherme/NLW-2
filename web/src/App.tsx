import React, { useState } from 'react';
import './assets/styles/globals.css'
import Routes from './routes'
import appContext, { AppStateInterface } from './AppContext'


function App() {
  const [appState, setAppState] = useState<AppStateInterface>({signed: true})
  return (
    <appContext.Provider value={{appState, setAppState}}>
      <Routes />
    </appContext.Provider>
  );
}

export default App;
