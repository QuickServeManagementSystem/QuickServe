import {navigationOptions} from '@navigation/Provider';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppIcon from '@views/AppIcon';
import React, {useCallback} from 'react';
import {Platform} from 'react-native';
import styled, {useTheme} from 'styled-components/native';

import {AppScreenType, BOTTOM_TAB_SCREEN} from '../constant';

const heightBottomTab = Platform.OS === 'ios' ? 64 : 60;

const Tab = createBottomTabNavigator();
function BottomTabStack() {
  const appTheme = useTheme();

  const renderTabIcon = (
    color: string,
    focused: boolean,
    size: number,
    key: string,
  ): React.ReactNode | undefined => {
    switch (key) {
      case BOTTOM_TAB_SCREEN.HomeStack.name:
        return (
          <WrapIcon>
            <AppIcon
              name="ic_category"
              fill={color}
              width={size}
              height={size}
            />
          </WrapIcon>
        );
      case BOTTOM_TAB_SCREEN.Order.name:
        return (
          <WrapIcon>
            <AppIcon name="ic_card" fill={color} width={size} height={size} />
          </WrapIcon>
        );
      case BOTTOM_TAB_SCREEN.Setting.name:
        return (
          <WrapIcon>
            <AppIcon
              name="ic_setting_fill"
              fill={color}
              width={size}
              height={size}
            />
          </WrapIcon>
        );

      default:
        break;
    }
  };

  const renderStackScreen = useCallback(() => {
    return Object.keys(BOTTOM_TAB_SCREEN)
      .filter(key => (BOTTOM_TAB_SCREEN as AppScreenType)[key].component)
      .map((key: string, index: number) => (
        <Tab.Screen
          name={key}
          key={index.toString()}
          component={(BOTTOM_TAB_SCREEN as AppScreenType)[key].component!}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({color, focused, size}) =>
              renderTabIcon(color, focused, size, key),
          }}
        />
      ));
  }, []);

  return (
    <Tab.Navigator
      screenOptions={
        {
          ...navigationOptions,
          tabBarActiveTintColor: appTheme.colors.white,
          tabBarInactiveTintColor: appTheme.colors.icon_primary,
          tabBarStyle: {
            height: heightBottomTab,
            position: 'absolute',
            bottom: appTheme.gap_25,
            paddingBottom: appTheme.gap_0,
            borderRadius: appTheme.border_radius_55,
            marginHorizontal: appTheme.gap_16,
            backgroundColor: appTheme.colors.tertiary,
            elevation: appTheme.gap_2,
            shadowColor: '#000',
            borderTopWidth: appTheme.gap_0,
            shadowOpacity: 0.45,
            shadowRadius: appTheme.gap_2,
            shadowOffset: {
              width: appTheme.gap_2,
              height: appTheme.gap_2,
            },
          },
        } as any
      }
      initialRouteName={BOTTOM_TAB_SCREEN.HomeStack.name}>
      {renderStackScreen()}
    </Tab.Navigator>
  );
}

const WrapIcon = styled.View``;
export default BottomTabStack;
