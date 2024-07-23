import {AppRootState, useAppDispatch, useAppSelector} from '@app-core/state';
import {AUTH_APP_SCREEN} from '@navigation/constant';
import Navigation from '@navigation/Provider';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import {useEffect} from 'react';

import {TypeAPIRequest, TypeAPIRespone} from './useAPIList';
const dummyOb = {};
//MARK: - Single
//Use this function when you want to get only one data not list or array
export function useAutoExecutesSingle<
  T1 extends TypeAPIRespone,
  P1 extends TypeAPIRequest,
>(props1: {
  action: ActionCreatorWithPayload<P1, string>;
  selector: (state: AppRootState) => T1;
  payload?: P1;
}): [T1];

export function useAutoExecutesSingle<
  T1 extends TypeAPIRespone,
  P1 extends TypeAPIRequest,
  T2 extends TypeAPIRespone,
  P2 extends TypeAPIRequest,
>(
  props1: {
    action: ActionCreatorWithPayload<P1, string>;
    selector: (state: AppRootState) => T1;
    payload?: P1;
  },
  props2?: {
    action: ActionCreatorWithPayload<P2, string>;
    selector: (state: AppRootState) => T2;
    payload?: P2;
  },
): [T1, T2];

export function useAutoExecutesSingle<
  T1 extends TypeAPIRespone,
  P1 extends TypeAPIRequest,
  T2 extends TypeAPIRespone,
  P2 extends TypeAPIRequest,
  T3 extends TypeAPIRespone,
  P3 extends TypeAPIRequest,
>(
  props1: {
    action: ActionCreatorWithPayload<P1, string>;
    selector: (state: AppRootState) => T1;
    payload?: P1;
  },
  props2?: {
    action: ActionCreatorWithPayload<P2, string>;
    selector: (state: AppRootState) => T2;
    payload?: P2;
  },
  props3?: {
    action: ActionCreatorWithPayload<P3, string>;
    selector: (state: AppRootState) => T3;
    payload?: P3;
  },
): [T1, T2, T3];

export function useAutoExecutesSingle<
  T1 extends TypeAPIRespone,
  P1 extends TypeAPIRequest,
  T2 extends TypeAPIRespone,
  P2 extends TypeAPIRequest,
  T3 extends TypeAPIRespone,
  P3 extends TypeAPIRequest,
  T4 extends TypeAPIRespone,
  P4 extends TypeAPIRequest,
>(
  props1: {
    action: ActionCreatorWithPayload<P1, string>;
    selector: (state: AppRootState) => T1;
    payload?: P1;
  },
  props2?: {
    action: ActionCreatorWithPayload<P2, string>;
    selector: (state: AppRootState) => T2;
    payload?: P2;
  },
  props3?: {
    action: ActionCreatorWithPayload<P3, string>;
    selector: (state: AppRootState) => T3;
    payload?: P3;
  },
  props4?: {
    action: ActionCreatorWithPayload<P4, string>;
    selector: (state: AppRootState) => T4;
    payload?: P4;
  },
): [data: T1, data: T2, data: T3, data: T4];

export function useAutoExecutesSingle<
  T1 extends TypeAPIRespone,
  P1 extends TypeAPIRequest,
  T2 extends TypeAPIRespone,
  P2 extends TypeAPIRequest,
  T3 extends TypeAPIRespone,
  P3 extends TypeAPIRequest,
  T4 extends TypeAPIRespone,
  P4 extends TypeAPIRequest,
>(
  props1: {
    action: ActionCreatorWithPayload<P1, string>;
    selector: (state: AppRootState) => T1;
    payload?: P1;
  },
  props2?: {
    action: ActionCreatorWithPayload<P2, string>;
    selector: (state: AppRootState) => T2;
    payload?: P2;
  },
  props3?: {
    action: ActionCreatorWithPayload<P3, string>;
    selector: (state: AppRootState) => T3;
    payload?: P3;
  },
  props4?: {
    action: ActionCreatorWithPayload<P4, string>;
    selector: (state: AppRootState) => T4;
    payload?: P4;
  },
) {
  const dispatch = useAppDispatch();
  const dummySelector = () => dummyOb as any;
  const dataSelector1: T1 = useAppSelector(props1.selector);
  const dataSelector2: T2 = useAppSelector(props2?.selector ?? dummySelector);
  const dataSelector3: T3 = useAppSelector(props3?.selector ?? dummySelector);
  const dataSelector4: T4 = useAppSelector(props4?.selector ?? dummySelector);
  const currentRoute = Navigation.getRef().current?.getCurrentRoute()?.name;
  useEffect(() => {
    if (
      currentRoute &&
      currentRoute !== AUTH_APP_SCREEN.Welcome.name &&
      currentRoute !== AUTH_APP_SCREEN.SignIn.name &&
      currentRoute !== AUTH_APP_SCREEN.SignUp.name
    ) {
      const interval = setInterval(() => {
        dispatch(props1.action(props1.payload as P1));
        props2 && dispatch(props2.action(props2.payload as P2));
        props3 && dispatch(props3.action(props3.payload as P3));
        props4 && dispatch(props4.action(props4.payload as P4));
      }, 5000);
      return () => {
        clearInterval(interval); // Clear the interval to prevent memory leaks
      };
    }
  }, [dispatch, currentRoute, props1, props2, props3, props4]);
  return [dataSelector1, dataSelector2, dataSelector3, dataSelector4];
}
