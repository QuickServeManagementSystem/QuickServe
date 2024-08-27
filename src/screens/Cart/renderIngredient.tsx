import {en} from '@assets/text_constant';
import {formatNumber, Space} from '@utils/common';
import {AppTextSupportColor} from '@views/AppText';
import React, {useContext, useEffect} from 'react';
import {Dimensions, useWindowDimensions} from 'react-native';
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
  const dimensions = useWindowDimensions();

  useEffect(() => {
    setAmounts(ingredient.quantity || 1);
  }, [ingredient]);

  return (
    <WrapProduct>
      <WrapInfoProduct>
        <AppTextSupportColor variant="bold_16" color={appTheme.colors.black}>
          {ingredient.name}
        </AppTextSupportColor>
      </WrapInfoProduct>
      <WrapAmount>
        <AppTextSupportColor
          variant="semibold_16"
          color={appTheme.colors.primary}>
          {en.cart.amountQuality.replace('{number}', ingredient.quantity)}
        </AppTextSupportColor>
      </WrapAmount>
      <WrapAQuantity>
        <AppTextSupportColor
          variant="semibold_16"
          color={appTheme.colors.primary}>
          {en.common.vnd.replace('{number}', formatNumber(ingredient.price))}
        </AppTextSupportColor>
      </WrapAQuantity>
    </WrapProduct>
  );
};

const WrapProduct = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: ${({theme}) => theme.gap_10}px 0;
  padding: ${({theme}) => theme.gap_10}px;
  margin-left: ${Dimensions.get('window').width < 450
    ? scale(0)
    : scale(100)}px;
  margin-right: ${Dimensions.get('window').width < 450
    ? scale(0)
    : scale(100)}px;
  background-color: ${({theme}) => theme.colors.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: ${({theme}) => theme.border_radius_8}px;
  shadow-color: ${({theme}) => theme.colors.black};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  elevation: 5;
`;

const WrapInfoProduct = styled.View`
  flex-direction: row;
  justify-content: center;
  flex: 1;
`;

const WrapAmount = styled.View`
  flex-direction: row;
  padding-left: ${Dimensions.get('window').width < 450
    ? scale(0)
    : scale(30)}px;
  flex: 1;
`;
const WrapAQuantity = styled.View`
  flex-direction: row;
  flex: 0.5;
`;
export default IngredientCard;
