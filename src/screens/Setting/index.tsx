import {useAppDispatch, useAppSelector} from '@app-core/state';
import {resetStateAction} from '@app-core/state/application/reducer';
import {ERole, selectEmail, selectRole} from '@app-core/state/auth/reducer';
import {APP_SCREEN} from '@navigation/constant';
import Navigation from '@navigation/Provider';
import {Space} from '@utils/common';
import {AppButton} from '@views/AppButton';
import AppHeader from '@views/AppHeader';
import React, {useContext} from 'react';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

import {Context} from '../../reducer';

import {ESetting, SettingsProps, dataSettings} from './setting.config';

const Setting = () => {
  const appTheme = useTheme();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectEmail);
  const currentRole = useAppSelector(selectRole);
  const {clearData} = useContext(Context);

  const handelActions = (item: SettingsProps) => {
    switch (item.id) {
      case ESetting.logout:
        clearData();
        dispatch(resetStateAction());
        return;
      case ESetting.login:
        Navigation.reset(APP_SCREEN.AuthStack.name);
        return;
      case ESetting.historyProduct:
        Navigation.navigateTo(APP_SCREEN.HistoryOrder.name);
        return;
      case ESetting.historyOrderStaff:
        Navigation.navigateTo(APP_SCREEN.HistoryOrderStaff.name);
        return;
      case ESetting.profile:
        Navigation.navigateTo(APP_SCREEN.Profile.name);
        return;
    }
  };

  return (
    <Container>
      <AppHeader
        iconLeft="ic_quickserve"
        widthIconLeft={scale(100)}
        onPressIconLeft={() => {
          console.log('Pressed');
        }}
      />
      <Content>
        {dataSettings.map(item => {
          if (item.id === ESetting.profile && currentRole !== ERole.Customer)
            return null;
          if (
            item.id === ESetting.historyProduct &&
            currentRole !== ERole.Customer
          )
            return null;
          if (
            item.id === ESetting.historyOrderStaff &&
            currentRole !== ERole.Staff
          )
            return null;
          if (item.id === ESetting.login && currentUser) return null;
          if (item.id === ESetting.logout && !currentUser) return null;

          return (
            <Wrap key={item.id}>
              <AppButton
                iconRight={item.icon}
                title={item.name}
                onPress={() => handelActions(item)}
                key={item.id}
                textColor={appTheme.colors.text_primary}
                variant="regular_20"
                fillIconRight={appTheme.colors.primary}
                backgroundColor={appTheme.colors.button_background_primary}
              />
              <Space vertical={appTheme.gap_8} />
            </Wrap>
          );
        })}
      </Content>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Wrap = styled.View`
  flex: 1;
`;

const Content = styled.ScrollView`
  padding: ${props => props.theme.gap_16}px;
  flex: 1;
`;
export default Setting;
