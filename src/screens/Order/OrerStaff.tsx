import {useAppDispatch} from '@app-core/state';
import {
  getListOrderAction,
  selectListOrder,
  updateOrderAction,
} from '@app-core/state/order/reducer';
import {TGetOrder} from '@app-core/state/order/type';
import {en} from '@assets/text_constant';
import {SearchBar} from '@components/SearchBar';
import {unwrapResult} from '@reduxjs/toolkit';
import {useAppContext} from '@utils/appContext';
import {Space} from '@utils/common';
import useAPIList from '@utils/hooks/useAPIList';
import AppFlatlist from '@views/AppFlatlist';
import {AppText, AppTextSupportColor} from '@views/AppText';
import AppTouchable from '@views/AppTouchable';
import React, {useEffect, useState, useCallback} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

const OrderStaff: React.FC = () => {
  const appTheme = useTheme();
  const dispatch = useAppDispatch();
  const {popupStatusRef} = useAppContext();

  const [listOrder, setListOrder] = useState<TGetOrder[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);

  const {data, isLoadMore, isRefreshing, onLoadMore, onRefresh} = useAPIList(
    getListOrderAction,
    selectListOrder,
  );

  useEffect(() => {
    if (selectedStatus === null) {
      setListOrder(data ?? []);
    } else {
      setListOrder(
        data?.filter(order => order.status === selectedStatus) ?? [],
      );
    }
  }, [data, selectedStatus]);

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
          order.id.toLowerCase().includes(text.toLowerCase()),
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

  // Sửa hàm handleUpdateOrderStatus để không dùng .then
  const handleUpdateOrderStatus = async (
    item: TGetOrder,
    newStatus: number,
  ) => {
    if (handleStatusUpdate(item.status, newStatus)) {
      try {
        const resultAction = await dispatch(
          updateOrderAction({
            orderId: item.id,
            status: newStatus,
          }),
        );
        unwrapResult(resultAction); // Lấy kết quả nếu thành công
        setSelectedStatus(newStatus);
        handleFilterChange(newStatus); // cập nhật lại filter
      } catch (error) {
        console.error('Failed to update order status:', error);
        Alert.alert(
          'Lỗi cập nhật',
          'Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng. Vui lòng thử lại sau.',
          [{text: 'OK'}],
        );
      }
    } else {
      Alert.alert(
        'Không thể thay đổi trạng thái',
        'Bạn không thể thay đổi trạng thái như thế.',
        [{text: 'OK'}],
      );
    }
  };

  const handleFilterChange = (status: number | null) => {
    setSelectedStatus(status);
    if (status !== null) {
      setListOrder(data?.filter(order => order.status === status) ?? []);
    } else {
      setListOrder(data ?? []);
    }
  };

  return (
    <Container>
      <SearchBar placeholder="Tìm kiếm đơn hàng" onChangeText={handleSearch} />
      <Space vertical={10} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: scale(8)}}>
        <FilterContainer>
          <FilterButton onPress={() => handleFilterChange(null)}>
            <FilterText variant="regular_16" selected={selectedStatus === null}>
              Tất cả
            </FilterText>
          </FilterButton>
          <FilterButton onPress={() => handleFilterChange(1)}>
            <FilterText variant="regular_16" selected={selectedStatus === 1}>
              Tạo mới
            </FilterText>
          </FilterButton>
          <FilterButton onPress={() => handleFilterChange(2)}>
            <FilterText variant="regular_16" selected={selectedStatus === 2}>
              Đã thanh toán
            </FilterText>
          </FilterButton>
          <FilterButton onPress={() => handleFilterChange(3)}>
            <FilterText variant="regular_16" selected={selectedStatus === 3}>
              Đang chuẩn bị
            </FilterText>
          </FilterButton>
          <FilterButton onPress={() => handleFilterChange(4)}>
            <FilterText variant="regular_16" selected={selectedStatus === 4}>
              Đã hoàn tất
            </FilterText>
          </FilterButton>
          <FilterButton onPress={() => handleFilterChange(5)}>
            <FilterText variant="regular_16" selected={selectedStatus === 5}>
              Lỗi
            </FilterText>
          </FilterButton>
        </FilterContainer>
      </ScrollView>
      <Space vertical={10} />
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
                  handleUpdateOrderStatus(item, newStatus);
                });
              }}>
              <OrderDetails>
                <AppText variant="semibold_16">
                  Mã đơn hàng: {item.id.toString().substring(0, 6)}
                </AppText>
                <AppText variant="regular_16">
                  Tổng tiền: {item.totalPrice}
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

const FilterContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin: ${scale(8)}px;
`;

const FilterButton = styled.TouchableOpacity`
  padding: ${scale(8)}px ${scale(8)}px;
  border-radius: ${props => props.theme.border_radius_8}px;
  background-color: ${props => props.theme.colors.white};
  height: ${scale(50)}px;
  width: ${scale(120)}px;
  justify-content: center;
  align-items: center;
`;

const FilterText = styled(AppText)<{selected: boolean}>`
  color: ${props =>
    props.selected ? props.theme.colors.primary : props.theme.colors.text};
  font-weight: ${props => (props.selected ? 'bold' : 'normal')};
  text-align: center;
`;

export default OrderStaff;
