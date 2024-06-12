import React from 'react';
import {TextInput, TextInputProps, ViewProps} from 'react-native';
import styled, {useTheme} from 'styled-components/native';

import AppIcon, {AppIconProps, ICON_TYPE} from './AppIcon';
export interface AppTextInputProps extends TextInputProps {
  containerStyle?: ViewProps['style'];
  iconRight?: ICON_TYPE;
  iconRightProps?: Omit<AppIconProps, 'name'>;
  iconContainerStyle?: ViewProps['style'];
}
const IconContainer = styled.View`
  margin-right: ${props => props.theme.gap_8}px;
  margin-left: ${props => props.theme.gap_8}px;
`;

const StyledAppIcon = styled(AppIcon)`
  width: 20px;
  height: 20px;
  fill_color: ${props => props.theme.colors.text_primary};
  stroke: ${props => props.theme.colors.text_primary};
`;

const StyledTextInput = styled.TextInput.attrs<{
  color?: string;
}>(props => ({
  autoCapitalize: 'none',
  color: props.color ?? props.theme.colors.text_primary,
}))`
  flex: 1;
  font-size: 16px;
  font-family: ${props => props.theme.fonts.regular_14.fontFamily};
  color: ${props => props.color ?? props.theme.colors.text_primary};
`;

const ContainerInput = styled.View`
  flex-direction: row;
  background-color: ${props =>
    props.theme.colors.primary + props.theme.alpha_02};
  align-items: center;
`;

export const Input = (
  {
    containerStyle,
    iconRight,
    iconRightProps,
    iconContainerStyle,
    ...props
  }: AppTextInputProps,
  ref: React.ForwardedRef<TextInput>,
): JSX.Element => {
  const appTheme = useTheme();

  return (
    <ContainerInput style={[containerStyle]}>
      <StyledTextInput ref={ref} {...props} />
      {iconRight && (
        <IconContainer style={[iconContainerStyle]}>
          <StyledAppIcon name={iconRight} {...iconRightProps} />
        </IconContainer>
      )}
    </ContainerInput>
  );
};

type AppTextInputComponent = (
  props: AppTextInputProps & {ref?: React.RefObject<TextInput>},
) => JSX.Element;

export const AppTextInput = React.forwardRef(Input);
