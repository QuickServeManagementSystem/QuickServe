// https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-middleware-to-enable-async-logic

import {Middleware} from '@reduxjs/toolkit';

import {AppRootState, AppDispatch} from '..';

// https://redux.js.org/usage/writing-logic-thunks#why-use-thunks
const NeedLoginAction = [];

export const authMiddleware: Middleware<{}, AppRootState, AppDispatch> =
  storeAPI => next => action => {
    // If the "action" is actually a function instead...
    if (typeof action === 'function') {
      // then call the function and pass `dispatch` and `getState` as arguments
      return action(storeAPI.dispatch, storeAPI.getState);
    }
    // Otherwise, it's a normal action - send it onwards
    return next(action);
  };
