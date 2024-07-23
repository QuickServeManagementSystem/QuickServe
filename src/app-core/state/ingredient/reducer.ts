import {createSlice, createAction, PayloadAction} from '@reduxjs/toolkit';

import {AppRootState} from '..';

import {IngredientTypes, TIngredient, TIngredientRequest} from './type';

type SliceState = {
  listIngredient: TIngredient;
  ingredientTypes: IngredientTypes[];
};

const initialState = {
  listIngredient: {
    id: 0,
    name: '',
    price: 0,
    templates: [],
  },
  ingredientTypes: [],
} as SliceState;

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {
    setListIngredient: (
      state: SliceState,
      {payload}: PayloadAction<TIngredient>,
    ) => {
      if (payload && payload.id !== undefined) {
        state.listIngredient = payload;
      }
    },
    setListIngredientTypes: (
      state: SliceState,
      {payload}: PayloadAction<IngredientTypes[]>,
    ) => {
      state.ingredientTypes = payload;
    },
  },
});
export const {setListIngredient, setListIngredientTypes} =
  ingredientSlice.actions;

// actions

export const getIngredientByIdAction = createAction<TIngredientRequest>(
  `${ingredientSlice.name}/ingredientById`,
);

// selectors
export const getListIngredientByIdSelectors = (state: AppRootState) =>
  state.ingredient.listIngredient;

export const getListGredientTypesSelectors = (state: AppRootState) =>
  state.ingredient.ingredientTypes;

export default ingredientSlice.reducer;
