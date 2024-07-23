import React, {useReducer} from 'react';
import {TInitPrice} from 'reducer';

export default ({reducer, actions, selectors, initialState}: any) => {
  const Context = React.createContext<{
    state: TInitPrice;
    updateDataPrice: (payload: any) => void;
    orderProduct: (payload: any) => void;
    orderIngredient: (payload: any) => void;
    clearData: () => void;
    calculateTotalPriceSelector: (
      orderProductParam: TInitPrice['orderProduct'],
      orderIngedient: TInitPrice['orderIngredient'],
    ) => number;
    getListCart: (
      orderProductParam: TInitPrice['orderProduct'],
      orderIngedient: TInitPrice['orderIngredient'],
    ) => Array<any>;
  }>({
    state: initialState,
    updateDataPrice: () => {},
    orderProduct: () => {},
    orderIngredient: () => {},
    clearData: () => {},
    calculateTotalPriceSelector: (
      orderProductParam: TInitPrice['orderProduct'],
      orderIngedient: TInitPrice['orderIngredient'],
    ) => 0,
    getListCart: (
      orderProductParam: TInitPrice['orderProduct'],
      orderIngedient: TInitPrice['orderIngredient'],
    ) => [],
  });

  const Provider = ({children}: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const boundActions: any = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{state, ...selectors, ...boundActions}}>
        {children}
      </Context.Provider>
    );
  };

  return {Context, Provider};
};
