// In App.js in a new project

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Splash} from '@screens/index';
import StoreSelection from '@screens/StoreList';
import React from 'react';

import {APP_SCREEN} from './constant';
import {screenOptionsNativeStack} from './constant';
import AppStack from './Stack/AppStack';
import AuthStack from './Stack/AuthStack';

const Stack = createNativeStackNavigator();

export function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={screenOptionsNativeStack}
      initialRouteName={APP_SCREEN.Splash.name}>
      <Stack.Screen name={APP_SCREEN.Splash.name} component={Splash} />
      <Stack.Screen name={APP_SCREEN.AuthStack.name} component={AuthStack} />
      <Stack.Screen name={APP_SCREEN.AppStack.name} component={AppStack} />
      <Stack.Screen
        name={APP_SCREEN.StoreSelection.name}
        component={StoreSelection}
      />
    </Stack.Navigator>
  );
}
