import createDataContext from '@utils/createDataContext';
import {cloneDeep} from 'lodash';

//MARK: action type
export const fetch_data_price = 'fetch_data_price';
export const order_data_products = 'order_data_products';
export const order_data_ingredients = 'order_data_ingredients';
export const clear_data = 'clear_data';
export const clear_ingredients = 'clear_ingredients';
export const add_order = 'add_order';

//MARK: init state
export const initPrice = {
  totalPrice: 0,
  orderProduct: [] as any,
  orderIngredient: [] as any,
  clearIngredients: [] as any,
};

export type TInitPrice = typeof initPrice;

//MARK: Reducer
export const reducer = (state: TInitPrice = initPrice, action: any) => {
  switch (action.type) {
    case fetch_data_price:
      return {
        ...state,
      };

    case order_data_products:
      let product = [...state.orderProduct];
      const index = product.findIndex(
        item => item.productTemplateId === action.payload.productTemplateId,
      );
      if (index !== -1) {
        product[index] = action.payload;
      } else {
        product.push(action.payload);
      }
      return {
        ...state,
        orderProduct: product,
        price: action.payload.price,
      };
    case add_order:
      return {
        ...state,
        orderProduct: [...state.orderProduct, action.payload], // Add the new order to the array
      };
    case clear_ingredients:
      return {
        ...state,
        orderIngredient: [],
      };

    case order_data_ingredients:
      const ingredient = [...state.orderIngredient];
      const _index = ingredient.findIndex(
        item => item.id === action.payload.id,
      );
      if (_index !== -1) {
        ingredient.splice(_index, 1);
      } else {
        ingredient.push(action.payload);
      }
      return {
        ...state,
        orderIngredient: ingredient,
      };

    case clear_data:
      return {
        ...initPrice,
      };
    default:
      return initPrice;
  }
};
// In your reducer file

//MARK: actions
export const orderProduct = (dispatch: any) => (payload: any) => {
  dispatch({type: order_data_products, payload});
};

export const orderIngredient = (dispatch: any) => (payload: any) => {
  dispatch({type: order_data_ingredients, payload});
};

export const clearData = (dispatch: any) => () => {
  dispatch({type: clear_data});
};

export const clearIngredients = (dispatch: any) => () => {
  dispatch({type: clear_ingredients});
};
//MARK: selectors
export const calculateTotalPriceSelector = (
  product: TInitPrice['orderProduct'],
  ingredient: TInitPrice['orderIngredient'],
) => {
  const totalIngredient = ingredient.reduce(
    (sum: number, _ingredient: TInitPrice['orderIngredient']) => {
      return sum + _ingredient.price;
    },
    0,
  );

  return totalIngredient;
};

export const getListCart = (
  product: TInitPrice['orderProduct'],
  ingredient: TInitPrice['orderIngredient'],
) => {
  const listCart = product.map((item: any) => {
    return {
      productTemplateId: item.productTemplateId,
      quantity: item.quantity,
      ingredients: ingredient.filter(
        (i: any) => i.productId === item.productTemplateId,
      ),
    };
  });

  return listCart;
};

export const {Provider, Context} = createDataContext({
  reducer,
  actions: {
    orderProduct,
    orderIngredient,
    clearData,
    clearIngredients,
  },
  selectors: {
    calculateTotalPriceSelector,
    getListCart,
  },
  initialState: cloneDeep(initPrice),
});
