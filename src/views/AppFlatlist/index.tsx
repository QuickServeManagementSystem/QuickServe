import {en} from '@assets/text_constant';
import {MaxSize} from '@utils/common';
import AppIcon, {ICON_TYPE} from '@views/AppIcon';
import {AppTextSupportColor} from '@views/AppText';
import React from 'react';
import {
  ActivityIndicator,
  FlatListProps,
  RefreshControl,
  FlatList,
} from 'react-native';
import styled, {useTheme} from 'styled-components/native';

interface AppFlatListProps<ItemT> extends FlatListProps<ItemT> {
  data: ArrayLike<any>;
  onLoadMore?: () => void;
  onRefresh?: () => void;
  ListSkeletonComponent?:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | null;
  isRefreshing?: boolean;
  isLoading?: boolean;
  isFirstLoading?: boolean;
  isLoadMore?: boolean;
  iconNodata?: ICON_TYPE;
  messageNodata?: string;
  isShowUIEmptyData?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  height?: number;
}

const AppFlatlist = ({
  onLoadMore,
  onRefresh,
  ListSkeletonComponent,
  data,
  height,
  isRefreshing = false,
  isFirstLoading = false,
  isLoading = false,
  isLoadMore = false,
  isShowUIEmptyData = true,
  showsHorizontalScrollIndicator = false,
  showsVerticalScrollIndicator = false,
  ...props
}: AppFlatListProps<any>) => {
  const appTheme = useTheme();

  const renderFooterList = () => {
    if (isLoadMore) {
      return (
        <ContainerLoading>
          <ActivityIndicator color={appTheme.colors.primary} />
        </ContainerLoading>
      );
    }

    return null;
  };
  const renderEmtyList = () => {
    if (!isShowUIEmptyData) return null;
    if (isFirstLoading) {
      return ListSkeletonComponent;
    }
    if (data?.length === 0) {
      return (
        <Container height={height}>
          <AppIconStyle
            name={props.iconNodata ? props.iconNodata : 'ic_workbench'}
            width={50}
            height={50}
            fill={appTheme.colors.text_fourth}
          />
          <AppTextSupportColor
            variant="light_20"
            color={appTheme.colors.text_fourth}>
            {props.messageNodata ?? en.common.noData}
          </AppTextSupportColor>
        </Container>
      );
    }
  };
  return (
    <FlatList
      {...props}
      data={data}
      onEndReachedThreshold={0.05}
      onEndReached={onLoadMore}
      keyExtractor={(_item, index) => index.toString()}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={appTheme.colors.primary}
          />
        ) : undefined
      }
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      ListFooterComponent={renderFooterList}
      ListEmptyComponent={renderEmtyList()}
    />
  );
};

const ContainerLoading = styled.View`
  align-items: center;
  justify-content: center;
  margin: ${props => props.theme.gap_8}px ${props => props.theme.gap_0};
`;

const Container = styled.View<{
  height?: number;
}>`
  align-items: center;
  justify-content: center;
  height: ${props => (props.height ? props.height : MaxSize.HEIGHT / 1.5)}px;
`;

const AppIconStyle = styled(AppIcon)`
  margin-bottom: ${props => props.theme.gap_15}px;
`;
export default AppFlatlist;
