import {APP_SCREEN} from '@navigation/constant';
import Navigation from '@navigation/Provider';
import {useRoute} from '@react-navigation/native';
import toast from '@utils/toast';
import AppHeader from '@views/AppHeader';
import axios from 'axios';
import React, {useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
import styled from 'styled-components/native';

import {Context} from '../../reducer';

const WebViewPaymentVNPay = () => {
  const router: any = useRoute();
  const {url} = router.params;
  const ref = React.useRef(null);
  const {clearData} = useContext(Context);

  useEffect(() => {
    return () => {
      clearData();
    };
  }, [clearData]);

  const handleNavigationStateChange = (navState: any) => {
    const {url: navUrl} = navState;
    try {
      if (navUrl.includes('status=PAID')) {
        axios.get(navUrl).then(res => {
          if (res.data.success) {
            toast.success('Thanh toán thành công');
            Navigation.navigateTo(APP_SCREEN.StatusOrder.name, {
              orderStatus: res.data.data,
            });
          } else {
            toast.error(res.data.errors?.[0].description ?? '');
            Navigation.replace(APP_SCREEN.AppStack.name);
          }
        });
      }
      if (navUrl.includes('status=ERROR')) {
        Navigation.replace(APP_SCREEN.AppStack.name);
      }
      if (navUrl.includes('status=CANCELLED')) {
        Navigation.replace(APP_SCREEN.AppStack.name);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Container>
      <AppHeader
        title="Thanh Toán"
        onPressIconLeft={() => {
          Navigation.replace(APP_SCREEN.AppStack.name);
        }}
      />
      <StyledMyWebComponent
        ref={ref}
        source={{uri: url}}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </Container>
  );
};

const Container = styled(SafeAreaView)`
  flex: 1;
`;

const StyledMyWebComponent = styled(WebView)`
  flex: 1;
`;

export default WebViewPaymentVNPay;
