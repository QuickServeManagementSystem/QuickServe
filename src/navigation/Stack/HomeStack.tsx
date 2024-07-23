import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {memo, useCallback} from 'react';

import {HOME_STACK_SCREEN, AppScreenType} from '../constant';
import {navigationOptions} from '../Provider';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const renderStackScreen = useCallback(() => {
    return Object.keys(HOME_STACK_SCREEN)
      .filter(key => (HOME_STACK_SCREEN as AppScreenType)[key].component)
      .map((key: string, index: number) => (
        <Stack.Screen
          name={key}
          key={index.toString()}
          component={(HOME_STACK_SCREEN as AppScreenType)[key].component!}
        />
      ));
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={HOME_STACK_SCREEN.Home.name}
      screenOptions={navigationOptions as any}>
      {renderStackScreen()}
    </Stack.Navigator>
  );
};

export default memo(HomeStack);
