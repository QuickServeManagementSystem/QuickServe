/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {persister, store} from '@app-core/state';
import Navigator from '@navigation/Provider';
import {NavigationContainer} from '@react-navigation/native';
import DefaultTheme from '@views/theme';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {ThemeProvider} from 'styled-components/native';

import AppComponent from './src';

// Define our `fg` and `bg` on the theme
const AppTheme = DefaultTheme;

// This theme swaps `fg` and `bg`
const getTheme = (isDarkMode: boolean) => ({
  isDark: isDarkMode,
  ...AppTheme,
});

function App(): JSX.Element {
  const routeNameRef = React.useRef<string>();
  const isDarkMode = useColorScheme() === 'dark';

  return (
    /* Using this lib to support the Flatlist API*/
    /* https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/installation */
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <ThemeProvider theme={getTheme(isDarkMode)}>
            <NavigationContainer
              ref={Navigator.getRef()}
              theme={DefaultTheme}
              onReady={() => {
                const currentRouteName =
                  Navigator.getRef()?.current?.getCurrentRoute()?.name;
                routeNameRef.current = currentRouteName;
              }}
              onStateChange={async () => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName =
                  Navigator.getRef()?.current?.getCurrentRoute()?.name;
                const routeParams =
                  Navigator.getRef()?.current?.getCurrentRoute()?.params;

                if (previousRouteName !== currentRouteName) {
                  // The line below uses the tracker
                  console.log('currentRouteName: ', currentRouteName);
                  if (routeParams) {
                    console.log('currentRouteParams: ', routeParams ?? {});
                  }
                }

                // Save the current route name for later comparison
                routeNameRef.current = currentRouteName;
              }}>
              <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
              />
              <AppComponent />
            </NavigationContainer>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
