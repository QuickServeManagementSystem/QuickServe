import {
  getOrderByIdAction,
  selectOrderByIdSelector,
} from '@app-core/state/order/reducer';
import {en} from '@assets/text_constant';
import {useRoute} from '@react-navigation/native';
import {MaxSize, Space} from '@utils/common';
import {useAutoExecutesSingle} from '@utils/hooks/useAutoExcutesSingle';
import {AppTextSupportColor} from '@views/AppText';
import LottieView from 'lottie-react-native';
import React from 'react';
import {Dimensions} from 'react-native';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

const StatusOrder = () => {
  const appTheme = useTheme();
  const route: any = useRoute();

  const {orderStatus} = route.params;

  const [data] = useAutoExecutesSingle({
    action: getOrderByIdAction,
    selector: selectOrderByIdSelector,
    payload: {orderId: orderStatus?.refOrderId},
  });

  const statusOrder = React.useMemo(() => {
    switch (data?.status) {
      case 1:
        return en.order.pending;
      case 2:
        return en.order.paided;
      case 3:
        return en.order.pending;
    }
  }, [data?.status]);

  // Directly use the billCode from orderStatus
  const billCode = orderStatus?.refOrderId;

  return (
    <Overlay>
      <LottieAnimation
        source={require('@assets/animation/LoadingSuccess.json')}
        autoPlay
        loop
      />
      <WrapContent>
        <AppTextSupportColor variant="bold_20" color={appTheme.colors.white}>
          Trạng Thái Đơn Hàng
        </AppTextSupportColor>
        <Space vertical={scale(10)} />
        <AppTextSupportColor variant="bold_22" color={appTheme.colors.white}>
          {statusOrder}
        </AppTextSupportColor>
        <Space vertical={scale(10)} />
        <AppTextSupportColor
          variant="semibold_20"
          color={appTheme.colors.white}>
          Mã đơn hàng: {billCode}
        </AppTextSupportColor>
      </WrapContent>
    </Overlay>
  );
};

const Overlay = styled.View`
  background-color: ${({theme}) => theme.colors.background_overlay};
`;

const LottieAnimation = styled(LottieView)`
  align-self: center;
  height: ${Dimensions.get('window').width < 450
    ? scale(MaxSize.HEIGHT)
    : scale(MaxSize.HEIGHT / 2)}px;
  width: ${scale(MaxSize.WIDTH)}px;
  justify-content: center;
  align-items: center;
`;

const WrapContent = styled.View`
  position: absolute;
  top: 60%;
  align-self: center;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export default StatusOrder;
