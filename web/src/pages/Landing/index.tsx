import React, { useEffect, useContext } from 'react';
import appContext from '../../AppContext';
import { Redirect } from 'react-router-dom';

function Landing() {

  useEffect(() => {
    console.log('AppState', appState)
  })
  const { appState } = useContext(appContext)
  
  if(appState.signed) {
    return <Redirect to='/home'/>
  }
  return <Redirect to='/login'/>
  
}

export default Landing;