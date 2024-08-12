import {useAppDispatch, useAppSelector} from '@app-core/state';
import {
  getListOrderHistoryAction,
  selectListOrderHistorySelector,
} from '@app-core/state/order/reducer';
import {APP_SCREEN} from '@navigation/constant';
import Navigation from '@navigation/Provider';
import {formatNumber, Space} from '@utils/common';
import AppFlatlist from '@views/AppFlatlist';
import AppHeader from '@views/AppHeader';
import {AppTextSupportColor} from '@views/AppText';
import AppTouchable from '@views/AppTouchable';
import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

const HistoryOrder = () => {
  const appTheme = useTheme();
  const dispatch = useAppDispatch();
  const orderHistory = useAppSelector(selectListOrderHistorySelector);

  useEffect(() => {
    dispatch(getListOrderHistoryAction());
  }, [dispatch]);

  const handleViewDetails = (orderId: any) => {
    console.log('Navigating to order details with ID:', orderId); // Log the orderId
    Navigation.navigateTo(APP_SCREEN.HistoryOrderDetail.name, {orderId});
  };

  return (
    <Container>
      <Space vertical={scale(5)} />
      <AppHeader title="Lịch sử đơn hàng" />

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
                  Đơn giá: {formatNumber(item.totalPrice)} đ
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

// Helper function to get status label
const getStatusLabel = status => {
  switch (status) {
    case 3:
      return 'Đang xử lý';
    case 4:
      return 'Đã hoàn thành';
    default:
      return 'Chưa xác định';
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

const TouchableDelete = styled(AppTouchable)`
  padding: ${({theme}) => theme.gap_10}px;
  border-radius: 99999px;
  width: ${({theme}) => theme.gap_30}px;
  height: ${({theme}) => theme.gap_30}px;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  background-color: ${({theme}) => theme.colors.error + theme.alpha_05};
`;

export default HistoryOrder;
