import {useAppDispatch, useAppSelector} from '@app-core/state';
import {
  getOrderByIdAction,
  selectOrderByIdSelector,
} from '@app-core/state/order/reducer';
import {
  paymentOCDAction,
  paymentVNPayOSAction,
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
import CryptoJS from 'crypto-js';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  NativeEventEmitter,
  NativeModules,
  StyleProp,
  ViewStyle,
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

import {Context} from '../../reducer';

type FormInput = {
  message: string;
};
const {PayZaloBridge} = NativeModules;

const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);

const Payment = () => {
  const appTheme = useTheme();
  const router: any = useRoute();
  const [showIngredients, setShowIngredients] = useState<{
    [key: string]: boolean;
  }>({});
  const {orderId} = router.params;
  const dispatch = useAppDispatch();
  const listProduct = useAppSelector(selectOrderByIdSelector);

  useEffect(() => {
    dispatch(getOrderByIdAction({orderId: orderId}));
  }, [dispatch, orderId]);

  const radioButtons = useMemo(
    () => [
      {
        id: '1',
        label: 'OCD',
        value: '1',
      },
      {
        id: '2',
        label: 'PayOS',
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
        paymentVNPayOSAction({
          orderId: orderId,
          totalPrice: listProduct?.totalPrice,
          orderInfo: data.message,
        }),
      );
    }
    // if (selectedId === '3') {
    //   createZaloPayOrder(listProduct?.totalPrice)
    //     .then(response => {
    //       console.log('ZaloPay response:', response);

    //       if (response.return_code === 1) {
    //         var payZP = NativeModules.PayZaloBridge;
    //         payZP.payOrder(response.zp_trans_token);
    //       } else {
    //         toast.error(
    //           'Thanh toán ZaloPay thất bại: ' + response.return_message,
    //         );
    //       }
    //     })
    //     .catch(error => {
    //       console.error('Error in ZaloPay payment:', error);
    //       toast.error('Đã xảy ra lỗi khi thực hiện thanh toán ZaloPay');
    //     });
    // }
    // clearData();
  };

  // const createZaloPayOrder = async totalPrice => {
  //   let apptransid = getCurrentDateYYMMDD() + '_' + new Date().getTime();
  //   let appid = 2553;
  //   let amount = parseInt(totalPrice);
  //   let appuser = 'ZaloPayDemo';
  //   let apptime = new Date().getTime();
  //   let embeddata = '{}';
  //   let item = '[]';
  //   let description = 'Thanh toán đơn hàng #' + apptransid;
  //   let hmacInput =
  //     appid +
  //     '|' +
  //     apptransid +
  //     '|' +
  //     appuser +
  //     '|' +
  //     amount +
  //     '|' +
  //     apptime +
  //     '|' +
  //     embeddata +
  //     '|' +
  //     item;
  //   let mac = CryptoJS.HmacSHA256(
  //     hmacInput,
  //     'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
  //   );

  //   var order = {
  //     app_id: appid,
  //     app_user: appuser,
  //     app_time: apptime,
  //     amount: amount,
  //     app_trans_id: apptransid,
  //     embed_data: embeddata,
  //     item: item,
  //     description: description,
  //     mac: mac,
  //   };

  //   let formBody = [];
  //   for (let i in order) {
  //     let encodedKey = encodeURIComponent(i);
  //     let encodedValue = encodeURIComponent(order[i]);
  //     formBody.push(encodedKey + '=' + encodedValue);
  //   }
  //   formBody = formBody.join('&');

  //   const response = await fetch('https://sb-openapi.zalopay.vn/v2/create', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  //     },
  //     body: formBody,
  //   }).then(response => response.json());

  //   return response;
  // };

  function getCurrentDateYYMMDD() {
    var todayDate = new Date().toISOString().slice(2, 10);
    return todayDate.split('-').join('');
  }

  const toggleIngredients = (productTemplateId: string) => {
    setShowIngredients(prev => ({
      ...prev,
      [productTemplateId]: !prev[productTemplateId],
    }));
  };

  const renderProductItem = ({item}: {item: any}) => {
    const ingredients = item.ingredients
      .map((ingredient: any) => ingredient.name)
      .join(', ');

    return (
      <ContainerCart key={item.productTemplateId}>
        <WrapProduct>
          <WrapInfoProduct>
            <AppTextSupportColor
              variant="bold_20"
              color={appTheme.colors.black}>
              {item.name}
            </AppTextSupportColor>
            <Space vertical={scale(2)} />
            {showIngredients[item.productTemplateId] && (
              <IngredientsContainer>
                <AppTextSupportColor
                  variant="regular_16"
                  color={appTheme.colors.gray_9}>
                  Thành phần: {ingredients}
                </AppTextSupportColor>
              </IngredientsContainer>
            )}
            <Space vertical={scale(2)} />
            <AppTouchable
              onPress={() => toggleIngredients(item.productTemplateId)}>
              <AppTextSupportColor
                variant="regular_16"
                color={appTheme.colors.primary}>
                {showIngredients[item.productTemplateId]
                  ? 'Ẩn đi'
                  : 'Hiện thêm'}
              </AppTextSupportColor>
            </AppTouchable>
          </WrapInfoProduct>
          <AppTextSupportColor
            variant="bold_20"
            color={appTheme.colors.primary}>
            {en.common.vnd.replace('{number}', formatNumber(item.price))}
          </AppTextSupportColor>
        </WrapProduct>
      </ContainerCart>
    );
  };

  return (
    <>
      <Space vertical={scale(5)} />
      <AppHeader
        title="Thanh Toán"
        onPressIconLeft={() => {
          toast.error('Thanh toán thất bại');
          Navigation.replace(APP_SCREEN.AppStack.name);
          clearData();
        }}
      />
      <Container>
        <AppTextSupportColor variant="regular_24" color={appTheme.colors.black}>
          Hoá đơn
        </AppTextSupportColor>
        <Space vertical={scale(5)} />
        <AppFlatlist
          data={listProduct?.products ?? []}
          renderItem={renderProductItem}
          keyExtractor={(item: any) => item.productTemplateId.toString()}
        />
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
              variant="bold_20"
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
              Tiến hành thanh toán
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

const WrapProduct = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({theme}) => theme.gap_10}px;
  background-color: ${({theme}) => theme.colors.white};
  border-radius: ${({theme}) => theme.border_radius_8}px;
  margin-bottom: ${({theme}) => theme.gap_10}px;
`;

const WrapInfoProduct = styled.View`
  max-width: 75%;
`;

const IngredientsContainer = styled.View`
  flex-wrap: nowrap;
  max-width: 100%;
`;

export default Payment;
