import {useAppSelector} from '@app-core/state';
import {
  ERole,
  selectCurrentRole,
  selectRole,
} from '@app-core/state/auth/reducer';
import {en} from '@assets/text_constant';
import {Space, formatNumber} from '@utils/common';
import AppFlatlist from '@views/AppFlatlist';
import AppHeader from '@views/AppHeader';
import AppIcon from '@views/AppIcon';
import {AppText, AppTextSupportColor} from '@views/AppText';
import AppTouchable from '@views/AppTouchable';
import React from 'react';
import {Text} from 'react-native';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

import OrderClient from './OrderClient';
import OrderStore from './OrderStore';
import OrderStaff from './OrerStaff';

interface Props {}

const Order: React.FC<Props> = () => {
  const appTheme = useTheme();

  const selectCurrent = useAppSelector(selectRole);

  const renderRightComponent = () => {
    return <AppText variant="semibold_20">{en.cart.cart}</AppText>;
  };

  return (
    <Container>
      <Space vertical={scale(appTheme.gap_5)} />
      <AppHeader
        iconLeft="ic_quickserve"
        widthIconLeft={scale(100)}
        onPressIconLeft={() => {
          console.log('Pressed');
        }}
        rightComponent={renderRightComponent()}
      />
      {selectCurrent === ERole.Guest || selectCurrent === ERole.Customer ? (
        <OrderClient />
      ) : null}
      {selectCurrent === ERole.Staff ? <OrderStaff /> : null}
      {selectCurrent === ERole.Store_Manager ? <OrderStore /> : null}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;
export default Order;
