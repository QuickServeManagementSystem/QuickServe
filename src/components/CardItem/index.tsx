import {en} from '@assets/text_constant';
import {Space, formatNumber} from '@utils/common';
import AppIcon from '@views/AppIcon';
import {AppTextSupportColor} from '@views/AppText';
import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

interface CardItemProps {
  title?: string;
  imageCard?: ImageSourcePropType;
  price?: number;
}
const CardItem = ({
  title = 'Name Product',
  price,
  imageCard,
  ...props
}: CardItemProps) => {
  const appTheme = useTheme();
  return (
    <Container {...props}>
      <WrapInfo>
        {imageCard ? (
          <ImageCard source={imageCard} />
        ) : (
          <AppIcon name="no_food" width={24} height={24} />
        )}

        <WrapDesc>
          <AppTextSupportColor
            variant="bold_16"
            color={appTheme.colors.primary}>
            {title}
          </AppTextSupportColor>
          <Space vertical={scale(appTheme.gap_5)} />
          <AppTextSupportColor
            variant="medium_16"
            color={appTheme.colors.text_disable}>
            {en.common.vnd.replace('{number}', formatNumber(price))}
          </AppTextSupportColor>
        </WrapDesc>
      </WrapInfo>
      <LineBottom />
    </Container>
  );
};

const Container = styled.View`
  background-color: ${({theme}) => theme.colors.white};
  border-radius: ${({theme}) => theme.border_radius_12}px;
  margin: ${({theme}) => theme.gap_5}px;
  border-radius: 10px;
  flex: 1;
`;

const WrapInfo = styled.View`
  padding: ${({theme}) => theme.gap_10}px;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const ImageCard = styled.Image`
  width: 100%;
  height: ${scale(120)}px;
  border-radius: ${({theme}) => theme.border_radius_12}px;
`;

const WrapDesc = styled.View`
  align-items: center;
  margin: ${({theme}) => theme.gap_10}px;
`;

const LineBottom = styled.View`
  border-top-right-radius: ${({theme}) => theme.border_radius_5}px;
  border-top-left-radius: ${({theme}) => theme.border_radius_5}px;
  background-color: ${({theme}) => theme.colors.primary};
  height: ${({theme}) => theme.gap_8}px;
  align-self: center;
  width: ${({theme}) => scale(theme.gap_130)}px;
`;

export default CardItem;
