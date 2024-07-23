import {en} from '@assets/text_constant';
import {MaxSize, Space} from '@utils/common';
import AppIcon from '@views/AppIcon';
import {AppTextSupportColor} from '@views/AppText';
import AppTouchable from '@views/AppTouchable';
import React, {useImperativeHandle, useMemo, useState} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import RadioGroup from 'react-native-radio-buttons-group';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

export type PopupStatusRefType = {
  display: (onOk: (status: string) => void) => void;
  hide: () => void;
};

export type PopupStatusRef = React.ForwardedRef<PopupStatusRefType>;

export default React.forwardRef((props, ref: PopupStatusRef) => {
  const appTheme = useTheme();
  const actionSheetType = 'enterStatus';
  const popupStatusProps = React.useRef<(status: string) => void>();
  const [selectedId, setSelectedId] = useState<string>('1');

  const radioButtons = useMemo(
    () => [
      {
        id: '1',
        label: en.order.create,
        value: '1',
      },
      {
        id: '2',
        label: en.order.paid,

        value: '2',
      },
      {
        id: '3',
        label: en.order.pending,

        value: '3',
      },
      {
        id: '4',
        label: en.order.success,

        value: '4',
      },
      {
        id: '5',
        label: en.order.error,
        value: '5',
      },
    ],
    [],
  );

  const styleDefault: ViewStyle = {
    backgroundColor: appTheme.colors.transparent,
    shadowColor: appTheme.colors.transparent,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  };
  useImperativeHandle(ref, () => ({
    display: (onOk: (status: string) => void) => {
      popupStatusProps.current = onOk;
      SheetManager.show(actionSheetType);
    },
    hide: hidePopup,
  }));

  const hidePopup = () => {
    SheetManager.hide(actionSheetType);
  };
  const ContainerStyle: StyleProp<ViewStyle> = {
    alignItems: 'flex-start',
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
            Trạng Thái Đơn Hàng
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
          <RadioGroup
            radioButtons={radioButtons}
            onPress={data => {
              setSelectedId(data);
            }}
            labelStyle={[
              [appTheme.fonts.medium_16],
              {color: appTheme.colors.black},
            ]}
            selectedId={selectedId}
            containerStyle={ContainerStyle}
          />
        </WrapContent>
        <Space vertical={scale(appTheme.gap_10)} />
        <ButtonSubmit
          onPress={() => {
            popupStatusProps.current && popupStatusProps.current(selectedId);
            hidePopup();
          }}>
          <AppTextSupportColor
            variant="semibold_16"
            color={appTheme.colors.white}>
            {en.common.confirm}
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
