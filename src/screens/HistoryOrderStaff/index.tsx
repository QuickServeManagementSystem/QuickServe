import {useAppDispatch, useAppSelector} from '@app-core/state';
import {
  getListOrderHistoryStaffAction,
  selectListOrderHistoryStaffSelector,
} from '@app-core/state/order/reducer';
import {APP_SCREEN} from '@navigation/constant';
import Navigation from '@navigation/Provider';
import {formatNumber, Space} from '@utils/common';
import AppFlatlist from '@views/AppFlatlist';
import AppHeader from '@views/AppHeader';
import {AppTextSupportColor} from '@views/AppText';
import AppTouchable from '@views/AppTouchable';
import React, {useEffect, useState} from 'react';
import {Dimensions, Switch as RNSwitch} from 'react-native';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

const HistoryOrderStaff = () => {
  const appTheme = useTheme();
  const dispatch = useAppDispatch();
  const orderHistory = useAppSelector(selectListOrderHistoryStaffSelector);
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    dispatch(getListOrderHistoryStaffAction({selectedStatus}));
  }, [dispatch, selectedStatus]);

  const handleViewDetails = (orderId: any) => {
    console.log('Navigating to order details with ID:', orderId);
    Navigation.navigateTo(APP_SCREEN.HistoryOrderStaffDetail.name, {orderId});
  };
  return (
    <Container>
      <Space vertical={scale(5)} />
      <AppHeader title="Lịch sử đơn hàng" />
      {/* Filter UI */}
      <FilterContainer></FilterContainer>
      <AppFlatlist
        data={orderHistory?.data || []}
        renderItem={({item}) => (
          <CardContainer>
            <WrapProduct>
              <WrapInfoProduct>
                <AppTextSupportColor
                  variant="bold_20"
                  color={appTheme.colors.black}>
                  Mã đơn hàng: {item.id}
                </AppTextSupportColor>
                <AppTextSupportColor
                  variant="bold_20"
                  color={appTheme.colors.black}>
                  Loại đơn hàng: {getPlatformLabel(item.platform)}
                </AppTextSupportColor>
                <AppTextSupportColor
                  variant="bold_20"
                  color={appTheme.colors.black}>
                  Ngày đặt: {new Date(item.created).toLocaleDateString()}
                </AppTextSupportColor>
                <AppTextSupportColor
                  variant="bold_20"
                  color={appTheme.colors.black}>
                  Trạng thái đơn: {getStatusLabel(item.status)}
                </AppTextSupportColor>
              </WrapInfoProduct>
              <WrapAction>
                <AppTouchable onPress={() => handleViewDetails(item.id)}>
                  <AppTextSupportColor
                    variant="bold_16"
                    color={appTheme.colors.primary}>
                    Xem chi tiết
                  </AppTextSupportColor>
                </AppTouchable>
              </WrapAction>
            </WrapProduct>
          </CardContainer>
        )}
        keyExtractor={item => item?.id}
      />
      <Space vertical={scale(50)} />
    </Container>
  );
};
const getStatusLabel = (status: any) => {
  switch (status) {
    case 1:
      return 'Hóa đơn vừa được tạo';
    case 2:
      return 'Hóa đơn đã thanh toán';
    case 3:
      return 'Hóa đơn đang chuẩn bị';
    case 4:
      return 'Hóa đơn đã hoàn thành';
    default:
      return 'Đang xử lý';
  }
};
const getPlatformLabel = (status: any) => {
  switch (status) {
    case 1:
      return 'Đơn đặt tại chỗ';
    case 2:
      return 'Đơn đặt Onlline';
    default:
      return 'Đang xử lý';
  }
};
// Styles
const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.white};
`;

const CardContainer = styled.View`
  background-color: ${({theme}) => theme.colors.white};
  padding: ${({theme}) => theme.gap_10}px;
  border-radius: ${({theme}) => theme.border_radius_8}px;
  border-width: 1px;
  border-color: ${({theme}) => theme.colors.stroke_primary};
  shadow-color: ${({theme}) => theme.colors.black};
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  elevation: 5;
  margin-bottom: ${({theme}) => theme.gap_10}px;
`;

const WrapProduct = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const WrapInfoProduct = styled.View`
  flex: 1;
`;

const WrapAction = styled.View`
  flex-direction: row;
  align-items: center;
`;
const FilterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({theme}) => theme.gap_10}px;
  background-color: ${({theme}) => theme.colors.white};
  border-bottom-width: 1px;
  border-color: ${({theme}) => theme.colors.stroke_primary};
  margin-bottom: ${({theme}) => theme.gap_10}px;
`;

export default HistoryOrderStaff;
