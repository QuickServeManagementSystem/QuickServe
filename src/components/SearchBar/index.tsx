import AppIcon from '@views/AppIcon';
import {AppTextSupportColor} from '@views/AppText';
import AppTouchable from '@views/AppTouchable';
import {debounce} from 'lodash';
import React from 'react';
import {ColorValue, TextInputProps, ViewProps} from 'react-native';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

interface SearchBarProps extends TextInputProps {
  containerStyle?: ViewProps['style'];
  placeholderTextColor?: ColorValue;
  onPressFilter?: () => void;
  onChangeText?: (text: string) => void;
  debounceTime?: number;
  filterCount?: number;
}
export function SearchBar({
  containerStyle,
  placeholderTextColor,
  onPressFilter,
  onChangeText,
  debounceTime = 400,
  filterCount = 0,
  ...props
}: SearchBarProps) {
  const appTheme = useTheme();

  const debounced = debounce(item => {
    onChangeText && onChangeText(item);
  }, debounceTime);
  return (
    <Wrap>
      <Container style={[containerStyle]}>
        <Content>
          <AppIcon name="ic_search" fill={appTheme.colors.text_disable} />
          <Input
            {...props}
            placeholderTextColor={
              placeholderTextColor ??
              appTheme.colors.text_primary + appTheme.alpha_05
            }
            onChangeText={debounced}
          />
        </Content>
      </Container>
      {onPressFilter && (
        <>
          <Space />
          <ViewFilter filterCount={filterCount} onPress={onPressFilter}>
            <IconFilter
              name="ic_filter"
              fill={appTheme.colors.primary}
              filterCount={filterCount}
            />
            {filterCount !== 0 && (
              <ViewBadge>
                <TitleBadge variant="medium_10" color={appTheme.colors.white}>
                  {filterCount > 99 ? '99+' : filterCount}
                </TitleBadge>
              </ViewBadge>
            )}
          </ViewFilter>
        </>
      )}
    </Wrap>
  );
}

const Wrap = styled.View`
  flex-direction: row;
  min-height: 42px;
`;

const Container = styled.View`
  flex-direction: row;
  border-radius: ${props => props.theme.border_radius_5}px;
  padding: ${props => props.theme.gap_0}px ${props => props.theme.gap_10}px;
  border: 1px solid ${props => props.theme.colors.black + props.theme.alpha_025};
  flex: 1;
`;

const Content = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const Input = styled.TextInput`
  margin-left: ${props => props.theme.gap_8}px;
  font-family: ${props => props.theme.fonts.medium_18.fontFamily};
  font-size: ${props => props.theme.fonts.medium_18.fontSize}px;
  flex: 1;
`;

const ViewFilter = styled(AppTouchable)<{filterCount: number}>`
  border: 1px solid ${props => props.theme.colors.black + props.theme.alpha_025};
  flex: 0.2;
  border-radius: ${props => props.theme.border_radius_5}px;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  ${props =>
    props.filterCount !== 0 &&
    `background-color: ${props.theme.colors.primary + props.theme.alpha_02};`}
`;

const Space = styled.View`
  width: ${scale(4)}px;
`;

const ViewBadge = styled.View`
  border-radius: ${props => props.theme.border_radius_5}px;
  background-color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.gap_0}px ${props => props.theme.gap_4}px
    ${props => props.theme.gap_0}px ${props => props.theme.gap_4}px;
  position: absolute;
  top: ${props => props.theme.gap_5}px;
  left: ${props => props.theme.gap_25}px;
  min-width: ${scale(18)}px;
  justify-content: center;
  align-items: center;
`;

const TitleBadge = styled(AppTextSupportColor)``;

const IconFilter = styled(AppIcon)<{filterCount: number}>`
  ${props => props.filterCount !== 0 && `right: ${props.theme.gap_2}px;`}
`;
