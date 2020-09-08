import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import StudyTabs from './StudyTabs';
import Profile from '../pages/Profile';
import TeacherForm from '../pages/TeacherForm';
import SuccessTeacherRegistration from '../pages/SuccessTeacherRegistration';

const { Navigator, Screen } = createStackNavigator();

function AppStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Landing" component={Landing} />
      <Screen name="GiveClasses" component={TeacherForm} />
      <Screen name="SuccessTeacherRegistration" component={SuccessTeacherRegistration} />
      <Screen name="Study" component={StudyTabs} />
      <Screen name="Profile" component={Profile} />
    </Navigator>
  );
}

export default AppStack;