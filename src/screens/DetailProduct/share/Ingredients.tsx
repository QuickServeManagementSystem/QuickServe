import {IngredientTypes} from '@app-core/state/ingredient/type';
import {APP_SCREEN} from '@navigation/constant';
import Navigation from '@navigation/Provider';
import {Space} from '@utils/common';
import AppIcon from '@views/AppIcon';
import {AppTextSupportColor} from '@views/AppText';
import AppTouchable from '@views/AppTouchable';
import React from 'react';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

interface IIngredients {
  itemIngredient: IngredientTypes;
  productId: number;
}
const Ingredients = ({itemIngredient, productId}: IIngredients) => {
  const appTheme = useTheme();

  return (
    <Container>
      <WrapIngredients
        onPress={() =>
          Navigation.navigateTo(APP_SCREEN.IngredientDetail.name, {
            detailIngredient: itemIngredient.ingredients,
            productId: productId,
          })
        }>
        <WrapImage>
          <Space horizontal={scale(10)} />
          <AppTextSupportColor
            color={appTheme.colors.black}
            variant="semibold_20">
            {itemIngredient.name}
          </AppTextSupportColor>
        </WrapImage>

        <AppIcon
          name="ic_arrow_right"
          fill_color={appTheme.colors.primary}
          width={24}
          height={24}
        />
        {itemIngredient.ingredients.find(item => item.defaultQuantity > 0) && (
          <WrapAmount />
        )}
      </WrapIngredients>
    </Container>
  );
};

const WrapImage = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Container = styled.View`
  flex: 1;
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
export default Ingredients;
