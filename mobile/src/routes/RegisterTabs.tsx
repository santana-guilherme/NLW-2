import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RegisterName from '../pages/RegisterName';
import RegistrationHeader from '../components/RegistrationHeader';
import RegisterEmail from '../pages/RegisterEmail';
import SuccessRegistration from '../pages/SuccessRegistration';

const { Navigator, Screen } = createMaterialTopTabNavigator();

function RegisterTabs() {
  return (
    <Navigator
      tabBar={props => <RegistrationHeader {...props}/>}
      swipeEnabled={false}
      tabBarOptions={{

      }}
    >
      <Screen
        name='RegisterName'
        component={RegisterName}
      />
      <Screen
        name='RegisterEmail'
        component={RegisterEmail}
      />
    </Navigator>
  );
}

export default RegisterTabs;