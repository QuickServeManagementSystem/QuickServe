// In App.js in a new project

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {APP_SCREEN} from './constant';
import {screenOptionsNativeStack} from './constant';
import AppStack from './Stack/AppStack';
import AuthStack from './Stack/AuthStack';
import {Splash} from '@screens/index';

const Stack = createNativeStackNavigator();

export function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={screenOptionsNativeStack}
      initialRouteName={APP_SCREEN.Splash.name}>
      <Stack.Screen name={APP_SCREEN.Splash.name} component={Splash} />
      <Stack.Screen name={APP_SCREEN.AuthStack.name} component={AuthStack} />
      <Stack.Screen name={APP_SCREEN.AppStack.name} component={AppStack} />
    </Stack.Navigator>
  );
}
