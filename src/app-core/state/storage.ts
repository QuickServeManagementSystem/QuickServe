import {MMKV} from 'react-native-mmkv';
import {PersistConfig, Storage} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import {ReducerName, ReducerType} from './reducer';

const storage = new MMKV();

//TO BE USED IN REDUX PERSIST
export const reduxStorage = {
  setItem: (key: string, value: string | number | boolean | Uint8Array) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

//HELPER FUNCTIONS TO BE USED THROUGHOUT APP
export const StorageMMKV = {
  setUserPreferences: (key: any, value: any) => {
    try {
      storage.set(`${key}`, `${value}`);
    } catch (error) {
      console.error('Error setting user preferences:', error);
    }
  },

  getUserPreferences: (key: string) => {
    try {
      return storage.getString(key);
    } catch (error) {
      console.error('Error getting user preferences:', error);
      return null; // Or handle the error according to your application's logic
    }
  },

  removeItem: (key: string) => {
    try {
      storage.delete(key);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  },

  clearAll: () => {
    try {
      storage.clearAll();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};

export const rootPersistConfig: PersistConfig<ReducerType> = {
  key: 'root',
  version: 1,
  storage: reduxStorage,
  timeout: undefined,
  blacklist: [
    // these reducer have filtering dont need to save persist
  ] as ReducerName[],
  // https://github.com/rt2zz/redux-persist#state-reconciler
  // https://blog.bam.tech/developer-news/redux-persist-how-it-works-and-how-to-change-the-structure-of-your-persisted-store
  stateReconciler: autoMergeLevel2,
};
// ======

// sub-persistore
const subReducerStore = new MMKV({
  id: 'persist:reducer_name',
});

const specialReducerPersistConfig = {
  key: 'meta',
  version: 1,
  storage: reduxStorage,
  timeout: undefined,
  // https://github.com/rt2zz/redux-persist#state-reconciler
  // https://blog.bam.tech/developer-news/redux-persist-how-it-works-and-how-to-change-the-structure-of-your-persisted-store
  stateReconciler: autoMergeLevel2,
};
