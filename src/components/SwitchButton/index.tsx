import {useSharedValue} from '@utils/hooks/useSharedValue';
import {AppText} from '@views/AppText';
import AppTouchable from '@views/AppTouchable';
import {debounce} from 'lodash';
import React, {useEffect} from 'react';
import {Animated, ColorValue} from 'react-native';
import styled, {useTheme} from 'styled-components/native';

interface SwitchButtonProps {
  values: string[];
  value: string;
  height?: number;
  durationAnimation?: number;
  onPressItem?: (value: string) => void;
  loading?: boolean;
  debounceTime?: number;
}

export function SwitchButton({
  height = 30,
  values = [],
  value,
  durationAnimation = 350,
  onPressItem,
  loading = false,
  debounceTime = 300,
  ...props
}: SwitchButtonProps) {
  const appTheme = useTheme();
  const [layoutContainer, setLayoutContainer] = React.useState({
    width: 0,
    height: 0,
  });
  const postionXViewSwipe = useSharedValue(new Animated.Value(0));

  useEffect(() => {
    const index = values.indexOf(value);
    const toValue = index * (layoutContainer.width / values.length);
    Animated.timing(postionXViewSwipe.value, {
      toValue:
        toValue + (index === 0 ? 1 : index === values.length - 1 ? -3 : 0),
      duration: durationAnimation,
      useNativeDriver: false,
    }).start();
  }, [
    value,
    durationAnimation,
    layoutContainer.width,
    values,
    postionXViewSwipe.value,
  ]);

  const _onPressItem = debounce(item => {
    onPressItem && onPressItem(item);
  }, debounceTime);

  return (
    <Container
      gap={appTheme.gap_2}
      height={height}
      onLayout={event => {
        setLayoutContainer({
          width: event.nativeEvent.layout.width,
          height: event.nativeEvent.layout.height,
        });
      }}
      color={appTheme.colors.primary + appTheme.alpha_06}
      backgroundColor={appTheme.colors.white}
      {...props}>
      {loading ? (
        <Loading color={appTheme.colors.loading_primary} />
      ) : (
        <>
          <ViewSwipe
            width={layoutContainer.width / values.length}
            height={layoutContainer.height - appTheme.gap_2 * 2}
            color={appTheme.colors.primary + appTheme.alpha_08}
            style={{
              left: postionXViewSwipe.value,
            }}
          />
          {values.map((item, index) => {
            return (
              <Touchable
                key={index}
                size={layoutContainer.width / values.length}
                onPress={() => {
                  if (value !== item) {
                    _onPressItem && _onPressItem(item);
                  }
                }}>
                <Title
                  variant="semibold_16"
                  color={
                    value === item
                      ? appTheme.colors.white
                      : appTheme.colors.primary + appTheme.alpha_02
                  }>
                  {item}
                </Title>
              </Touchable>
            );
          })}
        </>
      )}
    </Container>
  );
}

const Container = styled.View<{
  height: number;
  color: ColorValue;
  backgroundColor: ColorValue;
  gap: number;
}>`
  height: ${props => props.height}px;
  padding: ${props => props.gap}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: green;
  border-radius: ${props => props.theme.border_radius_5}px;
  border-width: 1px;
  border-color: ${props => props.color.toString()};
  background-color: ${props => props.backgroundColor.toString()};
`;

const Title = styled(AppText)<{color: ColorValue}>`
  text-align: center;
  color: ${props => props.color.toString()};
`;

const Touchable = styled(AppTouchable)<{size: number}>`
  flex: 1;
  align-self: center;
  justify-content: center;
  width: ${props => props.size}px;
  background-color: transparent;
`;

const ViewSwipe = styled(Animated.View)<{
  width: number;
  height: number;
  color: ColorValue;
}>`
  position: absolute;
  flex: 1;
  background-color: ${props => props.color.toString()};
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: ${props => props.theme.border_radius_3}px;
`;

const Loading = styled.ActivityIndicator``;
