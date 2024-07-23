/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {persister, store} from '@app-core/state';
import DefaultTheme from '@views/theme';
import React from 'react';
import {useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {ThemeProvider} from 'styled-components/native';

import 'react-native-gesture-handler';
import AppComponent from './src';
import * as ProviderCustom from './src/reducer';

// Define our `fg` and `bg` on the theme
const AppTheme = DefaultTheme;

// This theme swaps `fg` and `bg`
const getTheme = (isDarkMode: boolean) => ({
  isDark: isDarkMode,
  ...AppTheme,
});

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    /* Using this lib to support the Flatlist API*/
    /* https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/installation */
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <ThemeProvider theme={getTheme(isDarkMode)}>
            <ProviderCustom.Provider>
              <AppComponent />
            </ProviderCustom.Provider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
