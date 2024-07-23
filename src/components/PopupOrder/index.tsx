import {en} from '@assets/text_constant';
import {FormTextInput} from '@components/Form/Input';
import {FormItemProps} from '@components/Form/Item';
import {MaxSize, Space} from '@utils/common';
import AppIcon from '@views/AppIcon';
import {AppTextSupportColor} from '@views/AppText';
import AppTouchable from '@views/AppTouchable';
import React, {BaseSyntheticEvent, useImperativeHandle} from 'react';
import {useForm} from 'react-hook-form';
import {ViewStyle} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

export type PopupOrderRefType = {
  display: (
    onOk: (data: {phoneNumber: string; fullName: string}) => void,
  ) => void;
  hide: () => void;
};

export type PopupOrderRef = React.ForwardedRef<PopupOrderRefType>;

export default React.forwardRef((props, ref: PopupOrderRef) => {
  const appTheme = useTheme();
  const actionSheetType = 'enterOrder';
  const popupOrderProps =
    React.useRef<
      (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
    >();

  const styleDefault: ViewStyle = {
    backgroundColor: appTheme.colors.transparent,
    shadowColor: appTheme.colors.transparent,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  };

  const {handleSubmit, control, setValue} = useForm<{
    phoneNumber: string;
    fullName: string;
  }>({
    defaultValues: {
      phoneNumber: '',
      fullName: '',
    },
  });

  useImperativeHandle(ref, () => ({
    display: (
      onOk: (data: {phoneNumber: string; fullName: string}) => void,
    ) => {
      SheetManager.show(actionSheetType);
      popupOrderProps.current = handleSubmit(data => {
        onOk(data);
        hidePopup();
      });
    },
    hide: hidePopup,
  }));

  const hidePopup = () => {
    SheetManager.hide(actionSheetType);
    setValue('phoneNumber', '');
    setValue('fullName', '');
  };

  const containerStyle: FormItemProps['containerStyle'] = {};

  const formInputStyle: FormItemProps['containerStyle'] = {
    borderWidth: 1,
    padding: 10,
    backgroundColor: appTheme.colors.white,
  };

  return (
    <ActionSheet
      id={actionSheetType}
      overlayColor={appTheme.colors.black + appTheme.alpha_05}
      defaultOverlayOpacity={0.5}
      elevation={0}
      safeAreaInsets={{bottom: 0, top: 0, left: 0, right: 0}}
      containerStyle={styleDefault}>
      <Container {...props}>
        <WrapHeader>
          <AppTextSupportColor
            variant="semibold_16"
            color={appTheme.colors.primary}>
            {en.common.phoneNumber}
          </AppTextSupportColor>
          <AppIcon
            name="ic_x"
            width={24}
            height={24}
            fill_color={appTheme.colors.black}
            onPress={hidePopup}
          />
        </WrapHeader>
        <Space vertical={scale(appTheme.gap_10)} />
        <WrapContent>
          <FormTextInput
            fullWidth
            placeholder={en.common.phoneNumber}
            placeholderTextColor={appTheme.colors.text_input_primary}
            itemContainerStyle={containerStyle}
            containerStyle={formInputStyle}
            control={control}
            name="phoneNumber"
            autoCorrect={false}
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            autoComplete="off"
          />
          <FormTextInput
            fullWidth
            placeholder={en.common.fullName}
            placeholderTextColor={appTheme.colors.text_input_primary}
            itemContainerStyle={containerStyle}
            containerStyle={formInputStyle}
            control={control}
            name="fullName"
            autoCorrect={false}
            textContentType="none"
            autoComplete="off"
            isRequired
            rules={{required: en.error.requireEmail}}
          />
        </WrapContent>
        <Space vertical={scale(appTheme.gap_10)} />
        <ButtonSubmit
          onPress={() => {
            popupOrderProps.current && popupOrderProps.current();
          }}>
          <AppTextSupportColor
            variant="semibold_16"
            color={appTheme.colors.white}>
            {en.common.order}
          </AppTextSupportColor>
        </ButtonSubmit>
      </Container>
    </ActionSheet>
  );
});

const ButtonSubmit = styled(AppTouchable)`
  background-color: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.border_radius_5}px;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;
const Container = styled.View`
  width: ${MaxSize.WIDTH}px;
  border-radius: ${props => props.theme.border_radius_5}px;
  background-color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.gap_23}px ${props => props.theme.gap_26}px
    ${props => props.theme.gap_30}px ${props => props.theme.gap_26}px;
`;

const WrapHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const WrapContent = styled.View``;
