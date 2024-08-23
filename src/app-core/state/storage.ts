import {MMKV} from 'react-native-mmkv';
import {PersistConfig} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import {ReducerName, ReducerType} from './reducer';

export const DEFAULT_STORE_KEY = 'QuickServe-store';
export const USER_STORE_ID = 'user-{{value}}-store';
export const SHOULD_IGNORE_MAIL = '';
export const AUTH_KEY = 'auth';

const storage = new MMKV({
  id: DEFAULT_STORE_KEY,
});

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

let user_store: MMKV | undefined;
let current_user: string | undefined;
//HELPER FUNCTIONS TO BE USED THROUGHOUT APP
export function storageMMKV() {
  return {
    create: (userId: string) => {
      try {
        if (user_store && current_user === userId) {
          return;
        }
        current_user = userId;
        if (userId === SHOULD_IGNORE_MAIL) {
          user_store = undefined;
        } else {
          user_store = new MMKV({
            id: USER_STORE_ID.replace('{{value}}', userId),
            encryptionKey: 'hunter2',
          });
        }
      } catch (error) {
        console.error('Error creating user store:', error);
      }
    },

    setUserPreferences: (key: string, value: any) => {
      try {
        let saveValue = value;
        switch (typeof value) {
          case 'object':
            saveValue = JSON.stringify(value);
            break;
          case 'boolean':
            saveValue = value ? 'true' : 'false';
            break;
          case 'number':
            saveValue = value.toString();
            break;
          case 'undefined':
          case 'function':
          case 'symbol':
            saveValue = '';
            break;
          default:
            // Handle any other cases here
            break;
        }

        user_store?.set(`${key}`, `${saveValue}`);
      } catch (error) {
        console.error('Error setting user preferences:', error);
      }
    },

    getUserPreferences: (key: string) => {
      try {
        let value = user_store?.getString(key) || '';
        let returnValue;

        // Try to parse as JSON
        try {
          returnValue = JSON.parse(value);
        } catch (e) {
          // Not a JSON string, try to parse as boolean
          if (value === 'true' || value === 'false') {
            returnValue = value === 'true';
          } else {
            // Not a boolean, try to parse as number
            let numberValue = Number(value);
            if (!isNaN(numberValue)) {
              returnValue = numberValue;
            } else {
              // Not a number, return as string
              returnValue = value;
            }
          }
        }

        return returnValue;
      } catch (error) {
        console.error('Error getting user preferences:', error);
        return null; // Or handle the error according to your application's logic
      }
    },
    setSelectedStoreId: (id: number) => {
      user_store?.set('selectedStoreId', id.toString());
    },

    getSelectedStoreId: () => {
      const value = user_store?.getString('selectedStoreId');
      return value ? parseInt(value, 10) : 0;
    },
    removeItem: (key: string) => {
      try {
        user_store?.delete(key);
      } catch (error) {
        console.error('Error removing item:', error);
      }
    },

    clearAll: () => {
      try {
        user_store?.clearAll();
      } catch (error) {
        console.error('Error clearing all items:', error);
      }
    },
  };
}

export const rootPersistConfig: PersistConfig<ReducerType> = {
  key: DEFAULT_STORE_KEY,
  version: 1,
  storage: reduxStorage,
  timeout: undefined,
  whitelist: ['application', 'auth', 'interface'] as ReducerName[],
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
