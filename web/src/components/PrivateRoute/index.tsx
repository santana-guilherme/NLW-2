import React, { useContext } from 'react';
import {Route, Redirect } from 'react-router-dom';
import AuthContext from '../../contexts/auth';

const PrivateRoute = ({component, path, exact, ...rest}: any) => {
  const { signed } = useContext(AuthContext);
  return (
    <Route {...rest} exact={exact} path={path} render={ props => (
      signed
      ? React.createElement(component, props)
      : <Redirect to='/login'/>
    )}/>
  );
}

export default PrivateRoute;