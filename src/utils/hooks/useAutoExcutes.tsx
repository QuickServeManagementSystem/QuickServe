import {AppRootState, useAppDispatch, useAppSelector} from '@app-core/state';
import {AUTH_APP_SCREEN} from '@navigation/constant';
import Navigation from '@navigation/Provider';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import {isNull} from '@utils/common';
import {useEffect} from 'react';
import React from 'react';

import {TypeAPIList, TypeAPIRequest, TypeAPIRespone} from './useAPIList';
const dummyOb = {};
export function useAutoExecutes<
  T1 extends TypeAPIRespone,
  P1 extends TypeAPIRequest,
>(props1: {
  action: ActionCreatorWithPayload<P1, string>;
  selector: (state: AppRootState) => TypeAPIList<T1>;
  minute_ms?: number;
  payload?: P1;
}): [
  {
    totalCount: number;
    data: T1[];
    isFirstLoad: boolean;
  },
];

export function useAutoExecutes<
  T1 extends TypeAPIRespone,
  P1 extends TypeAPIRequest,
  T2 extends TypeAPIRespone,
  P2 extends TypeAPIRequest,
>(
  props1: {
    action: ActionCreatorWithPayload<P1, string>;
    selector: (state: AppRootState) => TypeAPIList<T1>;
    minute_ms?: number;
    payload?: P1;
  },
  props2?: {
    action: ActionCreatorWithPayload<P2, string>;
    selector: (state: AppRootState) => TypeAPIList<T2>;
    minute_ms?: number;
    payload?: P2;
  },
): [
  {
    totalCount: number;
    mobileTotalCount?: number;
    data: T1[];
    isFirstLoad: boolean;
  },
  {
    totalCount: number;
    mobileTotalCount?: number;
    data: T2[];
    isFirstLoad: boolean;
  },
];

export function useAutoExecutes<
  T1 extends TypeAPIRespone,
  P1 extends TypeAPIRequest,
  T2 extends TypeAPIRespone,
  P2 extends TypeAPIRequest,
  T3 extends TypeAPIRespone,
  P3 extends TypeAPIRequest,
>(
  props1: {
    action: ActionCreatorWithPayload<P1, string>;
    selector: (state: AppRootState) => TypeAPIList<T1>;
    minute_ms?: number;
    payload?: P1;
  },
  props2?: {
    action: ActionCreatorWithPayload<P2, string>;
    selector: (state: AppRootState) => TypeAPIList<T2>;
    minute_ms?: number;
    payload?: P2;
  },
  props3?: {
    action: ActionCreatorWithPayload<P3, string>;
    selector: (state: AppRootState) => TypeAPIList<T3>;
    minute_ms?: number;
    payload?: P3;
  },
): [
  {
    totalCount: number;
    mobileTotalCount?: number;
    data: T1[];
    isFirstLoad: boolean;
  },
  {
    totalCount: number;
    mobileTotalCount?: number;
    data: T2[];
    isFirstLoad: boolean;
  },
  {
    totalCount: number;
    mobileTotalCount?: number;
    data: T3[];
    isFirstLoad: boolean;
  },
];

export function useAutoExecutes<
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
    selector: (state: AppRootState) => TypeAPIList<T1>;
    minute_ms?: number;
    payload?: P1;
  },
  props2?: {
    action: ActionCreatorWithPayload<P2, string>;
    selector: (state: AppRootState) => TypeAPIList<T2>;
    minute_ms?: number;
    payload?: P2;
  },
  props3?: {
    action: ActionCreatorWithPayload<P3, string>;
    selector: (state: AppRootState) => TypeAPIList<T3>;
    minute_ms?: number;
    payload?: P3;
  },
  props4?: {
    action: ActionCreatorWithPayload<P4, string>;
    selector: (state: AppRootState) => TypeAPIList<T4>;
    minute_ms?: number;
    payload?: P4;
  },
): [
  {
    totalCount: number;
    mobileTotalCount?: number;
    data: T1[];
    isFirstLoad: boolean;
  },
  {
    totalCount: number;
    mobileTotalCount?: number;
    data: T2[];
    isFirstLoad: boolean;
  },
  {
    totalCount: number;
    mobileTotalCount?: number;
    data: T3[];
    isFirstLoad: boolean;
  },
  {
    totalCount: number;
    mobileTotalCount?: number;
    data: T4[];
    isFirstLoad: boolean;
  },
];

export function useAutoExecutes<
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
    selector: (state: AppRootState) => TypeAPIList<T1>;
    minute_ms?: number;
    payload?: P1;
  },
  props2?: {
    action: ActionCreatorWithPayload<P2, string>;
    selector: (state: AppRootState) => TypeAPIList<T2>;
    minute_ms?: number;
    payload?: P2;
  },
  props3?: {
    action: ActionCreatorWithPayload<P3, string>;
    selector: (state: AppRootState) => TypeAPIList<T3>;
    minute_ms?: number;
    payload?: P3;
  },
  props4?: {
    action: ActionCreatorWithPayload<P4, string>;
    selector: (state: AppRootState) => TypeAPIList<T4>;
    minute_ms?: number;
    payload?: P4;
  },
) {
  const dispatch = useAppDispatch();
  const dummySelector = () => dummyOb as any;
  const dataSelector1: TypeAPIList<T1> = useAppSelector(props1.selector);
  const dataSelector2: TypeAPIList<T2> = useAppSelector(
    props2?.selector ?? dummySelector,
  );
  const dataSelector3: TypeAPIList<T3> = useAppSelector(
    props3?.selector ?? dummySelector,
  );
  const dataSelector4: TypeAPIList<T4> = useAppSelector(
    props4?.selector ?? dummySelector,
  );
  const [isFirstLoad1, setIsFirstLoad1] = React.useState(true);
  const [isFirstLoad2, setIsFirstLoad2] = React.useState(true);
  const [isFirstLoad3, setIsFirstLoad3] = React.useState(true);
  const [isFirstLoad4, setIsFirstLoad4] = React.useState(true);

  const currentRoute = Navigation.getRef().current?.getCurrentRoute()?.name;
  //set isFirstLoad to false when dataSelector1.sort is not null
  useEffect(() => {
    if (isFirstLoad1 && !isNull(dataSelector1.sort)) {
      setIsFirstLoad1(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSelector1]);
  useEffect(() => {
    if (isFirstLoad2 && !isNull(dataSelector2.sort)) {
      setIsFirstLoad2(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSelector2]);
  useEffect(() => {
    if (isFirstLoad3 && !isNull(dataSelector3.sort)) {
      setIsFirstLoad3(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSelector3]);
  useEffect(() => {
    if (isFirstLoad4 && !isNull(dataSelector4.sort)) {
      setIsFirstLoad4(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSelector4.sort]);
  useEffect(() => {
    if (
      currentRoute &&
      currentRoute !== AUTH_APP_SCREEN.Welcome.name &&
      currentRoute !== AUTH_APP_SCREEN.SignUp.name &&
      currentRoute !== AUTH_APP_SCREEN.SignIn.name
    ) {
      const interval = setInterval(() => {
        dispatch(props1.action(props1.payload as P1));
        props2 && dispatch(props2.action(props2.payload as P2));
        props3 && dispatch(props3.action(props3.payload as P3));
        props4 && dispatch(props4.action(props4.payload as P4));
      }, props1.minute_ms ?? 5000);
      return () => {
        clearInterval(interval); // Clear the interval to prevent memory leaks
      };
    }
  }, [dispatch, currentRoute, props1, props2, props3, props4]);
  return [
    {
      data: dataSelector1.data,
      totalCount: dataSelector1.totalItems,
      isFirstLoad: isFirstLoad1,
    },
    {
      data: dataSelector2.data,
      totalCount: dataSelector2.totalItems,
      isFirstLoad: isFirstLoad2,
    },
    {
      data: dataSelector3.data,
      totalCount: dataSelector3.totalItems,
      isFirstLoad: isFirstLoad3,
    },
    {
      data: dataSelector4.data,
      totalCount: dataSelector4.totalItems,
      isFirstLoad: isFirstLoad4,
    },
  ];
}
//MARK: - Single
//Use this function when you want to get only one data not list or array
export function useAutoExecutesSingle<
  T1 extends TypeAPIRespone,
  P1 extends TypeAPIRequest,
>(props1: {
  action: ActionCreatorWithPayload<P1, string>;
  selector: (state: AppRootState) => T1;
  minute_ms?: number;
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
    minute_ms?: number;
    payload?: P1;
  },
  props2?: {
    action: ActionCreatorWithPayload<P2, string>;
    selector: (state: AppRootState) => T2;
    minute_ms?: number;
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
    minute_ms?: number;
    payload?: P1;
  },
  props2?: {
    action: ActionCreatorWithPayload<P2, string>;
    selector: (state: AppRootState) => T2;
    minute_ms?: number;
    payload?: P2;
  },
  props3?: {
    action: ActionCreatorWithPayload<P3, string>;
    selector: (state: AppRootState) => T3;
    minute_ms?: number;
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
    minute_ms?: number;
    payload?: P1;
  },
  props2?: {
    action: ActionCreatorWithPayload<P2, string>;
    selector: (state: AppRootState) => T2;
    minute_ms?: number;
    payload?: P2;
  },
  props3?: {
    action: ActionCreatorWithPayload<P3, string>;
    selector: (state: AppRootState) => T3;
    minute_ms?: number;
    payload?: P3;
  },
  props4?: {
    action: ActionCreatorWithPayload<P4, string>;
    selector: (state: AppRootState) => T4;
    minute_ms?: number;
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
    minute_ms?: number;
    payload?: P1;
  },
  props2?: {
    action: ActionCreatorWithPayload<P2, string>;
    selector: (state: AppRootState) => T2;
    minute_ms?: number;
    payload?: P2;
  },
  props3?: {
    action: ActionCreatorWithPayload<P3, string>;
    selector: (state: AppRootState) => T3;
    minute_ms?: number;
    payload?: P3;
  },
  props4?: {
    action: ActionCreatorWithPayload<P4, string>;
    selector: (state: AppRootState) => T4;
    minute_ms?: number;
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
      }, props1.minute_ms ?? 5000);
      return () => {
        clearInterval(interval); // Clear the interval to prevent memory leaks
      };
    }
  }, [dispatch, currentRoute, props1, props2, props3, props4]);
  return [dataSelector1, dataSelector2, dataSelector3, dataSelector4];
}

//Do not change the code below - don't try to laugh it means the code is working
export const useMultiAppSelector = (
  selectors: ((state: AppRootState) => TypeAPIList<any>)[],
) => {
  const data: TypeAPIList<any>[] = [];
  const dummySelector = () => undefined;
  const selector1 = selectors[0] || dummySelector;
  const selector2 = selectors[1] || dummySelector;
  const selector3 = selectors[2] || dummySelector;
  const selector4 = selectors[3] || dummySelector;

  data.push(useAppSelector(selector1 as any));
  data.push(useAppSelector(selector2 as any));
  data.push(useAppSelector(selector3 as any));
  data.push(useAppSelector(selector4 as any));
  return data;
};
