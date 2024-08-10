import {useAppDispatch} from '@app-core/state';
import {
  getListOrderAction,
  getListStatusOrderAction,
  selectListOrder,
  selectStatusOrderSelector,
  updateOrderAction,
} from '@app-core/state/order/reducer';
import {TGetOrder, TGetStatusOrder} from '@app-core/state/order/type';
import {en} from '@assets/text_constant';
import {useAppContext} from '@utils/appContext';
import {useAutoExecutes} from '@utils/hooks/useAutoExcutes';
import AppFlatlist from '@views/AppFlatlist';
import {AppText, AppTextSupportColor} from '@views/AppText';
import AppTouchable from '@views/AppTouchable';
import React, {useEffect, useState, useRef} from 'react';
import {ToastAndroid} from 'react-native';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

const OrderStore = () => {
  const appTheme = useTheme();
  const dispatch = useAppDispatch();
  const {popupStatusRef} = useAppContext();

  // State to hold the current and previous order statuses
  const [previousOrders, setPreviousOrders] = useState<TGetStatusOrder[]>([]);
  const [currentOrders, setCurrentOrders] = useState<TGetStatusOrder[]>([]);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [data] = useAutoExecutes({
    action: getListStatusOrderAction,
    selector: selectStatusOrderSelector,
  });

  useEffect(() => {
    if (data?.data) {
      const pendingOrders = data.data.filter(order => order.status === 3);
      setCurrentOrders(pendingOrders);

      pendingOrders.forEach(order => {
        const prevOrder = previousOrders.find(prev => prev.id === order.id);
        if (prevOrder && prevOrder.status === 3 && order.status === 4) {
          ToastAndroid.show(
            `Hóa đơn ${order.id} đã hoàn thành!`,
            ToastAndroid.LONG,
          );

          setTimeout(() => {
            setCurrentOrders(prev => prev.filter(o => o.id !== order.id));
          }, 10000);
        }
      });
      setPreviousOrders(data.data);
    }
  }, [data?.data]);

  const formatStatus = (status: number) => {
    switch (status) {
      case 3:
        return (
          <WrapStatus background={appTheme.colors.primary}>
            <Status variant="semibold_16" color={appTheme.colors.white}>
              {en.order.pending}
            </Status>
          </WrapStatus>
        );
      case 4:
        return (
          <WrapStatus background={appTheme.colors.success}>
            <Status variant="semibold_16" color={appTheme.colors.white}>
              {en.order.success}
            </Status>
          </WrapStatus>
        );
    }
  };

  return (
    <Container>
      <AppFlatlist
        data={data?.data ?? []}
        contentContainerStyle={{
          paddingBottom: scale(100),
        }}
        renderItem={({item}: {item: TGetOrder}) => {
          return (
            <OrderItem disabled>
              <AppText variant="semibold_16">Đơn Số: {item?.id}</AppText>
              {formatStatus(item.status)}
            </OrderItem>
          );
        }}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  margin: 0 ${props => props.theme.gap_16}px;
  margin-top: 15px;
  background-color: ${props => props.theme.colors.background};
`;
const OrderItem = styled(AppTouchable)`
  border-radius: ${props => props.theme.border_radius_8}px;
  padding: ${scale(30)}px ${scale(18)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.colors.white};
  box-shadow: 2px 2px 5px ${props => props.theme.colors.stroke_primary};
  margin-bottom: ${scale(16)}px;
`;

const Status = styled(AppTextSupportColor)`
  text-align: center;
`;

const WrapStatus = styled.View<{background: string}>`
  background-color: ${props => props.background + props.theme.alpha_08};
  max-width: ${scale(110)}px;
  padding: ${props => props.theme.gap_5}px;
  min-width: ${scale(110)}px;
  border-top-left-radius: ${props => props.theme.border_radius_8}px;
  border-bottom-right-radius: ${props => props.theme.border_radius_8}px;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  bottom: 0;
`;

export default OrderStore;
