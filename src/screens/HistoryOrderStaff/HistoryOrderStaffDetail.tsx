import {useAppDispatch, useAppSelector} from '@app-core/state';
import {
  getOrderByIdAction,
  selectOrderByIdSelector,
} from '@app-core/state/order/reducer';
import {en} from '@assets/text_constant';
import {useRoute} from '@react-navigation/native';
import {formatNumber, Space} from '@utils/common';
import AppHeader from '@views/AppHeader';
import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

const HistoryOrderStaffDetail = () => {
  const theme = useTheme();
  const route = useRoute();
  const dispatch = useAppDispatch();
  const orderHistoryDetail = useAppSelector(selectOrderByIdSelector);
  const {orderId} = route.params;

  useEffect(() => {
    if (orderId) {
      console.log('Fetching order details for ID:', orderId);
      dispatch(getOrderByIdAction({orderId: orderId}));
    } else {
      console.error('orderId is undefined or null');
    }
  }, [dispatch, orderId]);

  if (!orderHistoryDetail) {
    return <Text>Loading...</Text>;
  }

  const {id, totalPrice, status, products} = orderHistoryDetail;

  return (
    <Container>
      <AppHeader title="Chi tiết đơn hàng" />
      <Space vertical={scale(5)} />
      <OrderInfoContainer>
        <TextInfo>
          Mã đơn hàng: <BoldText>{id}</BoldText>
        </TextInfo>
        <TextInfo>
          Đơn giá: <BoldText>{totalPrice} đ</BoldText>
        </TextInfo>
        <TextInfo>
          Trạng thái đơn: <BoldText>{getStatusLabel(status)}</BoldText>
        </TextInfo>
      </OrderInfoContainer>
      <Space vertical={scale(20)} />
      <ProductList>
        {products?.map((product, index) => (
          <ProductItem key={index}>
            <ProductNamePriceContainer>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>
                {en.common.vnd.replace(
                  '{number}',
                  formatNumber(product.price ?? 0),
                )}
              </ProductPrice>
            </ProductNamePriceContainer>
            <ProductQuantity>Số lượng: {product.quantity}</ProductQuantity>
          </ProductItem>
        ))}
      </ProductList>
    </Container>
  );
};

// Helper function to get status label
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

// Styles
const Container = styled.View`
  flex: 1;
  padding: ${({theme}) => theme.gap_10}px;
  background-color: ${({theme}) => theme.colors.white};
`;

const OrderInfoContainer = styled.View`
  padding: ${({theme}) => theme.gap_10}px;
  border-bottom-width: 1px;
  border-color: ${({theme}) => theme.colors.stroke_primary};
`;

const TextInfo = styled.Text`
  font-size: ${scale(16)}px;
  margin-bottom: ${scale(5)}px;
  color: ${({theme}) => theme.colors.black};
`;

const BoldText = styled.Text`
  font-weight: bold;
`;

const ProductList = styled.View`
  margin-top: ${({theme}) => theme.gap_10}px;
`;

const ProductItem = styled.View`
  padding: ${({theme}) => theme.gap_10}px;
  border-bottom-width: 1px;
  border-color: ${({theme}) => theme.colors.stroke_primary};
`;

const ProductNamePriceContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ProductName = styled.Text`
  font-size: ${scale(16)}px;
  color: ${({theme}) => theme.colors.black};
`;

const ProductQuantity = styled.Text`
  font-size: ${scale(14)}px;
  color: ${({theme}) => theme.colors.gray_9};
  margin-top: ${scale(5)}px;
`;

const ProductPrice = styled.Text`
  font-size: ${scale(16)}px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.primary};
`;

export default HistoryOrderStaffDetail;
