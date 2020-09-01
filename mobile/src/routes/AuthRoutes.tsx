import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const { Navigator, Screen } = createStackNavigator();
import Login from '../pages/Login';
import RegisterTabs from './RegisterTabs';

function AuthRoutes() {
  return(
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='LogIn' component={Login}/>
      <Screen name='Register' component={RegisterTabs}/>
    </Navigator>
  )
}

export default AuthRoutes;