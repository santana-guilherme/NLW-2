import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../contexts/auth';

const RestrictedRoute: React.FC = ({ children }) => {
  const { signed } = useContext(AuthContext);
  if(!signed) {
    return (
      <div>
        {children}
      </div>
    );
  }
  return (
    <Redirect to='/'/>
  );
}

export default RestrictedRoute;