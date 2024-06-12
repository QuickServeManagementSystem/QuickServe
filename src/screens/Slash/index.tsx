import {APP_SCREEN} from '@navigation/constant';
import Navigation from '@navigation/Provider';
import AppIcon from '@views/AppIcon';
import React, {useEffect} from 'react';
import styled, {useTheme} from 'styled-components/native';

const Slash = () => {
  const appTheme = useTheme();
  useEffect(() => {
    setTimeout(() => {
      Navigation.reset(APP_SCREEN.AuthStack.name);
    }, 3000);
  }, []);

  return (
    <Container>
      <Background name="ic_logo" width={150} height={150} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.secondary};
`;

const Background = styled(AppIcon)``;

export default Slash;
