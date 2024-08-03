import {createSlice, createAction, PayloadAction} from '@reduxjs/toolkit';

import {AppRootState} from '..';

import {IngredientTypes, Step, TIngredient, TIngredientRequest} from './type';

type SliceState = {
  listIngredient: TIngredient;
  ingredientTypes: IngredientTypes[];
  step: Step[];
};

const initialState = {
  listIngredient: {
    id: 0,
    name: '',
    price: 0,
    templates: [],
  },
  step: [],
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

    setStepList: (state: SliceState, {payload}: PayloadAction<Step[]>) => {
      state.step = payload;
    },
  },
});
export const {setListIngredient, setListIngredientTypes, setStepList} =
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

export const selectStepList = (state: AppRootState) => state.ingredient.step;

export default ingredientSlice.reducer;
