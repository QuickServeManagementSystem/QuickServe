import {useAppDispatch} from '@app-core/state';
import {launchAppAction} from '@app-core/state/application/reducer';
import AppIcon from '@views/AppIcon';
import React, {useEffect, useRef} from 'react';
import {Animated, StatusBar} from 'react-native';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

const Slash = () => {
  const appTheme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const dispatch = useAppDispatch();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
      delay: 0,
    }).start(isFinished => {
      if (isFinished) {
        dispatch(launchAppAction());
      }
    });
  }, [dispatch, fadeAnim]);
  return (
    <Container>
      <StatusBar translucent={false} barStyle={'light-content'} />
      <AnimationLogo
        style={{
          opacity: fadeAnim,
          transform: [
            {
              scale: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1],
              }),
            },
          ],
        }}>
        <IconLogo
          name="ic_logo"
          width={215}
          height={215}
          fill={appTheme.colors.white}
        />
      </AnimationLogo>
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

const AnimationLogo = styled(Animated.View)``;
const IconLogo = styled(AppIcon)`
  align-self: center;
  bottom: ${scale(20)}px;
`;

export default Slash;
