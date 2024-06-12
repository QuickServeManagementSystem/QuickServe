import {
  configureStore,
  Action,
  ThunkDispatch,
  Dispatch,
} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {
  persistReducer,
  persistStore,
  PERSIST,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {PersistPartial} from 'redux-persist/lib/persistReducer';
import createSagaMiddleware from 'redux-saga';

import {logger} from './log';
//
import {authMiddleware} from './middleware/authMiddleware';
import {ReducerType, rootReducer} from './reducer';
import {rootSaga} from './saga';
import {rootPersistConfig} from './storage';

const persistedReducer = persistReducer<ReducerType, Action>(
  rootPersistConfig,
  rootReducer,
);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    // https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
    let middlewareArray = getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Ignore these field paths in all actions
        // ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        // ignoredPaths: ['items.dates'],
      },
    }).concat([authMiddleware, sagaMiddleware]);
    if (__DEV__) {
      middlewareArray = middlewareArray.concat(logger);
    }

    return middlewareArray;
  },
});

sagaMiddleware.run(rootSaga);
export const persister = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppRootState = ReducerType & PersistPartial;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ThunkDispatch<AppRootState, undefined, Action> &
  Dispatch<Action>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
