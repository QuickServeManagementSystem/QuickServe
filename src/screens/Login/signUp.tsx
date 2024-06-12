import {View, Text} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import AppHeader from '@views/AppHeader';
import {scale} from 'react-native-size-matters';

const SignUp = () => {
  return (
    <Container>
      <AppHeader
        icon="ic_quickserve"
        widthIcon={scale(150)}
        heightIcon={scale(20)}
      />
      <BoxScanQr></BoxScanQr>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const BoxScanQr = styled.View``;
export default SignUp;
