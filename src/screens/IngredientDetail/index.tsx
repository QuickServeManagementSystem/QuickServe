import {IngredientTypesDetail} from '@app-core/state/ingredient/type';
import {en} from '@assets/text_constant';
import {SearchBar} from '@components/SearchBar';
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
import styled, * as native from 'styled-components/native';

import {Context} from '../../reducer';

const IngredientDetail = () => {
  const appTheme = native.useTheme();
  const router: any = useRoute();

  const {
    detailIngredient,
    productId,
  }: {
    detailIngredient: IngredientTypesDetail[];
    totalPrice: number;
    productId: number;
  } = router.params;

  const [ingredient, setIngredient] = React.useState<IngredientTypesDetail[]>(
    [],
  );

  const {state, orderIngredient} = useContext(Context);

  useEffect(() => {
    setIngredient(
      detailIngredient.map((i: any) => {
        const index = state.orderIngredient.findIndex(
          (item: any) => item.id === i.id,
        );
        if (index > -1) {
          return {
            ...i,
            defaultQuantity: state.orderIngredient[index].quantity,
          };
        } else {
          return {
            ...i,
          };
        }
      }),
    );
  }, [detailIngredient]);

  const handelIncreaseAmount = (item: IngredientTypesDetail) => {
    orderIngredient({
      productId: productId,
      id: item.id,
      quantity: item.defaultQuantity + 1,
      name: item.name,
      ingredientPrice: item.price,
      price: item.price * (item.defaultQuantity + 1),
    });

    const index = ingredient.findIndex(i => i.id === item.id);
    if (index > -1) {
      setIngredient(prev =>
        prev.map(i =>
          i.id === item.id
            ? {
                ...i,
                defaultQuantity: i.defaultQuantity + 1,
              }
            : i,
        ),
      );
    } else {
      setIngredient(prev => [
        ...prev,
        {...item, defaultQuantity: item.defaultQuantity},
      ]);
    }
  };

  const handelDecreaseAmount = (item: IngredientTypesDetail) => {
    const index = ingredient.findIndex(i => i.id === item.id);
    orderIngredient({
      productId: productId,
      id: item.id,
      name: item.name,
      ingredientPrice: item.price,
      quantity: item.defaultQuantity > 0 ? item.defaultQuantity - 1 : 0,
      price:
        item.price * (item.defaultQuantity > 0 ? item.defaultQuantity - 1 : 0),
    });

    if (index > -1) {
      setIngredient(prev =>
        prev.map(i =>
          i.id === item.id
            ? {
                ...i,
                defaultQuantity:
                  i.defaultQuantity > 0 ? i.defaultQuantity - 1 : 0,
              }
            : i,
        ),
      );
    } else {
      setIngredient(prev => [
        ...prev,
        {...item, defaultQuantity: item.defaultQuantity},
      ]);
    }
  };

  const renderIngredentDetail = (item: IngredientTypesDetail) => {
    return (
      <ListInfo>
        <WrapImageIngredient>
          <ImageIngredient source={{uri: item.imageUrl}} />
        </WrapImageIngredient>
        <Space horizontal={scale(appTheme.gap_10)} />
        <WrapInfoIngredient>
          <AppText variant="medium_20">{item.name}</AppText>
          <Space vertical={scale(appTheme.gap_5)} />
          <BoxAction>
            <WrapPrice>
              <AppTextSupportColor
                variant="bold_20"
                color={appTheme.colors.primary}>
                {en.common.vnd.replace('{number}', formatNumber(item.price))}
              </AppTextSupportColor>
            </WrapPrice>
            <Space vertical={scale(appTheme.gap_5)} />
            <Space horizontal={scale(10)} />
            <WrapActionAmount>
              <TouchableMinus onPress={() => handelDecreaseAmount(item)}>
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
                {item.defaultQuantity}
              </AppTextSupportColor>
              <Space horizontal={scale(appTheme.gap_5)} />
              <TouchableAdd
                onPress={() => handelIncreaseAmount(item)}
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
        </WrapInfoIngredient>
      </ListInfo>
    );
  };

  const handelSearch = (text: string) => {
    setIngredient(
      detailIngredient.filter(i =>
        i.name.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  return (
    <Container>
      <AppHeader
        title={en.product.custom}
        onPressIconLeft={() => {
          Navigation.goBack();
        }}
      />
      <Space vertical={scale(appTheme.gap_10)} />
      <HeaderBar>
        <SearchBar
          onChangeText={text => handelSearch(text)}
          placeholder={en.ingredient.search}
        />
      </HeaderBar>
      <AppFlatlist
        data={ingredient ?? []}
        renderItem={({item}) => renderIngredentDetail(item)}
      />
    </Container>
  );
};

const HeaderBar = styled.View`
  margin: 0 ${scale(10)}px;
`;
const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

const ListInfo = styled.View`
  padding: ${scale(10)}px;
  margin: ${scale(10)}px;
  border-radius: ${({theme}) => theme.border_radius_8}px;
  background-color: ${({theme}) => theme.colors.white};
  padding: ${scale(10)}px;
  border-radius: ${({theme}) => theme.border_radius_8}px;
  box-shadow: 0px 2px 2px rgba(24, 24, 24, 0.1);
  flex-direction: row;
  align-items: center;
`;

const WrapInfoIngredient = styled(AppTouchable)`
  flex: 0.7;
`;

const WrapImageIngredient = styled.View``;

const ImageIngredient = styled.Image`
  height: ${scale(80)}px;
  width: ${scale(80)}px;
  border-radius: ${({theme}) => theme.border_radius_8}px;
`;

const WrapPrice = styled.View``;

const BoxAction = styled.View``;
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

export default IngredientDetail;
