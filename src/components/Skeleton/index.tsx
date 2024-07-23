import React, {useEffect} from 'react';
import {StyleSheet, Animated, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';
const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);
const WIDTH_SCREEN = Dimensions.get('window').width;
interface Props {
  height?: number;
  width?: number;
  color?: string;
  duration?: number;
  borderRadius?: number;
}

const Skeleton: React.FC<Props> = ({
  height,
  width,
  color = '#E9E9E9',
  duration = 1500,
  borderRadius = 6,
  ...props
}) => {
  const animatedValue = new Animated.Value(0);
  const appTheme = useTheme();
  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
    ).start();
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-(width || WIDTH_SCREEN), width || WIDTH_SCREEN],
  });

  return (
    <View
      width={width}
      height={height}
      color={color}
      borderRadius={borderRadius}
      {...props}>
      <AnimatedLG
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{translateX}],
            backgroundColor: appTheme.colors.white + appTheme.alpha_02,
          },
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[color, appTheme.colors.white + appTheme.alpha_05, color]}
      />
    </View>
  );
};

const View = styled.View<{
  borderRadius?: number;
  color: string;
  width?: number;
  height?: number;
}>`
  ${props => props.borderRadius && `border-radius: ${props.borderRadius}px;`}
  ${props => props.width && `width: ${scale(props.width)}px;`}
  ${props => props.height && `height: ${verticalScale(props.height)}px;`}  
  background-color: ${props => props.color};
  overflow: hidden;
  opacity: 0.4;
`;

export default Skeleton;
