import PopupChangeStatus from '@components/PopupChangeStatus';
import PopupOrder from '@components/PopupOrder';
import TotalOrder from '@components/TotalOrder';
import {MainStack} from '@navigation/index';
import Navigator from '@navigation/Provider';
import {NavigationContainer} from '@react-navigation/native';
import {useAppContext} from '@utils/appContext';
import {getStatusBarHeight} from '@utils/GetHeightStatusBar';
import DefaultTheme from '@views/theme';
import React, {useRef, useEffect} from 'react';
import {AppState, StatusBar} from 'react-native';
import Toast, {
  BaseToast,
  BaseToastProps,
  ToastConfig,
} from 'react-native-toast-message';

const toastConfigParamDefault: BaseToastProps = {
  text2Style: {
    fontSize: 14,
    lineHeight: 18,
  },
  style: {
    height: 'auto',
    paddingVertical: 10,
    minHeight: 60,
  },
  text2Props: {numberOfLines: 5},
};

const toastConfig: ToastConfig = {
  success: props => (
    <BaseToast
      {...props}
      {...toastConfigParamDefault}
      style={[
        toastConfigParamDefault.style,
        {borderLeftColor: DefaultTheme.colors.success},
      ]}
    />
  ),
  error: props => (
    <BaseToast
      {...props}
      {...toastConfigParamDefault}
      style={[
        toastConfigParamDefault.style,
        {borderLeftColor: DefaultTheme.colors.error},
      ]}
    />
  ),
  info: props => (
    <BaseToast
      {...props}
      {...toastConfigParamDefault}
      style={[
        toastConfigParamDefault.style,
        {borderLeftColor: DefaultTheme.colors.warning},
      ]}
    />
  ),
};

const RootComponent = () => {
  // App on foreground handle
  const oldAppState = useRef(AppState.currentState);
  const routeNameRef = React.useRef<string>();

  const {popupOrderRef, totalPrice, popupStatusRef} = useAppContext();

  useEffect(() => {
    const handleAppStateChange = (nextAppState: any) => {
      if (
        oldAppState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
      }

      oldAppState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return function cleanup() {
      subscription.remove();
    };
    //   }, [dispatch]);
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState.match(/inactive|background/)) {
        console.log('App go to inactive|background');
        // TODO:
      } else if (nextAppState.match(/active/)) {
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <NavigationContainer
      ref={Navigator.getRef()}
      theme={DefaultTheme}
      onReady={() => {
        const currentRouteName =
          Navigator.getRef()?.current?.getCurrentRoute()?.name;
        routeNameRef.current = currentRouteName;
        totalPrice.current?.setChangeRoute(currentRouteName);
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName =
          Navigator.getRef()?.current?.getCurrentRoute()?.name;
        const routeParams =
          Navigator.getRef()?.current?.getCurrentRoute()?.params;

        if (previousRouteName !== currentRouteName) {
          // The line below uses the tracker
          totalPrice.current?.setChangeRoute(currentRouteName);
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
      <MainStack />
      <Toast
        topOffset={getStatusBarHeight() + 20}
        visibilityTime={3000}
        config={toastConfig}
      />
      <PopupOrder ref={popupOrderRef} />
      <TotalOrder ref={totalPrice} />
      <PopupChangeStatus ref={popupStatusRef} />
    </NavigationContainer>
  );
};

export default RootComponent;
