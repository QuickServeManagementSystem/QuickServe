import {useAppDispatch, useAppSelector} from '@app-core/state';
import {
  getOrderByIdAction,
  selectOrderByIdSelector,
  updateOrderCustomerAction,
} from '@app-core/state/order/reducer';
import {
  getListStoreAction,
  selectedListStore,
} from '@app-core/state/store/reducer';
import {useRoute} from '@react-navigation/native';
import {formatNumber, Space} from '@utils/common';
import AppHeader from '@views/AppHeader';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import styled, {useTheme} from 'styled-components/native';

const HistoryOrderDetail = () => {
  const theme = useTheme();
  const route = useRoute();
  const dispatch = useAppDispatch();
  const orderHistoryDetail = useAppSelector(selectOrderByIdSelector);
  const stores = useSelector(selectedListStore).data;
  const {orderId} = route.params;

  const [expandedIngredientIndex, setExpandedIngredientIndex] = useState<
    number | null
  >(null);
  useEffect(() => {
    if (orderId) {
      console.log('Fetching order details for ID:', orderId);
      dispatch(getOrderByIdAction({orderId: orderId}));
      dispatch(getListStoreAction({}));
    } else {
      console.error('orderId is undefined or null');
    }
  }, [dispatch, orderId]);

  if (!orderHistoryDetail) {
    return <Text>Loading...</Text>;
  }

  const {id, totalPrice, status, products, storeId} = orderHistoryDetail;

  // Find the store name based on the storeId
  const currentStore = stores.find(store => store.id === storeId);
  const storeName = currentStore ? currentStore.name : 'Chưa cập nhật';

  const handleToggleIngredients = (index: number) => {
    setExpandedIngredientIndex(
      expandedIngredientIndex === index ? null : index,
    );
  };
  const handleCancelOrder = () => {
    if (orderId) {
      dispatch(updateOrderCustomerAction({orderId: orderId}));
    }
  };

  return (
    <Container>
      <AppHeader title="Chi tiết đơn hàng" />
      <Space vertical={scale(5)} />
      <OrderInfoContainer>
        <TextInfo>
          Mã đơn hàng: <BoldText>{id}</BoldText>
        </TextInfo>
        <TextInfo>
          Cửa hàng: <BoldText>{storeName}</BoldText>
        </TextInfo>
        <TextInfo>
          Đơn giá: <BoldText>{totalPrice} đ</BoldText>
        </TextInfo>
        <TextInfo>
          Trạng thái đơn: <BoldText>{getStatusLabel(status)}</BoldText>
        </TextInfo>
      </OrderInfoContainer>
      {status === 1 || status === 2 ? (
        <CancelOrderButton onPress={handleCancelOrder}>
          <CancelOrderButtonText>Tiến hành hủy đơn</CancelOrderButtonText>
        </CancelOrderButton>
      ) : null}
      <Space vertical={scale(20)} />
      <ProductList>
        {products?.map((product, index) => (
          <ProductItem key={index}>
            <ProductNamePriceContainer>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>{formatNumber(product.price ?? 0)} đ</ProductPrice>
            </ProductNamePriceContainer>
            <ProductQuantity>Số lượng: {product.quantity}</ProductQuantity>
            {product.ingredients && (
              <>
                <IngredientsContainer>
                  {expandedIngredientIndex === index
                    ? product.ingredients.map((ingredient, idx) => (
                        <IngredientItem key={idx}>
                          <IngredientName>{ingredient.name}</IngredientName>
                          <IngredientInfo>
                            <IngredientQuantity>
                              Số lượng: {ingredient.defaultQuantity}
                            </IngredientQuantity>
                            <IngredientPrice>
                              Giá: {formatNumber(ingredient.price)} đ
                            </IngredientPrice>
                          </IngredientInfo>
                        </IngredientItem>
                      ))
                    : product.ingredients.slice(0, 2).map((ingredient, idx) => (
                        <IngredientItem key={idx}>
                          <IngredientName>{ingredient.name}</IngredientName>
                          <IngredientInfo>
                            <IngredientQuantity>
                              Số lượng: {ingredient.defaultQuantity}
                            </IngredientQuantity>
                            <IngredientPrice>
                              Giá: {formatNumber(ingredient.price)} đ
                            </IngredientPrice>
                          </IngredientInfo>
                        </IngredientItem>
                      ))}
                </IngredientsContainer>
                {product.ingredients.length > 2 && (
                  <ToggleButton onPress={() => handleToggleIngredients(index)}>
                    <ToggleButtonText>
                      {expandedIngredientIndex === index
                        ? 'Ẩn bớt'
                        : 'Xem thêm'}
                    </ToggleButtonText>
                  </ToggleButton>
                )}
              </>
            )}
          </ProductItem>
        ))}
      </ProductList>
    </Container>
  );
};

// Updated helper function to get status label
const getStatusLabel = (status: number) => {
  switch (status) {
    case 1:
      return 'Chờ xác nhận';
    case 2:
      return 'Đã thanh toán';
    case 3:
      return 'Đang chuẩn bị';
    case 4:
      return 'Đã hoàn thành';
    case 5:
      return 'Đơn đã được lấy';
    case 6:
      return 'Đơn đã bị hủy';
    default:
      return 'Chưa xác định';
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

const IngredientsContainer = styled.View`
  margin-top: ${scale(10)}px;
  padding: ${scale(5)}px;
  border-top-width: 1px;
  border-color: ${({theme}) => theme.colors.stroke_primary};
`;

const IngredientItem = styled.View`
  padding: ${scale(5)}px;
  border-bottom-width: 1px;
  border-color: ${({theme}) => theme.colors.stroke_primary};
`;

const IngredientName = styled.Text`
  font-size: ${scale(12)}px;
  color: ${({theme}) => theme.colors.black};
  margin-bottom: ${scale(3)}px;
`;

const IngredientInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const IngredientQuantity = styled.Text`
  font-size: ${scale(12)}px;
  color: ${({theme}) => theme.colors.gray_9};
`;

const IngredientPrice = styled.Text`
  font-size: ${scale(12)}px;
  color: ${({theme}) => theme.colors.primary};
`;

const ToggleButton = styled.TouchableOpacity`
  margin-top: ${scale(10)}px;
  padding: ${scale(5)}px;
  align-items: center;
`;

const ToggleButtonText = styled.Text`
  font-size: ${scale(14)}px;
  color: ${({theme}) => theme.colors.primary};
`;

const CancelOrderButton = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.primary};
  padding: ${scale(10)}px;
  align-items: center;
  border-radius: ${scale(5)}px;
`;

const CancelOrderButtonText = styled.Text`
  font-size: ${scale(16)}px;
  color: ${({theme}) => theme.colors.white};
`;
export default HistoryOrderDetail;
