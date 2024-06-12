import {navigationOptions} from '@navigation/Provider';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {memo, useCallback} from 'react';

import {APP_SCREEN, AppScreenType} from '../constant';

import BottomTabStack from './BottomStack';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const renderStackScreen = useCallback(() => {
    return Object.keys(APP_SCREEN)
      .filter(key => (APP_SCREEN as AppScreenType)[key].component)
      .map((key: string, index: number) => (
        <Stack.Screen
          name={key}
          key={index.toString()}
          component={(APP_SCREEN as AppScreenType)[key].component!}
        />
      ));
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={APP_SCREEN.Home.name}
      screenOptions={navigationOptions as any}>
      <Stack.Screen
        name={APP_SCREEN.BottomStack.name}
        component={BottomTabStack}
      />
      {renderStackScreen()}
    </Stack.Navigator>
  );
};

export default memo(AppStack);
