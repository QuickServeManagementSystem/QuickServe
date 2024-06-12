import AppIcon, {ICON_TYPE} from '@views/AppIcon';
import {AppText, VariantProp} from '@views/AppText';
import React from 'react';
import {
  ActivityIndicator,
  ColorValue,
  TouchableOpacityProps,
} from 'react-native';
import styled, {useTheme} from 'styled-components/native';

import {CustomTextVariant} from './AppText/variant';

interface AppButtonProps extends TouchableOpacityProps {
  // style
  title?: string;
  height?: number;
  borderRadius?: number;
  backgroundColor?: string;
  textColor?: string;
  outline?: boolean;
  loading?: boolean;
  loadingColor?: string;
  fillIconLeft?: ColorValue;
  fillIconRight?: ColorValue;
  fillIconCenter?: ColorValue;
  strokeIconLeft?: ColorValue;
  strokeIconCenter?: ColorValue;
  strokeIconRight?: ColorValue;

  variant?: VariantProp<CustomTextVariant>;
  iconRight?: ICON_TYPE;
  iconCenter?: ICON_TYPE;
  iconLeft?: ICON_TYPE;
}

export function AppButton({
  loading = false,
  height = 50,
  backgroundColor,
  ...props
}: AppButtonProps) {
  const appTheme = useTheme();

  return (
    <Button
      {...props}
      height={height}
      activeOpacity={props.activeOpacity || 0.8}
      backgroundColor={backgroundColor ?? appTheme.colors.button_primary}
      borderRadius={props.borderRadius}
      disabled={props.disabled}>
      <Content iconRight={props.iconRight} iconLeft={props.iconLeft}>
        {loading && !props.iconRight && !props.iconLeft && !props.iconCenter ? (
          <LoadingCustom
            color={
              props.loadingColor ? props.loadingColor : appTheme.colors.white
            }
          />
        ) : (
          <>
            {props.iconCenter ? (
              <IconCenter
                name={props.iconCenter}
                width={24}
                height={24}
                fill={props.fillIconCenter}
                stroke={props.strokeIconCenter}
              />
            ) : (
              <>
                {props.iconLeft ? (
                  <IconLeft
                    name={props.iconLeft}
                    width={24}
                    height={24}
                    fill={props.fillIconLeft}
                    stroke={props.strokeIconLeft}
                  />
                ) : null}
                <TextButton
                  variant={props.variant ?? 'semibold_16'}
                  iconRight={props.iconRight}
                  iconLeft={props.iconLeft}
                  textColor={props.textColor}>
                  {props.title}
                </TextButton>
                {props.iconRight ? (
                  <IconRight
                    name={props.iconRight}
                    width={24}
                    height={24}
                    fill={props.fillIconRight}
                    stroke={props.strokeIconRight}
                  />
                ) : null}
              </>
            )}
          </>
        )}
      </Content>
    </Button>
  );
}

const Button = styled.TouchableOpacity<{
  borderRadius?: number;
  backgroundColor?: string;
  disabled?: boolean;
  height?: number;
}>`
  flex: 1;
  min-height: ${props => props.height}px;
  justify-content: center;
  background-color: ${props =>
    props.disabled
      ? props.theme.colors.button_primary + props.theme.alpha_02
      : props.backgroundColor};
  align-items: center;
  border-radius: ${props => props.borderRadius || 5}px;
`;

const TextButton = styled(AppText)<{
  textColor?: string;
  iconRight?: ICON_TYPE;
  iconLeft?: ICON_TYPE;
}>`
  color: ${props => props.textColor || 'white'};
  flex: 1;
  text-align: ${props =>
    props.iconLeft && props.iconRight
      ? 'center'
      : props.iconRight
      ? 'left'
      : props.iconLeft
      ? 'right'
      : 'center'};
`;

const LoadingCustom = styled(ActivityIndicator)`
  align-self: center;
`;

const IconLeft = styled(AppIcon)``;
const IconRight = styled(AppIcon)``;
const IconCenter = styled(AppIcon)``;

const Content = styled.View<{
  iconLeft?: ICON_TYPE;
  iconRight?: ICON_TYPE;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: ${props =>
    props.iconLeft || props.iconRight ? 'space-between' : 'center'};
  flex: 1;
  padding: 0 20px;
`;
