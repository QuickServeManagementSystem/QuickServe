import {NavigationContainerRef, StackActions} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import React from 'react';

import {ScreenPropType} from './constant';
export type NavigateTransitionType = <
  N extends keyof ScreenPropType,
  P extends Record<
    N,
    ScreenPropType[N] extends undefined ? undefined : ScreenPropType[N]
  >,
>(
  name: N,
  params?: P[N],
) => void;

export type NavigationType = NavigationContainerRef<ScreenPropType>;

export const navigationOptions: NativeStackNavigationOptions = {
  gestureDirection: 'horizontal',
  headerShown: false,
};

export interface NavigationInterface {
  navigateTo: NavigateTransitionType;
  push: NavigateTransitionType;
  replace: NavigateTransitionType;
  reset: NavigateTransitionType;
  pop: (count?: number) => void;
  goBack: () => void;
  getRef: () => ReturnType<typeof React.createRef<NavigationType>>;
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ScreenPropType {}
  }
}

export class NavigationProvider implements NavigationInterface {
  private _ref = React.createRef<NavigationType>();

  constructor() {
    this.getRef = this.getRef.bind(this);
    this.push = this.push.bind(this);
    this.navigateTo = this.navigateTo.bind(this);
    this.pop = this.pop.bind(this);
    this.push = this.push.bind(this);
    this.replace = this.replace.bind(this);
    this.reset = this.reset.bind(this);
  }

  getRef() {
    return this._ref;
  }

  push(name: string, params?: any) {
    this._ref.current?.dispatch(StackActions.push(name, params));
  }

  navigateTo<T>(name: any, params?: T) {
    this._ref.current?.navigate(name, params);
  }

  goBack() {
    this._ref.current?.goBack();
  }

  replace(name: string, params?: any) {
    this._ref.current?.dispatch(StackActions.replace(name, params));
  }

  pop(count?: number) {
    this._ref.current?.dispatch(StackActions.pop(count));
  }

  popToTop() {
    this._ref.current?.dispatch(StackActions.popToTop());
  }

  reset(stackName: string, params?: any) {
    this._ref.current?.reset({
      index: 0,
      routes: [{name: stackName, params}],
    });
  }
}

const Navigation = new NavigationProvider() as NavigationInterface;

export default Navigation;
