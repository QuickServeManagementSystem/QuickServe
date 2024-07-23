import {useAppDispatch, useAppSelector} from '@app-core/state';
import {
  getOrderByIdAction,
  selectOrderByIdSelector,
} from '@app-core/state/order/reducer';
import {
  paymentOCDAction,
  paymentVNPayAction,
} from '@app-core/state/payment/reducer';
import {en} from '@assets/text_constant';
import {FormTextInput} from '@components/Form/Input';
import {FormItemProps} from '@components/Form/Item';
import {APP_SCREEN} from '@navigation/constant';
import Navigation from '@navigation/Provider';
import {useRoute} from '@react-navigation/native';
import {formatNumber, MaxSize, Space} from '@utils/common';
import toast from '@utils/toast';
import AppFlatlist from '@views/AppFlatlist';
import AppHeader from '@views/AppHeader';
import {AppTextSupportColor} from '@views/AppText';
import AppTouchable from '@views/AppTouchable';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleProp, ViewStyle} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

import {Context} from '../../reducer';

type FormInput = {
  message: string;
};
const Payment = () => {
  const appTheme = useTheme();
  const router: any = useRoute();

  const [productIngredients, setProductIngredients] = useState<any[]>([]);
  const {orderId} = router.params;
  const dispatch = useAppDispatch();
  const listProduct = useAppSelector(selectOrderByIdSelector);

  useEffect(() => {
    dispatch(getOrderByIdAction({orderId: orderId}));
  }, [dispatch, orderId]);

  useEffect(() => {
    setProductIngredients(
      listProduct?.products?.flatMap(item => item.ingredients),
    );
  }, [listProduct]);

  const radioButtons = useMemo(
    () => [
      {
        id: '1',
        label: 'OCD',
        value: '1',
      },
      {
        id: '2',
        label: 'VNPay',
        value: '2',
      },
    ],
    [],
  );

  const [selectedId, setSelectedId] = useState<string>('1');

  const containerStyle: FormItemProps['containerStyle'] = {};

  const {handleSubmit, control} = useForm<FormInput>({
    defaultValues: {
      message: '',
    },
  });

  const {clearData} = useContext(Context);

  const formInputStyle: FormItemProps['containerStyle'] = {
    borderWidth: 1,
    padding: 10,
    backgroundColor: appTheme.colors.white,
  };

  const ContainerStyle: StyleProp<ViewStyle> = {};

  const handleOrder = (data: any) => {
    if (selectedId === '1') {
      dispatch(
        paymentOCDAction({
          orderId: orderId,
          totalPrice: listProduct?.totalPrice,
          orderInfo: data.message,
        }),
      );
    }
    if (selectedId === '2') {
      dispatch(
        paymentVNPayAction({
          orderId: orderId,
          totalPrice: listProduct?.totalPrice,
          orderInfo: data.message,
        }),
      );
    }
    // clearData();
  };
  const renderProductItem = ({item}: {item: any}) => {
    return (
      <ContainerCart key={item.productTemplateId}>
        <AppTextSupportColor
          variant="medium_18"
          color={appTheme.colors.primary}>
          {en.cart.mainDishes}
        </AppTextSupportColor>
        <Space vertical={scale(10)} />
        <WrapProduct>
          <WrapInfoProduct>
            <AppTextSupportColor
              variant="bold_16"
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
        </WrapProduct>
        <AppTextSupportColor
          variant="regular_16"
          color={appTheme.colors.primary}>
          {en.cart.ingedients}
        </AppTextSupportColor>
        <AppFlatlist
          data={productIngredients}
          renderItem={({item: ingredient}: any) => {
            return (
              <WrapProduct>
                <WrapInfoProduct>
                  <AppTextSupportColor
                    variant="bold_16"
                    color={appTheme.colors.black}>
                    {ingredient.name}
                  </AppTextSupportColor>
                  <Space vertical={scale(10)} />
                  <AppTextSupportColor
                    variant="semibold_16"
                    color={appTheme.colors.primary}>
                    {en.common.vnd.replace(
                      '{number}',
                      formatNumber(ingredient.price),
                    )}
                  </AppTextSupportColor>
                </WrapInfoProduct>
              </WrapProduct>
            );
          }}
          keyExtractor={(ingredient: any) => ingredient.id.toString()}
        />
      </ContainerCart>
    );
  };
  return (
    <>
      <AppHeader
        title="Thanh Toán"
        onPressIconLeft={() => {
          toast.error('Thanh toán thất bại');
          Navigation.replace(APP_SCREEN.HomeStack.name);
          clearData();
        }}
      />
      <Container>
        <AppFlatlist
          data={listProduct?.products ?? []}
          renderItem={renderProductItem}
          keyExtractor={(item: any) => item.productTemplateId.toString()}
        />
        <Space vertical={scale(160)} />
        <Footer>
          <FormTextInput
            placeholder={en.order.message}
            placeholderTextColor={appTheme.colors.text_input_primary}
            itemContainerStyle={containerStyle}
            containerStyle={formInputStyle}
            control={control}
            multiline
            numberOfLines={5}
            maxLength={500}
            name="message"
            inputMode="text"
            autoCorrect={false}
            autoComplete="off"
          />
          <WrapPrice>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={data => {
                setSelectedId(data);
              }}
              selectedId={selectedId}
              containerStyle={ContainerStyle}
              layout="row"
            />
            <AppTextSupportColor
              variant="semibold_16"
              color={appTheme.colors.primary}>
              {en.common.vnd.replace(
                '{number}',
                formatNumber(listProduct?.totalPrice ?? 0),
              )}
            </AppTextSupportColor>
          </WrapPrice>
          <ButtonSubmit onPress={handleSubmit(handleOrder)}>
            <AppTextSupportColor
              variant="semibold_16"
              color={appTheme.colors.white}>
              Xác Nhận Đơn Hàng
            </AppTextSupportColor>
          </ButtonSubmit>
        </Footer>
      </Container>
    </>
  );
};

const WrapPrice = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({theme}) => theme.gap_10}px;
`;

const Container = styled.View`
  flex: 1;
  margin: ${({theme}) => theme.gap_10}px;
`;

const ButtonSubmit = styled(AppTouchable)`
  width: ${MaxSize.WIDTH - 20}px;
  background-color: ${props => props.theme.colors.primary};
  justify-content: center;
  align-self: center;
  padding: ${props => props.theme.gap_10}px 0;
  align-items: center;
  border-radius: ${props => props.theme.border_radius_5}px;
`;

const Footer = styled.View`
  position: absolute;
  bottom: ${props => props.theme.gap_20}px;
  align-self: center;
`;

const ContainerCart = styled.View``;

const ButtonViewMore = styled(AppTouchable)`
  margin: ${({theme}) => theme.gap_10}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const WrapProduct = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({theme}) => theme.gap_10}px;
  background-color: ${({theme}) => theme.colors.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: ${({theme}) => theme.border_radius_8}px;
  margin-bottom: ${({theme}) => theme.gap_10}px;
`;

const WrapInfoProduct = styled.View``;

export default Payment;
