import {en} from '@assets/text_constant';
import {APP_SCREEN, AUTH_APP_SCREEN} from '@navigation/constant';
import Navigation from '@navigation/Provider';
import {Space} from '@utils/common';
import AppIcon from '@views/AppIcon';
import {AppText, AppTextSupportColor} from '@views/AppText';
import AppTouchable from '@views/AppTouchable';
import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

const Welcome = () => {
  const appTheme = useTheme();
  // const {width, height} = Dimensions.get('window');
  // useEffect(() => {
  //   if (width > height && width >= 768) {
  //     Navigation.reset(APP_SCREEN.AppStack.name);
  //   }
  // }, [width, height]);
  return (
    <Container>
      <WrapTitle>
        <Space vertical={scale(appTheme.gap_24)} />
        <AppText variant="regular_36">{en.login.welcomeTo}</AppText>
        <AppTextSupportColor color={appTheme.colors.black} variant="bold_64">
          {en.common.quick}
          <AppTextSupportColor
            color={appTheme.colors.primary}
            variant="bold_54">
            {en.common.serve}
          </AppTextSupportColor>
        </AppTextSupportColor>
      </WrapTitle>
      <WrapAccount>
        <BoxAccountInfo
          onPress={() => Navigation.reset(APP_SCREEN.AppStack.name)}>
          <AppIcon
            name="ic_not_account"
            width={scale(50)}
            height={scale(100)}
            stroke={appTheme.colors.primary}
          />
          <AppText variant="semibold_14">{en.login.younotAccount}</AppText>
        </BoxAccountInfo>
        <Space horizontal={scale(appTheme.gap_10)} />
        <BoxAccountInfo
          onPress={() => {
            Navigation.navigateTo(AUTH_APP_SCREEN.SignIn.name);
          }}>
          <AppIcon
            name="ic_have_account"
            width={scale(50)}
            height={scale(100)}
            stroke={appTheme.colors.primary}
          />
          <AppText variant="semibold_14">{en.login.youHaveAccount}</AppText>
        </BoxAccountInfo>
      </WrapAccount>
      <WrapFooter>
        <AppText variant="regular_14">{en.common.contactUs}</AppText>
        <Space vertical={scale(appTheme.gap_5)} />
        <AppTextSupportColor
          variant="semibold_16"
          color={appTheme.colors.primary}>
          +84395479409
        </AppTextSupportColor>
      </WrapFooter>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  background-color: ${props =>
    props.theme.colors.primary + props.theme.alpha_008};
`;

const WrapTitle = styled.View`
  align-items: center;
`;

const WrapAccount = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const BoxAccountInfo = styled(AppTouchable)`
  flex: 0.4;
  background-color: ${({theme}) => theme.colors.white};
  padding: ${({theme}) => theme.gap_10}px;
  border-radius: ${({theme}) => theme.border_radius_8}px;
  box-shadow: 0px 2px 8px rgba(99, 99, 99, 0.2);
  justify-content: center;
  align-items: center;
`;
const WrapFooter = styled.View`
  align-items: center;
`;

export default Welcome;
