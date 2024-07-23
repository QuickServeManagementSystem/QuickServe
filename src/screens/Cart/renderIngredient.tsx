import {en} from '@assets/text_constant';
import {formatNumber, Space} from '@utils/common';
import AppIcon from '@views/AppIcon';
import {AppTextSupportColor} from '@views/AppText';
import AppTouchable from '@views/AppTouchable';
import React from 'react';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

interface IIngredientCard {
  ingredient: any;
  handelIncreaseAmount: (id: number) => void;
  handelDecreaseAmount: (id: number) => void;
  handelDelete: (id: number) => void;
}
const IngredientCard = ({
  ingredient,
  handelIncreaseAmount,
  handelDecreaseAmount,
  handelDelete,
}: IIngredientCard) => {
  const appTheme = useTheme();

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
      <WrapAction>
        <TouchableDelete onPress={() => handelDelete(ingredient.id)}>
          <AppIcon
            name="ic_delete"
            stroke={appTheme.colors.black}
            width={24}
            height={24}
          />
        </TouchableDelete>
        <Space vertical={scale(10)} />
        <WrapActionAmount>
          <TouchableMinus onPress={() => handelDecreaseAmount(ingredient.id)}>
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
            {ingredient.quantity}
          </AppTextSupportColor>
          <Space horizontal={scale(appTheme.gap_5)} />
          <TouchableAdd
            onPress={() => handelIncreaseAmount(ingredient.id)}
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
  );
};

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
export default IngredientCard;
