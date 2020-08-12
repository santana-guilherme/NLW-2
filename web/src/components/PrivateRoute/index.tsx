import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

const PrivateRoute = ({ component, path, exact, ...rest }: any) => {
  const { signed } = useAuth();
  return (
    <Route {...rest} exact={exact} path={path} render={props => (
      signed
        ? React.createElement(component, props)
        : <Redirect to='/login' />
    )} />
  );
}

export default PrivateRoute;