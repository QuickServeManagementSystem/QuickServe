import Navigator from '@navigation/Provider';
import {MaxSize} from '@utils/common';
import {getStatusBarHeight} from '@utils/GetHeightStatusBar';
import AppIcon, {ICON_TYPE} from '@views/AppIcon';
import {AppText} from '@views/AppText';
import React from 'react';
import {ColorValue, Dimensions} from 'react-native';
import styled, {useTheme} from 'styled-components/native';

interface Props {
  title?: string;
  icon?: ICON_TYPE;
  iconRight?: ICON_TYPE;
  colorTitle?: ColorValue;
  colorIcon?: ColorValue;
  colorIconLeft?: ColorValue;
  colorIconRight?: ColorValue;
  iconLeft?: ICON_TYPE;
  spacingBottom?: number;
  backgroundColor?: ColorValue;
  onPressIconRight?: () => void;
  onPressIconLeft?: () => void;
  widthIcon?: number;
  widthIconLeft?: number;
  heightIconLeft?: number;
  heightIcon?: number;
  rightComponent?: React.ReactNode;
}

const AppHeader: React.FC<Props> = ({
  title,
  icon,
  iconRight,
  colorTitle,
  colorIcon,
  colorIconLeft,
  colorIconRight,
  iconLeft,
  spacingBottom,
  backgroundColor,
  onPressIconRight,
  onPressIconLeft,
  widthIcon = 24,
  widthIconLeft = 24,
  heightIconLeft = 24,
  heightIcon = 24,
  rightComponent,
}) => {
  const appTheme = useTheme();
  return (
    <>
      <Container backgroundColor={backgroundColor}>
        <IconLeft
          name={iconLeft ?? 'ic_arrow_left'}
          width={widthIconLeft}
          height={heightIconLeft}
          fill={colorIconLeft ?? appTheme.colors.header_primary}
          onPress={() => {
            onPressIconLeft ? onPressIconLeft() : Navigator.goBack();
          }}
        />

        {title && !icon && (
          <TitleHeader
            numberOfLines={2}
            variant="regular_16"
            color={colorTitle ?? appTheme.colors.header_primary}>
            {title}
          </TitleHeader>
        )}

        {icon && !title && (
          <Icon
            name={icon}
            fill={colorIcon ?? appTheme.colors.header_secondary}
            width={widthIcon}
            height={heightIcon}
          />
        )}

        {iconRight && !rightComponent ? (
          <IconRight
            name={iconRight}
            width={24}
            height={24}
            fill={colorIconRight ?? appTheme.colors.header_primary}
            onPress={onPressIconRight}
          />
        ) : (
          <IconEmpty />
        )}
        {rightComponent && !iconRight && (
          <ComponentRight>{rightComponent}</ComponentRight>
        )}
      </Container>
    </>
  );
};

const Container = styled.View<{backgroundColor?: ColorValue}>`
  width: ${MaxSize.WIDTH}px;
  margin-top: ${Dimensions.get('window').width < 450
    ? getStatusBarHeight() + 20
    : 0}px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 6px 0px 6px 0px;
  background-color: ${props =>
    props.backgroundColor?.toString() ?? 'transparent'};
`;

const ComponentRight = styled.View`
  margin-right: 19px;
`;
const TitleHeader = styled(AppText)<{color: ColorValue}>`
  align-self: center;
  text-align: center;
  color: ${props => props.color.toString()};
  /* 
  48: width of icon
  20: spacing between icon and title
  38: martin right & left of icon
  */
  width: ${MaxSize.WIDTH - 48 - 20 - 38}px;
`;

const IconLeft = styled(AppIcon)`
  margin-left: 19px;
`;

const IconRight = styled(AppIcon)`
  margin-right: 19px;
`;

const Icon = styled(AppIcon)`
  align-self: center;
`;

const IconEmpty = styled.View`
  width: 24px;
  height: 24px;
  margin-right: 19px;
`;

const Space = styled.View<{height?: number}>`
  height: ${props => props.height ?? 10}px;
`;

export default AppHeader;
