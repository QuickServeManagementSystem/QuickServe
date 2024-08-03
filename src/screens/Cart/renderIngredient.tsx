import {en} from '@assets/text_constant';
import {formatNumber, Space} from '@utils/common';
import AppIcon from '@views/AppIcon';
import {AppTextSupportColor} from '@views/AppText';
import AppTouchable from '@views/AppTouchable';
import React, {useContext} from 'react';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

import {Context} from '../../reducer';

interface IIngredientCard {
  ingredient: any;
}
const IngredientCard = ({ingredient}: IIngredientCard) => {
  const appTheme = useTheme();

  const {orderIngredient} = useContext(Context);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  function handelChooseIngredient(ingredient: any) {
    orderIngredient({
      productId: ingredient.productId,
      id: ingredient.id,
      name: ingredient.name,
      price: ingredient.price,
      img: ingredient.img,
    });
  }

  return (
    <WrapProduct>
      <WrapInfoProduct>
        <AppTextSupportColor variant="bold_16" color={appTheme.colors.black}>
          {ingredient.name}
        </AppTextSupportColor>
        <Space vertical={scale(10)} />
        <AppTextSupportColor
          variant="semibold_16"
          color={appTheme.colors.primary}>
          {en.common.vnd.replace('{number}', formatNumber(ingredient.price))}
        </AppTextSupportColor>
      </WrapInfoProduct>
      <AppTouchable
        onPress={() => {
          handelChooseIngredient(ingredient);
        }}>
        <AppIcon
          name="ic_x"
          fill={appTheme.colors.primary}
          width={scale(24)}
          height={scale(24)}
        />
      </AppTouchable>
    </WrapProduct>
  );
};

const WrapProduct = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: ${({theme}) => theme.gap_16}px 0;
  padding: ${({theme}) => theme.gap_10}px;
  background-color: ${({theme}) => theme.colors.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: ${({theme}) => theme.border_radius_8}px;
`;

const WrapInfoProduct = styled.View``;

export default IngredientCard;
