import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/Home';
import ProfileScreen from '@screens/Profile';
import {AppText} from '@views/AppText';
import React from 'react';

import {APP_SCREEN} from '../constant';

const Tab = createBottomTabNavigator();

function TabBarIcon() {
  return <AppText variant="regular_12">Home</AppText>;
}

function BottomTabStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarIcon: TabBarIcon,
          title: 'Liberty test',
        }}
        name={APP_SCREEN.Home.name}
        component={HomeScreen}
      />
      <Tab.Screen name={APP_SCREEN.Profile.name} component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabStack;
