import {useAppDispatch, useAppSelector} from '@app-core/state';
import {
  getIngredientByIdAction,
  getListGredientTypesSelectors,
} from '@app-core/state/ingredient/reducer';
import {
  IngredientTypes,
  IngredientTypesDetail,
} from '@app-core/state/ingredient/type';
import {en} from '@assets/text_constant';
import {formatNumber, Space} from '@utils/common';
import AppFlatlist from '@views/AppFlatlist';
import AppIcon from '@views/AppIcon';
import {AppText, AppTextSupportColor} from '@views/AppText';
import AppTouchable from '@views/AppTouchable';
import React, {useContext, useEffect, useState} from 'react';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

import {Context} from '../../../reducer';

interface IIngredients {
  itemIngredient: IngredientTypes;
  productId: number;
}

const Ingredients = ({itemIngredient, productId}: IIngredients) => {
  const appTheme = useTheme();
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [ingredient, setIngredient] = useState<IngredientTypesDetail[]>([]);
  const {orderIngredient} = useContext(Context);
  useEffect(() => {
    setIngredient(itemIngredient.ingredients);
  }, [itemIngredient]);

  const handelIncreaseAmount = (item: IngredientTypesDetail) => {
    const index = itemIngredient.ingredients.findIndex(
      ing => ing.id === item.id,
    );

    orderIngredient({
      productId: productId,
      id: item.id,
      name: item.name,
      quantity: item.defaultQuantity + 1,
      ingredientPrice: item.price,
      price: item.price * (item.defaultQuantity + 1),
      _quantity: itemIngredient.ingredients[index].defaultQuantity,
    });
    setIngredient(
      ingredient.map(ing => {
        if (ing.id === item.id) {
          return {
            ...ing,
            defaultQuantity: ing.defaultQuantity + 1,
          };
        }
        return ing;
      }),
    );
  };

  const handelDecreaseAmount = (item: IngredientTypesDetail) => {
    const index = itemIngredient.ingredients.findIndex(
      ing => ing.id === item.id,
    );
    orderIngredient({
      productId: productId,
      id: item.id,
      name: item.name,
      quantity: item.defaultQuantity > 0 ? item.defaultQuantity - 1 : 0,
      ingredientPrice: item.price,
      price: item.price * (item.defaultQuantity - 1),
      _quantity: itemIngredient.ingredients[index].defaultQuantity,
    });
    setIngredient(
      ingredient.map(ing => {
        if (ing.id === item.id) {
          return {
            ...ing,
            defaultQuantity:
              ing.defaultQuantity > 0 ? ing.defaultQuantity - 1 : 0,
          };
        }
        return ing;
      }),
    );
  };

  const renderIngredientDetail = (item: IngredientTypesDetail) => {
    return (
      <ListInfo key={item.id}>
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
              <TouchableAdd onPress={() => handelIncreaseAmount(item)}>
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

  const handelExpandIngredient = (id: number) => {
    setExpandedIds(
      expandedIds.includes(id)
        ? expandedIds.filter(expId => expId !== id)
        : [...expandedIds, id],
    );
  };

  return (
    <Container>
      <WrapIngredients
        onPress={() => handelExpandIngredient(itemIngredient.ingredientTypeId)}>
        <WrapImage>
          <Space horizontal={scale(10)} />
          <AppTextSupportColor
            color={appTheme.colors.black}
            variant="semibold_20">
            {itemIngredient.name}
          </AppTextSupportColor>
        </WrapImage>
        <AppIcon
          name={
            expandedIds.includes(itemIngredient.ingredientTypeId)
              ? 'ic_chevron_up'
              : 'ic_chevron_down'
          }
          stroke={appTheme.colors.primary}
          width={24}
          height={24}
        />
        {itemIngredient.ingredients.some(item => item.defaultQuantity > 0) && (
          <WrapAmount />
        )}
      </WrapIngredients>
      {expandedIds.includes(itemIngredient.ingredientTypeId) && (
        <AppFlatlist
          data={ingredient ?? []}
          renderItem={({item}) => renderIngredientDetail(item)}
        />
      )}
    </Container>
  );
};

const WrapImage = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Container = styled.View`
  margin: ${({theme}) => theme.gap_10}px;
`;

const WrapIngredients = styled(AppTouchable)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({theme}) => theme.colors.white};
  padding: ${({theme}) => theme.gap_16}px ${({theme}) => theme.gap_10}px;
  border-radius: ${({theme}) => theme.border_radius_8}px;
  box-shadow: 0px 2px 2px rgba(197, 197, 197, 0.25);
`;

const WrapAmount = styled.View`
  position: absolute;
  right: 10px;
  top: 10px;
  background-color: ${({theme}) => theme.colors.primary};
  border-radius: 99999px;
  width: 10px;
  height: 10px;
`;

const ListInfo = styled.View`
  padding: ${scale(10)}px;
  margin-top: ${scale(10)}px;
  border-radius: ${({theme}) => theme.border_radius_8}px;
  background-color: ${({theme}) => theme.colors.white};
  padding: ${scale(10)}px;
  border-radius: ${({theme}) => theme.border_radius_8}px;
  box-shadow: 0px 2px 2px rgba(24, 24, 24, 0.1);
  flex-direction: row;
  align-items: center;
`;

const WrapInfoIngredient = styled(AppTouchable)``;

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

export default Ingredients;
