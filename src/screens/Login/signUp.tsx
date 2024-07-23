import AppHeader from '@views/AppHeader';
import React from 'react';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';

const SignUp = () => {
  return (
    <Container>
      <AppHeader
        icon="ic_quickserve"
        widthIcon={scale(150)}
        heightIcon={scale(20)}
      />
      <BoxScanQr />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const BoxScanQr = styled.View``;
export default SignUp;
