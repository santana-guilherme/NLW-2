import React, { useContext } from 'react';
import {Route, Redirect } from 'react-router-dom';
import appContext from '../../AppContext';

const PrivateRoute = ({component, path, exact, ...rest}: any) => {
  const { appState } = useContext(appContext);
  return (
    <Route {...rest} exact={exact} path={path} render={ props => (
      appState.signed
      ? React.createElement(component, props)
      : <Redirect to='/login'/>
    )}/>
  );
}

export default PrivateRoute;