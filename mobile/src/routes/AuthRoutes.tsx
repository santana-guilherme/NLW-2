import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const { Navigator, Screen } = createStackNavigator();
import Login from '../pages/Login';
import RegisterTabs from './RegisterTabs';
import SuccessRegistration from '../pages/SuccessRegistration';
import ForgotPassword from '../pages/ForgotPassword';
import SuccessForgotPassword from '../pages/SuccessForgotPassword';

function AuthRoutes() {
  return(
    <Navigator  screenOptions={{ headerShown: false }}>
      <Screen name='LogIn' component={Login}/>
      <Screen name='Register' component={RegisterTabs}/>
      <Screen name='SuccessRegistration' component={SuccessRegistration}/>
      <Screen name='ForgotPassword' component={ForgotPassword}/>
      <Screen name='SuccessForgotPassword' component={SuccessForgotPassword}/>
    </Navigator>
  )
}

export default AuthRoutes;