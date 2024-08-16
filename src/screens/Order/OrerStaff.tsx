import {useAppDispatch} from '@app-core/state';
import {
  getListOrderAction,
  selectListOrder,
  updateOrderAction,
} from '@app-core/state/order/reducer';
import {TGetOrder} from '@app-core/state/order/type';
import {en} from '@assets/text_constant';
import {SearchBar} from '@components/SearchBar';
import {useAppContext} from '@utils/appContext';
import {Space} from '@utils/common';
import useAPIList from '@utils/hooks/useAPIList';
import AppFlatlist from '@views/AppFlatlist';
import {AppText, AppTextSupportColor} from '@views/AppText';
import AppTouchable from '@views/AppTouchable';
import React, {useEffect, useState, useCallback} from 'react';
import {Alert} from 'react-native';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

interface Props {}

const OrderStaff: React.FC<Props> = () => {
  const appTheme = useTheme();

  const dispatch = useAppDispatch();

  const {popupStatusRef} = useAppContext();
  const [listOrder, setListOrder] = useState<TGetOrder[]>([]);

  const {data, isLoadMore, isRefreshing, onLoadMore, onRefresh} = useAPIList(
    getListOrderAction,
    selectListOrder,
  );

  useEffect(() => {
    setListOrder(data ?? []);
  }, [data]);

  const formatStatus = (status: number) => {
    switch (status) {
      case 1:
        return (
          <WrapStatus background={appTheme.colors.primary}>
            <Status variant="semibold_16" color={appTheme.colors.white}>
              {en.order.create}
            </Status>
          </WrapStatus>
        );
      case 2:
        return (
          <WrapStatus background={appTheme.colors.primary}>
            <Status variant="semibold_16" color={appTheme.colors.white}>
              {en.order.paid}
            </Status>
          </WrapStatus>
        );
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
      case 5:
        return (
          <WrapStatus background={appTheme.colors.error}>
            <Status variant="semibold_16" color={appTheme.colors.white}>
              {en.order.error}
            </Status>
          </WrapStatus>
        );
    }
  };

  const handleSearch = useCallback(
    (text: string) => {
      setListOrder(
        data?.filter(order =>
          order.billCode.toLowerCase().includes(text.toLowerCase()),
        ) ?? [],
      );
    },
    [data],
  );

  const handleStatusUpdate = (currentStatus: number, newStatus: number) => {
    if (newStatus === 5) return true;
    switch (currentStatus) {
      case 1:
        return newStatus === 2;
      case 2:
        return newStatus === 3;
      case 3:
        return newStatus === 4;
      case 4:
        return false;
      default:
        return false;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <Container>
      <SearchBar placeholder="Tìm kiếm đơn hàng" onChangeText={handleSearch} />
      <Space vertical={16} />
      <AppFlatlist
        data={listOrder ?? []}
        isLoadMore={isLoadMore}
        isRefreshing={isRefreshing}
        onLoadMore={onLoadMore}
        onRefresh={onRefresh}
        contentContainerStyle={{
          paddingBottom: scale(100),
        }}
        renderItem={({item}: {item: TGetOrder; index: number}) => {
          return (
            <OrderItem
              onPress={() => {
                popupStatusRef.current?.display((status: string) => {
                  const newStatus = Number(status);
                  if (handleStatusUpdate(item.status, newStatus)) {
                    dispatch(
                      updateOrderAction({
                        orderId: item.id,
                        status: newStatus,
                      }),
                    );
                  } else {
                    Alert.alert(
                      'Status Change Not Allowed',
                      'You cannot change the status to this value.',
                      [{text: 'OK'}],
                    );
                  }
                });
              }}>
              <OrderDetails>
                <AppText variant="semibold_16">
                  Mã đơn hàng: {item.id.toString().substring(0, 6)}
                </AppText>
                <AppText variant="regular_14">
                  Ngày tạo: {formatDate(item.createdAt)}
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
  padding: ${scale(30)}px ${scale(18)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.colors.white};
  box-shadow: 2px 2px 5px ${props => props.theme.colors.stroke_primary};
  margin-bottom: ${scale(16)}px;
`;

const OrderDetails = styled.View`
  flex-direction: column;
`;

const Status = styled(AppTextSupportColor)`
  text-align: center;
`;

const WrapStatus = styled.View<{background: string}>`
  background-color: ${props => props.background + props.theme.alpha_08};
  max-width: ${scale(120)}px;
  min-width: ${scale(120)}px;
  padding: ${props => props.theme.gap_5}px;
  border-top-left-radius: ${props => props.theme.border_radius_8}px;
  border-bottom-right-radius: ${props => props.theme.border_radius_8}px;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  bottom: 0;
`;

export default OrderStaff;
