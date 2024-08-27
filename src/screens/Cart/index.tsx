import {useAppDispatch, useAppSelector} from '@app-core/state';
import {ERole, selectRole} from '@app-core/state/auth/reducer';
import {
  createOrderAction,
  createOrderCustomerAction,
} from '@app-core/state/order/reducer';
import {selectSelectedStoreId} from '@app-core/state/store/reducer';
import {en} from '@assets/text_constant';
import {APP_SCREEN} from '@navigation/constant';
import Navigation from '@navigation/Provider';
import {useAppContext} from '@utils/appContext';
import {formatNumber, MaxSize, Space} from '@utils/common';
import AppFlatlist from '@views/AppFlatlist';
import AppHeader from '@views/AppHeader';
import AppIcon from '@views/AppIcon';
import {AppTextSupportColor} from '@views/AppText';
import AppTouchable from '@views/AppTouchable';
import React, {useContext, useEffect} from 'react';
import {useWindowDimensions} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import styled, {useTheme} from 'styled-components/native';

import {Context} from '../../reducer';

import IngredientCard from './renderIngredient';

const Cart = () => {
  const appTheme = useTheme();
  const {height, width} = useWindowDimensions();
  const {state, clearData, orderProduct} = useContext(Context);

  const [listProduct, setListProduct] = React.useState<any[]>([]);
  const [listIngredient, setListIngredient] = React.useState<any[]>([]);
  const [expandedProductIds, setExpandedProductIds] = React.useState<number[]>(
    [],
  );
  const currentRole = useAppSelector(selectRole);
  const selectedStoreId = useSelector(selectSelectedStoreId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setListIngredient(state.orderIngredient);
    setListProduct(state.orderProduct.filter((item: any) => item.quantity > 0));
  }, [state]);

  const toggleExpand = (productId: number) => {
    setExpandedProductIds(prevState =>
      prevState.includes(productId)
        ? prevState.filter(id => id !== productId)
        : [...prevState, productId],
    );
  };

  const handelIncreaseAmount = (id: number) => {
    const index = state.orderProduct.findIndex(
      (item: any) => item.productTemplateId === id,
    );
    if (index > -1) {
      state.orderProduct[index].quantity += 1;
      state.orderProduct[index].price += state.orderProduct[index].productPrice;
      setListProduct([...state.orderProduct]);
    }
  };

  const handelDecreaseAmount = (id: number) => {
    const index = state.orderProduct.findIndex(
      (item: any) => item.productTemplateId === id,
    );
    if (index > -1 && state.orderProduct[index].quantity > 0) {
      state.orderProduct[index].quantity -= 1;
      state.orderProduct[index].price -= state.orderProduct[index].productPrice;
      setListProduct([...state.orderProduct]);
    }
  };

  const handelDelete = (id: number) => {
    const index = state.orderProduct.findIndex(
      (item: any) => item.productTemplateId === id,
    );
    if (index > -1) {
      state.orderProduct.splice(index, 1);
      setListProduct([...state.orderProduct]);
      orderProduct([...state.orderProduct]);
    }
  };
  const handelOrder = () => {
    const products = state.orderProduct.map((productTemplate: any) => {
      return {
        productTemplateId: productTemplate.productTemplateId,
        quantity: productTemplate.quantity,
        ingredients: state.orderIngredient
          .filter(
            (_ingredient: any) =>
              _ingredient.productId === productTemplate.productTemplateId,
          )
          .map((ingredient: any) => {
            return {
              id: ingredient.id,
              price: ingredient.price,
              quantity: ingredient.quantity,
            };
          }),
      };
    });

    if (currentRole === ERole.Customer) {
      dispatch(
        createOrderCustomerAction({
          products: products,
          storeId: selectedStoreId,
        }),
      );
    } else {
      dispatch(
        createOrderAction({
          products: products,
          storeId: selectedStoreId,
        }),
      );
    }
  };

  const handelChooseIngredient = (ingredient: any) => {
    const index = listIngredient.findIndex(
      (item: any) => item.id === ingredient.id,
    );
    if (index > -1) {
      setListIngredient(prevState => {
        return prevState.splice(index, 1);
      });
    }
  };

  const renderProductItem = ({item}: {item: any}) => {
    const isExpanded = expandedProductIds.includes(item.productTemplateId);
    const productIngredients = listIngredient.filter(
      (ingredient: any) => ingredient.productId === item.productTemplateId,
    );

    // Calculate total ingredient price
    const totalIngredientPrice = productIngredients.reduce(
      (total, ingredient) => total + ingredient.price * ingredient.quantity,
      0,
    );

    const totalPrice = (item.price + totalIngredientPrice) * item.quantity;
    return (
      <ContainerCart key={item.productTemplateId}>
        <Space vertical={scale(5)} />
        <AppTextSupportColor variant="medium_18" color={appTheme.colors.black}>
          {en.cart.mainDishes}
        </AppTextSupportColor>
        <Space vertical={scale(10)} />
        <WrapProduct>
          <WrapInfoProduct>
            <AppTextSupportColor
              variant="bold_20"
              color={appTheme.colors.black}>
              {item.name}
            </AppTextSupportColor>
            <Space vertical={scale(10)} />
            <AppTextSupportColor
              variant="semibold_16"
              color={appTheme.colors.primary}>
              {en.common.vnd.replace('{number}', formatNumber(item.price))}
            </AppTextSupportColor>
          </WrapInfoProduct>
          <WrapAction>
            <TouchableDelete
              onPress={() => handelDelete(item.productTemplateId)}>
              <AppIcon
                name="ic_delete"
                stroke={appTheme.colors.black}
                width={24}
                height={24}
              />
            </TouchableDelete>
            <Space vertical={scale(10)} />
            <WrapActionAmount>
              <TouchableMinus
                onPress={() => handelDecreaseAmount(item.productTemplateId)}>
                <AppIcon
                  name="ic_minus"
                  stroke={appTheme.colors.stroke_third}
                  width={24}
                  height={24}
                />
              </TouchableMinus>
              <Space horizontal={scale(appTheme.gap_5)} />
              <AppTextSupportColor
                variant="bold_24"
                color={appTheme.colors.primary}>
                {item.quantity}
              </AppTextSupportColor>
              <Space horizontal={scale(appTheme.gap_5)} />
              <TouchableAdd
                onPress={() => handelIncreaseAmount(item.productTemplateId)}
                // disabled={detailProduct.quantity === 0}>
              >
                <AppIcon
                  name="ic_add"
                  stroke={appTheme.colors.stroke_third}
                  width={24}
                  height={24}
                />
              </TouchableAdd>
            </WrapActionAmount>
          </WrapAction>
        </WrapProduct>
        <Space vertical={scale(10)} />
        {productIngredients.length > 0 ? (
          <ButtonViewMore
            onPress={() => {
              toggleExpand(item.productTemplateId);
            }}>
            <AppTextSupportColor
              variant="bold_16"
              color={appTheme.colors.primary}>
              {en.cart.ingedients}
            </AppTextSupportColor>
            <AppIcon
              name={isExpanded ? 'ic_chevron_up' : 'ic_chevron_down'}
              width={24}
              height={24}
              stroke={appTheme.colors.black}
            />
          </ButtonViewMore>
        ) : null}
        {isExpanded && productIngredients.length > 0 ? (
          <>
            <AppFlatlist
              data={productIngredients}
              renderItem={({item: ingredient}: any) => (
                <IngredientCard
                  // handelChooseIngredient={handelChooseIngredient}
                  ingredient={ingredient}
                />
              )}
              keyExtractor={(ingredient: any) => ingredient.id.toString()}
            />
            <Line />
          </>
        ) : null}
      </ContainerCart>
    );
  };

  return (
    <Container>
      <AppHeader
        title="Giỏ Hàng"
        onPressIconLeft={() => {
          if (
            state.orderIngredient.length < 0 ||
            state.orderProduct.length < 0
          ) {
            clearData();
            Navigation.goBack();
          }
          Navigation.goBack();
        }}
      />
      <AppFlatlist
        data={listProduct}
        renderItem={renderProductItem}
        keyExtractor={(item: any) => item.productTemplateId.toString()}
      />
      <Space vertical={scale(50)} />
      <WrapButton onPress={() => handelOrder()}>
        <AppTextSupportColor variant="bold_16" color={appTheme.colors.white}>
          Xác Nhận Đơn Hàng
        </AppTextSupportColor>
      </WrapButton>
    </Container>
  );
};
const CartContainer = styled.View`
  background-color: ${({theme}) => theme.colors.gray_9};
  padding: ${({theme}) => theme.gap_10}px;
  shadow-color: ${({theme}) => theme.colors.black};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  elevation: 5;
  border-radius: ${({theme}) => theme.border_radius_8}px;
`;
const ContainerCart = styled.View`
  margin: 0 ${({theme}) => theme.gap_16}px;
`;

const ButtonViewMore = styled(AppTouchable)`
  margin: ${({theme}) => theme.gap_10}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const WrapActionAmount = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${({theme}) => theme.colors.stroke_primary};
  border-radius: ${({theme}) => theme.border_radius_5}px;
  padding: ${({theme}) => theme.gap_2}px;
  max-width: ${scale(100)}px;
  min-width: ${scale(100)}px;
`;

const Line = styled.View`
  height: 1px;
  margin: ${({theme}) => theme.gap_10}px 0px;
  background-color: ${({theme}) => theme.colors.stroke_primary};
`;

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.white};
`;

const WrapProduct = styled(CartContainer)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({theme}) => theme.gap_10}px;
  background-color: ${({theme}) => theme.colors.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: ${({theme}) => theme.border_radius_8}px;
`;

const WrapInfoProduct = styled.View``;

const WrapAction = styled.View``;

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
const WrapButton = styled(AppTouchable)`
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  align-items: center;
  align-self: center;
  margin-bottom: ${scale(30)}px;
  border-radius: ${({theme}) => theme.border_radius_8}px;
  width: ${MaxSize.WIDTH / 1.1}px;
  padding: ${({theme}) => theme.gap_10}px;
  background-color: ${({theme}) => theme.colors.primary};
`;

const TouchableMinus = styled(AppTouchable)`
  background-color: ${({theme}) => theme.colors.button_background_thrid};
  padding: ${({theme}) => theme.gap_2}px;
  border-radius: ${({theme}) => theme.border_radius_5}px;
`;

const TouchableAdd = styled(AppTouchable)`
  background-color: ${({theme}) => theme.colors.secondary};
  padding: ${({theme}) => theme.gap_2}px;
  border-radius: ${({theme}) => theme.border_radius_5}px;
`;

export default Cart;
