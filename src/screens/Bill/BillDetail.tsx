import {useAppDispatch, useAppSelector} from '@app-core/state';
import {
  getBillByIdAction,
  getPrintBillPDFAction,
  selectBillByIdSelector,
} from '@app-core/state/order/reducer';
import {useRoute} from '@react-navigation/native';
import {formatNumber, Space} from '@utils/common';
import AppHeader from '@views/AppHeader';
import React, {useEffect} from 'react';
import {Button, Text} from 'react-native';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

const BillDetail = () => {
  const theme = useTheme();
  const route = useRoute();
  const dispatch = useAppDispatch();
  const billDetail = useAppSelector(selectBillByIdSelector);
  const {orderId} = route.params;

  useEffect(() => {
    if (orderId) {
      console.log('Fetching bill details for ID:', orderId);
      dispatch(getBillByIdAction({orderId: orderId}));
    } else {
      console.error('orderId is undefined or null');
    }
  }, [dispatch, orderId]);

  if (!billDetail) {
    return <Text>Loading...</Text>;
  }
  const handlePrintBill = async () => {
    try {
      const response = await dispatch(getPrintBillPDFAction({orderId}));
      console.log(response);
    } catch (error) {
      console.error('Error printing bill:', error);
    }
  };
  const {
    storeName,
    storeAddress,
    currentDate,
    billNumber,
    totalPrice,
    products,
    paymentMethod,
  } = billDetail;

  return (
    <Container>
      <AppHeader title="Chi tiết đơn hàng" />
      <Space vertical={scale(10)} />
      <StoreInfo>
        <StoreName>{storeName}</StoreName>
        <StoreAddress>Địa chỉ: {storeAddress}</StoreAddress>
      </StoreInfo>
      <Space vertical={scale(10)} />
      <Divider />
      <HeaderText>HÓA ĐƠN BÁN HÀNG</HeaderText>
      <Divider />
      <OrderInfo>
        <OrderDate>
          Ngày: {new Date(currentDate).toLocaleDateString()} -{' '}
          {new Date(currentDate).toLocaleTimeString()}
        </OrderDate>
        <OrderDetail>Số hóa đơn: {billNumber}</OrderDetail>
        <OrderDetail>Mã đơn hàng: {orderId}</OrderDetail>
      </OrderInfo>
      <Divider />
      <ProductList>
        <ProductHeader>
          <HeaderColumn>SẢN PHẨM</HeaderColumn>
          <HeaderColumn>SL</HeaderColumn>
          <HeaderColumn>GIÁ (VND)</HeaderColumn>
        </ProductHeader>
        {products?.map((product, index) => (
          <ProductItem key={index}>
            <ProductInfo>
              <ProductName>{product.productName}</ProductName>
              <ProductQuantity>{product.quantity}</ProductQuantity>
              <ProductPrice>{formatNumber(product.price)} đ</ProductPrice>
            </ProductInfo>
            {product.ingredients.map((ingredient, idx) => (
              <IngredientItem key={idx}>
                <IngredientInfo>
                  <IngredientName>* {ingredient.ingredientName}</IngredientName>
                  <IngredientQuantity>{ingredient.quantity}</IngredientQuantity>
                  <IngredientPrice>
                    {formatNumber(ingredient.price)} đ
                  </IngredientPrice>
                </IngredientInfo>
              </IngredientItem>
            ))}
          </ProductItem>
        ))}
      </ProductList>
      <Divider />
      <TotalPrice>TỔNG TIỀN: {formatNumber(totalPrice)} VND</TotalPrice>
      <PaymentMethod>Phương thức thanh toán: {paymentMethod}</PaymentMethod>
      <Divider />
      <ThankYou>CẢM ƠN QUÝ KHÁCH! HẸN GẶP LẠI!</ThankYou>

      <Button title="Tiến hành in bill" onPress={handlePrintBill} />
      <Space vertical={scale(10)} />
    </Container>
  );
};
// Styles
const Container = styled.View`
  flex: 1;
  padding: ${({theme}) => theme.gap_10}px;
  background-color: ${({theme}) => theme.colors.white};
`;

const StoreInfo = styled.View`
  align-items: center;
`;

const StoreName = styled.Text`
  font-size: ${scale(18)}px;
  font-weight: bold;
`;

const StoreAddress = styled.Text`
  font-size: ${scale(16)}px;
  color: ${({theme}) => theme.colors.gray_9};
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${({theme}) => theme.colors.stroke_primary};
  margin-vertical: ${scale(10)}px;
`;

const HeaderText = styled.Text`
  font-size: ${scale(16)}px;
  font-weight: bold;
  text-align: center;
`;

const OrderInfo = styled.View`
  padding: ${({theme}) => theme.gap_10}px;
`;

const OrderDate = styled.Text`
  font-size: ${scale(16)}px;
  margin-bottom: ${scale(5)}px;
`;

const OrderDetail = styled.Text`
  font-size: ${scale(16)}px;
  margin-bottom: ${scale(5)}px;
`;

const ProductList = styled.View`
  margin-top: ${({theme}) => theme.gap_10}px;
`;

const ProductHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${({theme}) => theme.gap_10}px;
  background-color: ${({theme}) => theme.colors.gray_9};
  border-bottom-width: 1px;
  border-color: ${({theme}) => theme.colors.stroke_primary};
`;

const HeaderColumn = styled.Text`
  font-size: ${scale(16)}px;
  font-weight: bold;
  flex: 1;
  text-align: center;
`;

const ProductItem = styled.View`
  flex-direction: column;
  padding: ${({theme}) => theme.gap_10}px;
`;

const ProductName = styled.Text`
  font-size: ${scale(13)}px;
  font-weight: bold;
  flex: 1;
  flex-wrap: wrap;
  max-width: ${scale(90)}px;
`;

const ProductInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  font-size: ${scale(12)}px;
  padding: ${scale(5)}px ${scale(10)}px;
`;

const ProductQuantity = styled.Text`
  font-size: ${scale(14)}px;
`;

const ProductPrice = styled.Text`
  font-size: ${scale(12)}px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.primary};
  margin-left: ${scale(40)}px;
`;

const IngredientItem = styled.View``;

const IngredientInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${scale(5)}px ${scale(10)}px;
`;

const IngredientName = styled.Text`
  font-size: ${scale(12)}px;
  flex: 1;
  flex-wrap: wrap;
  max-width: ${scale(85)}px;
`;

const IngredientQuantity = styled.Text`
  font-size: ${scale(14)}px;
`;

const IngredientPrice = styled.Text`
  font-size: ${scale(12)}px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.primary};
  margin-left: ${scale(40)}px;
`;

const TotalPrice = styled.Text`
  font-size: ${scale(16)}px;
  font-weight: bold;
  text-align: center;
  margin-vertical: ${scale(10)}px;
`;

const PaymentMethod = styled.Text`
  font-size: ${scale(16)}px;
  text-align: center;
`;

const ThankYou = styled.Text`
  font-size: ${scale(16)}px;
  text-align: center;
  font-weight: bold;
  margin-top: ${scale(10)}px;
`;

export default BillDetail;
