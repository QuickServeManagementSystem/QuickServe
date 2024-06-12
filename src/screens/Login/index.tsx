import {View, Text} from 'react-native';
import React from 'react';
import styled, {useTheme} from 'styled-components/native';
import AppHeader from '@views/AppHeader';
import {AppText, AppTextSupportColor} from '@views/AppText';
import {en} from '@assets/text_constant';
import {Space} from '@utils/common';
import {scale} from 'react-native-size-matters';
import AppIcon from '@views/AppIcon';
import AppTouchable from '@views/AppTouchable';
import Navigation from '@navigation/Provider';
import {APP_SCREEN, AUTH_APP_SCREEN} from '@navigation/constant';

const Welcome = () => {
  const appTheme = useTheme();
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
          onPress={() => Navigation.navigateTo(AUTH_APP_SCREEN.SignUp.name)}>
          <AppIcon
            name="ic_not_account"
            width={scale(50)}
            height={scale(100)}
            stroke={appTheme.colors.primary}
          />
          <AppText variant="semibold_16">{en.login.younotAccount}</AppText>
        </BoxAccountInfo>
        <Space horizontal={scale(appTheme.gap_10)} />
        <BoxAccountInfo
          onPress={() => Navigation.navigateTo(AUTH_APP_SCREEN.SignIn.name)}>
          <AppIcon
            name="ic_have_account"
            width={scale(50)}
            height={scale(100)}
            stroke={appTheme.colors.primary}
          />
          <AppText variant="semibold_16">{en.login.youHaveAccount}</AppText>
        </BoxAccountInfo>
      </WrapAccount>
      <WrapFooter>
        <AppText variant="regular_14">Contact Us</AppText>
        <Space vertical={scale(appTheme.gap_5)} />
        <AppTextSupportColor
          variant="semibold_16"
          color={appTheme.colors.primary}>
          123123123123
        </AppTextSupportColor>
      </WrapFooter>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: space-between;
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
