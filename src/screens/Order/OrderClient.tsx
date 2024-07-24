import {en} from '@assets/text_constant';
import {Space, formatNumber} from '@utils/common';
import AppFlatlist from '@views/AppFlatlist';
import AppHeader from '@views/AppHeader';
import AppIcon from '@views/AppIcon';
import {AppText, AppTextSupportColor} from '@views/AppText';
import AppTouchable from '@views/AppTouchable';
import React from 'react';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

interface Props {}

const OrderClient: React.FC<Props> = () => {
  const appTheme = useTheme();

  return (
    <>
      <Space vertical={scale(appTheme.gap_5)} />
    </>
  );
};

const Container = styled.View`
  flex: 1;
`;
export default OrderClient;
