import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RegisterName from '../pages/RegisterName';

const { Navigator, Screen } = createMaterialTopTabNavigator();

function RegisterTabs() {
  return (
    <Navigator>
      <Screen name='RegisterName' component={RegisterName}/>
    </Navigator>
  );
}

export default RegisterTabs;