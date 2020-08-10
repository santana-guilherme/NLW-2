import React, { useEffect, useContext } from 'react';
import Login from '../Login'
import appContext from '../../AppContext';
import Home from '../Home';
import { Redirect } from 'react-router-dom';
import PrivateRoute from '../../components/PrivateRoute'

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