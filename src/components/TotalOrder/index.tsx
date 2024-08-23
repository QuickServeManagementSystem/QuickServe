import {en} from '@assets/text_constant';
import {
  APP_SCREEN,
  AUTH_APP_SCREEN,
  BOTTOM_TAB_SCREEN,
} from '@navigation/constant';
import Navigation from '@navigation/Provider';
import {formatNumber, Space} from '@utils/common';
import AppIcon from '@views/AppIcon';
import {AppTextSupportColor} from '@views/AppText';
import AppTouchable from '@views/AppTouchable';
import React, {
  memo,
  useContext,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

import {Context} from '../../reducer';

export type TotalOrderRefType = {
  setChangeRoute(route?: string): void;
  onOk: (active: boolean) => void;
};

export type TotalOrderRef = React.ForwardedRef<TotalOrderRefType>;

const TotalOrder = React.forwardRef((props, ref: TotalOrderRef) => {
  const appTheme = useTheme();
  const {state, calculateTotalPriceSelector} = useContext(Context);
  const popupOrderProps = React.useRef<any>();
  const [currentRoute, setCurrentRoute] = useState<string>();
  const [orderActive, setOrderActive] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    setChangeRoute: (route?: string) => {
      setCurrentRoute(route);
    },
    onOk: active => {
      setOrderActive(active);
    },
  }));

  const totalPrice = useMemo(
    () =>
      calculateTotalPriceSelector(state.orderProduct, state.orderIngredient),
    [calculateTotalPriceSelector, state.orderIngredient, state.orderProduct],
  );

  return currentRoute &&
    currentRoute !== AUTH_APP_SCREEN.SignIn.name &&
    currentRoute !== AUTH_APP_SCREEN.Welcome.name &&
    currentRoute !== APP_SCREEN.Splash.name &&
    currentRoute !== APP_SCREEN.Cart.name &&
    currentRoute !== APP_SCREEN.Payment.name &&
    currentRoute !== APP_SCREEN.WebViewPaymentVNPay.name &&
    currentRoute !== APP_SCREEN.StatusOrder.name &&
    currentRoute !== BOTTOM_TAB_SCREEN.Setting.name &&
    currentRoute !== APP_SCREEN.HistoryOrder.name &&
    currentRoute !== APP_SCREEN.HistoryOrderDetail.name &&
    currentRoute !== APP_SCREEN.HistoryOrderStaff.name &&
    currentRoute !== APP_SCREEN.HistoryOrderStaffDetail.name &&
    state.orderProduct.length !== 0 ? (
    <WrapAddProduct
      {...props}
      disabled={!orderActive}
      onPress={() => {
        Navigation.navigateTo(APP_SCREEN.Cart.name);
      }}>
      <AppTextSupportColor variant="medium_14" color={appTheme.colors.white}>
        {en.common.vnd.replace('{number}', formatNumber(totalPrice ?? 0))}
      </AppTextSupportColor>
      <Space horizontal={scale(5)} />
      <AppIcon
        name="ic_add_product"
        width={30}
        height={30}
        stroke={appTheme.colors.primary}
        fill={appTheme.colors.white}
      />
    </WrapAddProduct>
  ) : null;
});

const WrapAddProduct = styled(AppTouchable)`
  align-self: center;
  position: absolute;
  background-color: ${props =>
    props.disabled
      ? props.theme.colors.background_disable
      : props.theme.colors.primary};
  padding: ${({theme}) => theme.gap_8}px;
  flex-direction: row;
  border-radius: 99999px;
  align-items: center;
  justify-content: center;
  bottom: ${scale(90)}px;
  right: 5px;
`;
export default memo(TotalOrder);
