import React from 'react';
import { useAuth } from '../contexts/auth';
import AppStack from './AppStack';
import AuthRoutes from './AuthRoutes';
import { NavigationContainer, NavigationContext } from '@react-navigation/native';

function Routes() {
  const { signed } = useAuth()
  return (
    <NavigationContainer>
      {signed? <AppStack/>: <AuthRoutes/>}
    </NavigationContainer>
  );
}

export default Routes;