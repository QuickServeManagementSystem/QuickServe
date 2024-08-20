import {Ingredient, Step} from '@app-core/state/ingredient/type';
import {en} from '@assets/text_constant';
import {useAppContext} from '@utils/appContext';
import {formatNumber, Space} from '@utils/common';
import AppFlatlist from '@views/AppFlatlist';
import AppIcon from '@views/AppIcon';
import {AppText, AppTextSupportColor} from '@views/AppText';
import AppTouchable from '@views/AppTouchable';
import React, {useContext, useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

import {Context} from '../../../reducer';

interface IIngredients {
  itemStep: Step;
  productId: number;
  listStep: Step[];
}
const Ingredients = ({itemStep, productId, listStep}: IIngredients) => {
  const appTheme = useTheme();
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const {state, orderIngredient} = useContext(Context);
  const {totalPrice} = useAppContext();

  // Sử dụng object để lưu trữ số lượng cho từng món ăn
  const [amounts, setAmounts] = useState<{[key: number]: number}>({});

  useEffect(() => {
    const arrayStepIds = state.orderIngredient
      .filter((_ing: any) => _ing.productId === productId)
      .flatMap((_ing: any) => _ing.stepId);
    const idsStepList = listStep.map(step => step.id);

    const uniqueStepIds = [...new Set(arrayStepIds)];

    const areArraysEqual =
      uniqueStepIds.length === idsStepList.length &&
      uniqueStepIds.every((item: any) => idsStepList.includes(item));

    if (!areArraysEqual) {
      totalPrice.current?.onOk(false);
    } else {
      totalPrice.current?.onOk(true);
    }
  }, [listStep, productId, state.orderIngredient, totalPrice]);

  const handelDecreaseAmount = (item: any) => {
    const updatedAmount = (amounts[item.id] || 1) - 1;
    if (updatedAmount < 1) return;

    setAmounts(prev => ({...prev, [item.id]: updatedAmount}));
    orderIngredient({
      productId,
      stepId: itemStep.id,
      id: item.id,
      name: item.name,
      price: item.price,
      totalProductPrice: item.price * updatedAmount,
      img: item.img,
      quantity: updatedAmount,
    });
  };

  const handelIncreaseAmount = (item: any) => {
    const updatedAmount = (amounts[item.id] || 1) + 1;

    setAmounts(prev => ({...prev, [item.id]: updatedAmount}));
    orderIngredient({
      productId,
      stepId: itemStep.id,
      id: item.id,
      name: item.name,
      price: item.price,
      totalProductPrice: item.price * updatedAmount,
      img: item.img,
      quantity: updatedAmount,
    });
  };

  const handleSingleSelection = (ingredient: Ingredient) => {
    const initialAmount = amounts[ingredient.id] || 1;
    setAmounts(prev => ({...prev, [ingredient.id]: initialAmount}));

    orderIngredient({
      productId,
      stepId: itemStep.id,
      id: ingredient.id,
      name: ingredient.name,
      price: ingredient.price,
      img: ingredient.img,
      totalProductPrice: ingredient.price * initialAmount,
      quantity: initialAmount,
      max: ingredient.max,
      isSelected: true,
    });
  };

  const renderIngredientDetail = (item: Ingredient) => {
    const isSelected = state.orderIngredient.some(
      (ing: any) =>
        ing.id === item.id &&
        ing.stepId === itemStep.id &&
        ing.productId === productId,
    );
    let isDisabled = false;

    const index = state.orderIngredient.findIndex(
      (ing: any) => ing.stepId === itemStep.id,
    );

    if (index !== -1) {
      const numberSelect = state.orderIngredient.filter(
        (ing: any) => ing.stepId === itemStep.id && ing.productId === productId,
      ).length;

      if (numberSelect === itemStep.max && !isSelected) {
        isDisabled = true;
      }
    }

    return (
      <ListInfo key={item.id} isSelected={isSelected} isDisabled={isDisabled}>
        <AppTouchable
          disabled={isDisabled}
          onPress={() => handleSingleSelection(item)}>
          <WrapImageIngredient>
            <ImageIngredient source={{uri: item.img}} />
            <WrapInfo>
              <AppText variant="regular_16">{item.name}</AppText>
              <Space vertical={scale(5)} />
              <WrapPrice>
                <AppTextSupportColor
                  variant="regular_16"
                  color={appTheme.colors.primary}>
                  {en.common.vnd.replace('{number}', formatNumber(item.price))}
                </AppTextSupportColor>
              </WrapPrice>
            </WrapInfo>
          </WrapImageIngredient>
        </AppTouchable>
        <Space vertical={10} />
        {isSelected && (
          <WrapActionAmount>
            <TouchableMinus
              disabled={amounts[item.id] < 0}
              onPress={() => handelDecreaseAmount(item)}>
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
              {amounts[item.id] || 1}
            </AppTextSupportColor>
            <Space horizontal={scale(appTheme.gap_5)} />
            <TouchableAdd
              onPress={() => handelIncreaseAmount(item)}
              disabled={amounts[item.id] === item.max}>
              <AppIcon
                name="ic_add"
                stroke={appTheme.colors.stroke_third}
                width={24}
                height={24}
              />
            </TouchableAdd>
          </WrapActionAmount>
        )}
      </ListInfo>
    );
  };

  const handleExpandIngredient = (id: number) => {
    setExpandedIds(
      expandedIds.includes(id)
        ? expandedIds.filter(expId => expId !== id)
        : [...expandedIds, id],
    );
  };

  const numberSelect = state.orderIngredient.filter(
    (ing: any) => ing.stepId === itemStep.id && ing.productId === productId,
  ).length;

  return (
    <Container>
      <WrapIngredients onPress={() => handleExpandIngredient(itemStep.id)}>
        <WrapImage>
          <AppTextSupportColor
            color={appTheme.colors.black}
            variant="semibold_16">
            {itemStep.step_name}: Chọn {numberSelect} trong {itemStep.max}
          </AppTextSupportColor>
        </WrapImage>
        <AppIcon
          name={
            expandedIds.includes(itemStep.id)
              ? 'ic_chevron_up'
              : 'ic_chevron_down'
          }
          stroke={appTheme.colors.primary}
          width={24}
          height={24}
        />
      </WrapIngredients>
      <ListIngredient>
        {expandedIds.includes(itemStep.id) && (
          <AppFlatlist
            data={itemStep.ingredient}
            renderItem={({item}) => renderIngredientDetail(item)}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </ListIngredient>
    </Container>
  );
};

const ListIngredient = styled.View`
  margin: 0 ${({theme}) => theme.gap_20}px;
`;

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

const ListInfo = styled.View<{isSelected: boolean; isDisabled: boolean}>`
  padding: ${scale(5)}px;
  margin-top: ${scale(5)}px;
  margin-right: ${scale(10)}px;
  border-radius: ${({theme}) => theme.border_radius_8}px;
  background-color: ${({theme}) => theme.colors.white};
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 2px rgba(24, 24, 24, 0.1);
  opacity: ${({isDisabled}) => (isDisabled ? 0.5 : 1)};
  border: ${({isSelected, theme}) =>
    isSelected ? `2px solid ${theme.colors.green}` : 'none'};
  max-width: ${scale(130)}px;
`;

const WrapImageIngredient = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${scale(10)}px;
`;

const WrapInfo = styled.View`
  margin-top: ${scale(5)}px;
`;

const WrapPrice = styled.View`
  margin-top: ${scale(1)}px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const ImageIngredient = styled.Image`
  height: ${Dimensions.get('window').width < 450 ? scale(80) : scale(70)}px;
  width: ${Dimensions.get('window').width < 450 ? scale(90) : scale(90)}px;
  margin-right: ${({theme}) => theme.gap_5}px;
  border-radius: ${({theme}) => theme.border_radius_8}px;
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

export default Ingredients;
