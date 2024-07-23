import React from 'react';
import {RefreshControl, ScrollViewProps} from 'react-native';
import styled, {useTheme} from 'styled-components/native';

// const pullRefresh = require('@assets/animation/pull_refresh.json');
interface ScrollWapperProps extends ScrollViewProps {
  loading?: boolean;
  children: any;
  gapV?: number;
  gapH?: number;
  onRefresh?: () => void;
}
const ScrollWrap: React.FC<ScrollWapperProps> = ({
  loading = false,
  children,
  gapV = 0,
  gapH = 0,
  onRefresh,
  ...props
}) => {
  const appTheme = useTheme();
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      gapV={gapV}
      gapH={gapH}
      scrollEventThrottle={16}
      refreshControl={
        <RefreshControl
          tintColor={appTheme.colors.primary}
          refreshing={loading}
          onRefresh={onRefresh}
        />
      }
      {...props}>
      {children}
    </ScrollView>
  );
};

const ScrollView = styled.ScrollView<{gapV: number; gapH: number}>`
  padding: ${props => props.gapV}px ${props => props.gapH}px
    ${props => props.gapV}px ${props => props.gapH}px;
`;

// const LottieAnimation = styled(LottieView)<{opacity: number; height: number}>`
//   align-self: center;
//   height: ${props => props.height}px;
//   width: 100px;
//   opacity: ${props => props.opacity};
//   background-color: red;
// `;

export default ScrollWrap;
