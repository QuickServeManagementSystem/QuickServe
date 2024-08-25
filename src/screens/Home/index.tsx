import {useAppDispatch, useAppSelector} from '@app-core/state';
import {
  categoriesAction,
  getListCategories,
  getListProruct,
  productAction,
} from '@app-core/state/product/reducer';
import {TCategory, TProduct} from '@app-core/state/product/type';
import {selectSelectedStoreId} from '@app-core/state/store/reducer';
import {en} from '@assets/text_constant';
import CardItem from '@components/CardItem';
import {SearchBar} from '@components/SearchBar';
import Skeleton from '@components/Skeleton';
import {APP_SCREEN} from '@navigation/constant';
import Navigation from '@navigation/Provider';
import {useRoute} from '@react-navigation/native';
import {Space} from '@utils/common';
import useAPIList from '@utils/hooks/useAPIList';
import AppFlatlist from '@views/AppFlatlist';
import AppHeader from '@views/AppHeader';
import {AppTextSupportColor} from '@views/AppText';
import AppTouchable from '@views/AppTouchable';
import React, {useContext, useEffect} from 'react';
import {useWindowDimensions, ViewStyle} from 'react-native';
import {Dimensions} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import styled, {useTheme} from 'styled-components/native';

import {Context} from '../../reducer';

function App(): React.JSX.Element {
  const appTheme = useTheme();
  const dimensions = useWindowDimensions();
  const isPortrait = dimensions.height > dimensions.width;
  const numColumns = isPortrait ? 2 : 4;
  const [selectedCategory, setSelectedCategory] = React.useState<TCategory>();
  const [listProduct, setListProduct] = React.useState<TProduct[]>([]);
  const dispatch = useAppDispatch();
  const listCategory = useAppSelector(getListCategories);
  const route = useRoute();
  const {status} = route.params || {};
  const {clearData} = useContext(Context);
  const {
    data: dataProduct,
    isFirstLoading: isFirstLoadingProduct,
    isLoadMore: isLoadMoreProduct,
    isRefreshing: isRefreshingProduct,
  } = useAPIList(productAction, getListProruct);

  useEffect(() => {
    if (!selectedCategory) setListProduct(dataProduct ?? []);
  }, [dataProduct, selectedCategory]);

  useEffect(() => {
    dispatch(categoriesAction({}));
  }, [dispatch]);

  useEffect(() => {
    clearData();
  }, [status]);
  const listProductStyle: ViewStyle = {
    flexDirection: 'column',
    paddingBottom: scale(100),
  };

  const renderProduct = (item: TProduct) => {
    return (
      <ProductItem
        key={item.id}
        onPress={() => {
          Navigation.navigateTo(APP_SCREEN.DetailProduct.name, {
            detailProduct: item,
          });
        }}>
        <CardItem
          title={item.name}
          price={item.price ?? 0}
          imageCard={
            item.imageUrl
              ? {uri: item.imageUrl}
              : require('@assets/images/no_food.png')
          }
        />
      </ProductItem>
    );
  };

  const handelCategories = (item: TCategory) => {
    setSelectedCategory(prev => (prev?.id === item.id ? undefined : item));
    setListProduct(dataProduct?.filter(i => i.categoryId === item.id) ?? []);
  };

  const renderCategory = (item: TCategory) => {
    const isSelected = selectedCategory?.id === item.id;

    return (
      <TouchableCategory
        onPress={() => handelCategories(item)}
        backgroundColor={
          isSelected ? appTheme.colors.primary : appTheme.colors.white
        }>
        <AppTextSupportColor
          variant="medium_16"
          color={isSelected ? appTheme.colors.white : appTheme.colors.primary}>
          {item.name}
        </AppTextSupportColor>
      </TouchableCategory>
    );
  };

  const handelSearch = (text: string) => {
    setListProduct(
      dataProduct?.filter(i =>
        i.name.toLowerCase().includes(text.toLowerCase()),
      ) ?? [],
    );
  };

  const renderSkeleton = () => {
    const skeletons = [];

    for (let i = 0; i < 10; i++) {
      skeletons.push(
        <ContainerSkeleton key={i}>
          <ItemSkeleton>
            <Skeleton width={200} height={200} />
          </ItemSkeleton>
          <Space vertical={appTheme.gap_10} />
          <ItemSkeleton>
            <Skeleton width={200} height={200} />
          </ItemSkeleton>
        </ContainerSkeleton>,
      );
    }
    return <>{skeletons}</>;
  };

  return (
    <Wrapp>
      <Space vertical={scale(appTheme.gap_5)} />
      <AppHeader
        iconLeft="ic_quickserve"
        widthIconLeft={scale(100)}
        onPressIconLeft={() => {
          console.log('Pressed');
        }}
      />
      <HeaderSearchBar>
        <SearchBar
          onChangeText={handelSearch}
          placeholder={en.common.searchMenu}
        />
        <WrapCategory>
          <CategoryItem>
            <AppFlatlist
              data={listCategory.data ?? []}
              horizontal
              renderItem={({item}) => renderCategory(item)}
            />
          </CategoryItem>
        </WrapCategory>
      </HeaderSearchBar>
      <AppFlatlist
        numColumns={numColumns}
        isShowUIEmptyData={false}
        data={listProduct ?? []}
        isFirstLoading={isFirstLoadingProduct}
        isLoadMore={isLoadMoreProduct}
        isRefreshing={isRefreshingProduct}
        contentContainerStyle={listProductStyle}
        renderItem={({item}) => renderProduct(item)}
        ListSkeletonComponent={renderSkeleton}
      />
    </Wrapp>
  );
}

const Wrapp = styled.View`
  flex: 1;
`;

const ItemSkeleton = styled.View``;

const ProductItem = styled(AppTouchable)`
  box-shadow: 0px 2px 2px rgba(195, 195, 195, 0.25);
  flex: 1;
  min-height: ${Dimensions.get('window').width < 450
    ? scale(200)
    : scale(100)}px;
  max-width: ${Dimensions.get('window').width < 450
    ? scale(200)
    : scale(150)}px;
  margin-bottom: ${({theme}) => theme.gap_15}px;
`;

const HeaderSearchBar = styled.View`
  padding: 0 ${({theme}) => theme.gap_16}px;
  margin-top: ${({theme}) => theme.gap_10}px;
`;

const ContainerSkeleton = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${props => props.theme.gap_16}px ${props => props.theme.gap_16}px
    ${props => props.theme.gap_16}px ${props => props.theme.gap_16}px;
`;

const WrapCategory = styled.View``;

const CategoryItem = styled.View``;

const TouchableCategory = styled(AppTouchable)<{
  backgroundColor: string;
}>`
  padding: ${({theme}) => theme.gap_5}px ${({theme}) => theme.gap_15}px;
  border: 1px solid ${({theme}) => theme.colors.primary};
  border-radius: ${({theme}) => theme.border_radius_20}px;
  background-color: ${({backgroundColor}) => backgroundColor};
  margin: ${({theme}) => theme.gap_10}px ${({theme}) => theme.gap_5}px;
`;

export default App;
