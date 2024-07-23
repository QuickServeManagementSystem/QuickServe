import {
  getOrderByIdAction,
  selectOrderByIdSelector,
} from '@app-core/state/order/reducer';
import {SubmitOrderResponse} from '@app-core/state/payment/type';
import {en} from '@assets/text_constant';
import {APP_SCREEN} from '@navigation/constant';
import Navigation from '@navigation/Provider';
import {useRoute} from '@react-navigation/native';
import {MaxSize, Space} from '@utils/common';
import {useAutoExecutesSingle} from '@utils/hooks/useAutoExcutesSingle';
import toast from '@utils/toast';
import {AppTextSupportColor} from '@views/AppText';
import LottieView from 'lottie-react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

const StatusOrder = () => {
  const appTheme = useTheme();
  const route: any = useRoute();

  const {
    orderStatus,
  }: {
    orderStatus: {
      id: string;
      name: string;
      paymentType: number;
      refOrderId: string;
      status: number;
    };
  } = route.params;

  const [data] = useAutoExecutesSingle({
    action: getOrderByIdAction,
    selector: selectOrderByIdSelector,
    payload: {orderId: orderStatus?.refOrderId},
  });

  const statusOrder = React.useMemo(() => {
    switch (data?.status) {
      case 1:
        return en.order.create;
      case 2:
        return en.order.paid;
      case 3:
        return en.order.pending;
    }
  }, [data?.status]);

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
      </WrapContent>
    </Overlay>
  );
};

const Overlay = styled.View`
  background-color: ${({theme}) => theme.colors.background_overlay};
`;

const LottieAnimation = styled(LottieView)`
  align-self: center;
  height: ${scale(MaxSize.HEIGHT)}px;
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
