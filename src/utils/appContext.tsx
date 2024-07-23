import {PopupStatusRefType} from '@components/PopupChangeStatus';
import {PopupOrderRefType} from '@components/PopupOrder';
import {TotalOrderRefType} from '@components/TotalOrder';
import React, {useContext} from 'react';

export const RootStoreContext = React.createContext<AppContextType>({
  popupOrderRef: {current: null},
  totalPrice: {current: null},
  popupStatusRef: {current: null},
});

export class NavigationProvider {
  private _ref = {current: null};

  getRef() {
    return this._ref;
  }
}
export const RootStoreContextRef: React.MutableRefObject<AppContextType | null> =
  React.createRef();

export const AppProvider = RootStoreContext.Provider;

export type AppContextType = {
  popupOrderRef: React.MutableRefObject<PopupOrderRefType | null>;
  totalPrice: React.MutableRefObject<TotalOrderRefType | null>;
  popupStatusRef: React.MutableRefObject<PopupStatusRefType | null>;
};

export function useAppContext() {
  const storeRef = useContext<AppContextType>(RootStoreContext);
  RootStoreContextRef.current = storeRef;
  if (storeRef === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }

  return storeRef;
}
