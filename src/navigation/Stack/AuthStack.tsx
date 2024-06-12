import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {memo, useCallback} from 'react';

import {AUTH_APP_SCREEN, AppScreenType} from '../constant';
import {navigationOptions} from '../Provider';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const renderStackScreen = useCallback(() => {
    return Object.keys(AUTH_APP_SCREEN)
      .filter(key => (AUTH_APP_SCREEN as AppScreenType)[key].component)
      .map((key: string, index: number) => (
        <Stack.Screen
          name={key}
          key={index.toString()}
          component={(AUTH_APP_SCREEN as AppScreenType)[key].component!}
        />
      ));
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={AUTH_APP_SCREEN.Welcome.name}
      screenOptions={navigationOptions as any}>
      {renderStackScreen()}
    </Stack.Navigator>
  );
};

export default memo(AuthStack);
