import {useAppDispatch} from '@app-core/state';
import {
  getListStatusOrderAction,
  selectStatusOrderSelector,
} from '@app-core/state/order/reducer';
import {TGetOrder, TGetStatusOrder} from '@app-core/state/order/type';
import {useAutoExecutes} from '@utils/hooks/useAutoExcutes';
import toast from '@utils/toast';
import AppFlatlist from '@views/AppFlatlist';
import {AppText, AppTextSupportColor} from '@views/AppText';
import AppTouchable from '@views/AppTouchable';
import React, {useEffect, useState, useRef} from 'react';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

const OrderStore = () => {
  const appTheme = useTheme();
  const dispatch = useAppDispatch();

  const [previousOrders, setPreviousOrders] = useState<TGetStatusOrder[]>([]);
  const [currentOrders, setCurrentOrders] = useState<TGetStatusOrder[]>([]);
  const [completedOrders, setCompletedOrders] = useState<TGetStatusOrder[]>([]);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [data] = useAutoExecutes({
    action: getListStatusOrderAction,
    selector: selectStatusOrderSelector,
  });
  useEffect(() => {
    if (data?.data) {
      const pendingOrders = data?.data.filter(order => order.status === 3);
      setCurrentOrders(pendingOrders);

      // Kiểm tra xem có đơn hàng nào từ 3 thành 4 hay không
      data.data.forEach(order => {
        const prevOrder = previousOrders.find(prev => prev.id === order.id);
        if (prevOrder && prevOrder.status === 3 && order.status === 4) {
          setCompletedOrders(prev => [...prev, order]);
        }
      });

      setPreviousOrders(data?.data);
    }
  }, [data?.data]);

  useEffect(() => {
    if (completedOrders.length > 0) {
      const lastCompletedOrder = completedOrders[completedOrders.length - 1];
      toast.completedOrder(`Hóa đơn ${lastCompletedOrder.id} đã hoàn thành!`);

      setTimeout(() => {
        setCurrentOrders(prev =>
          prev.filter(o => o.id !== lastCompletedOrder.id),
        );
        setCompletedOrders(prev =>
          prev.filter(o => o.id !== lastCompletedOrder.id),
        );
      }, 5000);
    }
  }, [completedOrders]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return new Intl.DateTimeFormat('vi-VN', options).format(
      new Date(dateString),
    );
  };
  const getPlatformLabel = (platform: any) => {
    switch (platform) {
      case 1:
        return 'Đơn đặt trước';
      case 2:
        return 'Đơn đặt tại chỗ';
      default:
        return 'Đang xử lý';
    }
  };
  const formatStatus = (status: number) => {
    switch (status) {
      case 3:
        return (
          <WrapStatus background={appTheme.colors.primary}>
            <Status variant="semibold_22" color={appTheme.colors.white}>
              Đang chuẩn bị
            </Status>
          </WrapStatus>
        );
      case 4:
        return (
          <WrapStatus background={appTheme.colors.success}>
            <Status variant="semibold_22" color={appTheme.colors.white}>
              Đã hoàn thành
            </Status>
          </WrapStatus>
        );
    }
  };

  return (
    <Container>
      <AppFlatlist
        data={currentOrders}
        contentContainerStyle={{
          paddingBottom: scale(100),
        }}
        renderItem={({item}: {item: TGetOrder}) => {
          return (
            <OrderItem disabled>
              <OrderDetails>
                <AppText variant="semibold_20">
                  Mã đơn hàng: {item.id.toString().substring(0, 6)}
                </AppText>
                <AppText variant="regular_20">
                  Ngày tạo: {formatDate(item.created)}
                </AppText>
                <AppText variant="regular_20">
                  Hình thức đặt món: {getPlatformLabel(item.platform)}
                </AppText>
              </OrderDetails>
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
  padding: ${scale(12)}px ${scale(20)}px;
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
const OrderDetails = styled.View`
  flex-direction: column;
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
