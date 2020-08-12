import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

const RestrictedRoute: React.FC = ({ children }) => {
  const { signed } = useAuth();
  if (!signed) {
    return (
      <div>
        {children}
      </div>
    );
  }
  return (
    <Redirect to='/' />
  );
}

export default RestrictedRoute;