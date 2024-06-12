import {MainStack} from '@navigation/index';
import React, {useRef, useEffect} from 'react';
import {AppState} from 'react-native';

const RootComponent = () => {
  // App on foreground handle
  const oldAppState = useRef(AppState.currentState);

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

  return <MainStack />;
};
export default RootComponent;
