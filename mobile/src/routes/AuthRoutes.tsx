import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const { Navigator, Screen } = createStackNavigator();
import Login from '../pages/Login';
import RegisterTabs from './RegisterTabs';
import SuccessRegistration from '../pages/SuccessRegistration';

function AuthRoutes() {
  return(
    <Navigator  screenOptions={{ headerShown: false }}>
      <Screen name='LogIn' component={Login}/>
      <Screen name='Register' component={RegisterTabs}/>
      <Screen name='SuccessRegistration' component={SuccessRegistration}/>
    </Navigator>
  )
}

export default AuthRoutes;