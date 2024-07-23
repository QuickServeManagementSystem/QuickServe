/* eslint-disable react-hooks/exhaustive-deps */
import {useAppDispatch, useAppSelector} from '@app-core/state';
import {
  getIngredientByIdAction,
  getListGredientTypesSelectors,
} from '@app-core/state/ingredient/reducer';
import {IngredientTypes} from '@app-core/state/ingredient/type';
import {TProduct} from '@app-core/state/product/type';
import {en} from '@assets/text_constant';
import Navigation from '@navigation/Provider';
import {useRoute} from '@react-navigation/native';
import {Space, formatNumber} from '@utils/common';
import AppFlatlist from '@views/AppFlatlist';
import AppHeader from '@views/AppHeader';
import AppIcon from '@views/AppIcon';
import {AppText, AppTextSupportColor} from '@views/AppText';
import AppTouchable from '@views/AppTouchable';
import React, {useContext, useEffect} from 'react';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

import {Context} from '../../reducer';

import Ingredients from './share/Ingredients';

const DetailProduct = () => {
  const router: any = useRoute();

  const {detailProduct}: {detailProduct: TProduct} = router.params;

  const dispatch = useAppDispatch();
  const appTheme = useTheme();
  const [amount, setAmount] = React.useState(1);

  const listIngredients = useAppSelector(getListGredientTypesSelectors);
  const {state, orderProduct, orderIngredient} = useContext(Context);
  const handelIncreaseAmount = () => {
    setAmount(prev => prev + 1);
  };

  const handelDecreaseAmount = () => {
    if (amount > 0) {
      setAmount(prev => prev - 1);
    }
  };

  useEffect(() => {
    orderProduct({
      productTemplateId: detailProduct.id,
      quantity: amount,
      productPrice: detailProduct.price,
      price: detailProduct.price * amount,
      name: detailProduct.name,
    });
    listIngredients.map(i => {
      i.ingredients.map(item => {
        if (item.defaultQuantity !== 0) {
          orderIngredient({
            productId: detailProduct.id,
            id: item.id,
            name: item.name,
            quantity: item.defaultQuantity,
            ingredientPrice: item.price,
            price: item.price,
          });
        }
      });
    });
  }, [amount, listIngredients, detailProduct]);

  useEffect(() => {
    dispatch(getIngredientByIdAction({productTemplateId: detailProduct.id}));
  }, [detailProduct, dispatch]);

  const renderIngredient = ({item}: {item: IngredientTypes}) => {
    return <Ingredients itemIngredient={item} productId={detailProduct.id} />;
  };

  return (
    <Container>
      <AppHeader
        title={detailProduct.name}
        onPressIconLeft={() => {
          Navigation.goBack();
        }}
      />

      <WrapDetailProduct>
        <BoxImage>
          <ImageProduct
            source={{
              uri: detailProduct.imageUrl,
            }}
          />
        </BoxImage>
        <WrapInfoProduct>
          <Space vertical={scale(appTheme.gap_5)} />
          <BoxDescriptionProduct>
            <AppText variant="bold_20">{detailProduct.name}</AppText>
            <Space vertical={scale(appTheme.gap_5)} />
            <AppText variant="regular_16">
              {en.common.calo.replace(
                '{number}',
                formatNumber(detailProduct.calo),
              )}
            </AppText>
            <Space vertical={scale(appTheme.gap_5)} />
            <AppText numberOfLines={3} variant="thin_16">
              {detailProduct.description}
            </AppText>
          </BoxDescriptionProduct>
          <Space vertical={scale(appTheme.gap_5)} />
          <BoxAction>
            <WrapPrice>
              <AppTextSupportColor
                variant="bold_20"
                color={appTheme.colors.primary}>
                {en.common.vnd.replace(
                  '{number}',
                  formatNumber(detailProduct.price),
                )}
              </AppTextSupportColor>
            </WrapPrice>
            <Space horizontal={scale(10)} />
            <WrapActionAmount>
              <TouchableMinus onPress={() => handelDecreaseAmount()}>
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
                {amount}
              </AppTextSupportColor>
              <Space horizontal={scale(appTheme.gap_5)} />
              <TouchableAdd
                onPress={() => handelIncreaseAmount()}
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
          </BoxAction>
        </WrapInfoProduct>
      </WrapDetailProduct>
      <AppFlatlist
        data={listIngredients ?? []}
        renderItem={item => renderIngredient(item)}
      />
      <Space vertical={scale(appTheme.gap_22)} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  margin-bottom: ${scale(60)}px;
`;

const WrapInfoProduct = styled.View`
  flex: 0.6;
  justify-content: space-between;
`;

const WrapDetailProduct = styled.View`
  padding: ${({theme}) => scale(theme.gap_10)}px;
  margin: 0 ${({theme}) => scale(theme.gap_10)}px;
  border-radius: ${({theme}) => theme.border_radius_12}px;
  background-color: ${({theme}) => theme.colors.white};
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0px 2px 2px rgba(197, 197, 197, 0.25);
`;

const BoxImage = styled.View`
  align-items: center;
  flex: 0.4;
  margin-right: ${({theme}) => theme.gap_5}px;
`;

const ImageProduct = styled.Image`
  width: 100%;
  height: ${scale(160)}px;
  border-radius: ${({theme}) => theme.border_radius_12}px;
`;

const BoxDescriptionProduct = styled.View``;

const WrapPrice = styled.View``;

const BoxAction = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

export default DetailProduct;
