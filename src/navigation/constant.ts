import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {Home, Profile, SignIn, SignUp, Splash, Welcome} from '@screens/index';
import {Platform} from 'react-native';

export const screenOptionsNativeStack: NativeStackNavigationOptions = {
  headerShown: false,
  customAnimationOnGesture: true,
  fullScreenGestureEnabled: true,
  gestureEnabled: true,
  animationTypeForReplace: 'push',
  animation: 'slide_from_right',
  presentation: Platform.OS === 'android' ? 'modal' : undefined,
};

export type AppScreenType = {
  [key in string]: {
    name: string;
    component?: React.ComponentType<any>;
  };
};

export const AUTH_APP_SCREEN = {
  Welcome: {
    name: 'Welcome',
    component: Welcome,
  },
  SignIn: {
    name: 'SignIn',
    component: SignIn,
  },
  SignUp: {
    name: 'SignUp',
    component: SignUp,
  },
} as const;

export const APP_SCREEN = {
  ...AUTH_APP_SCREEN,
  AuthStack: {
    name: 'AuthStack',
  },
  AppStack: {
    name: 'AppStack',
  },
  BottomStack: {
    name: 'BottomStack',
  },
  Home: {
    name: 'Home',
    component: Home,
  },
  Profile: {
    name: 'Profile',
    component: Profile,
  },
  Splash: {
    name: 'Splash',
    component: Splash,
  },
} as const;

export interface ScreenPropType {
  [APP_SCREEN.AuthStack.name]: undefined;
  [APP_SCREEN.AppStack.name]: {
    prop_1: string;
  };
  [APP_SCREEN.Welcome.name]: undefined;
  [APP_SCREEN.SignIn.name]: undefined;
  [APP_SCREEN.SignUp.name]: undefined;
  [APP_SCREEN.Profile.name]: {
    id: string;
  };
  [APP_SCREEN.Home.name]: undefined;
  [APP_SCREEN.Splash.name]: undefined;
}
