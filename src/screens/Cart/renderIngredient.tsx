import {en} from '@assets/text_constant';
import {formatNumber, Space} from '@utils/common';
import {AppTextSupportColor} from '@views/AppText';
import React, {useContext, useEffect} from 'react';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

import {Context} from '../../reducer';

interface IIngredientCard {
  ingredient: any;
}
const IngredientCard = ({ingredient}: IIngredientCard) => {
  const appTheme = useTheme();

  const {orderIngredient} = useContext(Context);

  const [amounts, setAmounts] = React.useState(1);

  useEffect(() => {
    setAmounts(ingredient.quantity || 1);
  }, [ingredient]);

  return (
    <WrapProduct>
      <WrapInfoProduct>
        <AppTextSupportColor variant="bold_16" color={appTheme.colors.black}>
          {ingredient.name}
        </AppTextSupportColor>
        <Space vertical={scale(10)} />
      </WrapInfoProduct>
      <WrapAmount>
        <AppTextSupportColor
          variant="semibold_16"
          color={appTheme.colors.primary}>
          {en.common.vnd.replace('{number}', formatNumber(ingredient.price))}
        </AppTextSupportColor>
        <Space horizontal={scale(10)} />
        <AppTextSupportColor
          variant="semibold_16"
          color={appTheme.colors.primary}>
          {en.cart.amountQuality.replace('{number}', ingredient.quantity)}
        </AppTextSupportColor>
      </WrapAmount>
    </WrapProduct>
  );
};

const WrapProduct = styled.View`
  margin: ${({theme}) => theme.gap_16}px 0;
  padding: ${({theme}) => theme.gap_10}px;
  background-color: ${({theme}) => theme.colors.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: ${({theme}) => theme.border_radius_8}px;
`;

const WrapInfoProduct = styled.View``;

// const WrapActionAmount = styled.View`
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   border: 1px solid ${({theme}) => theme.colors.stroke_primary};
//   border-radius: ${({theme}) => theme.border_radius_5}px;
//   padding: ${({theme}) => theme.gap_2}px;
//   max-width: ${scale(100)}px;
//   min-width: ${scale(100)}px;
// `;

// const TouchableMinus = styled(AppTouchable)`
//   background-color: ${({theme}) => theme.colors.button_background_thrid};
//   padding: ${({theme}) => theme.gap_2}px;
//   border-radius: ${({theme}) => theme.border_radius_5}px;
// `;

// const TouchableAdd = styled(AppTouchable)`
//   background-color: ${({theme}) => theme.colors.secondary};
//   padding: ${({theme}) => theme.gap_2}px;
//   border-radius: ${({theme}) => theme.border_radius_5}px;
// `;

const WrapAmount = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

export default IngredientCard;
