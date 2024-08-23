import {
  getListStoreAction,
  selectedListStore,
  selectSelectedStoreId,
  setSelectedStoreId,
} from '@app-core/state/store/reducer';
import {TStore} from '@app-core/state/store/type';
import {APP_SCREEN} from '@navigation/constant';
import Navigation from '@navigation/Provider';
import {Space} from '@utils/common';
import useAPIList from '@utils/hooks/useAPIList';
import AppFlatlist from '@views/AppFlatlist';
import AppHeader from '@views/AppHeader';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import styled, {useTheme} from 'styled-components/native';

const StoreSelection = () => {
  const appTheme = useTheme();
  const dispatch = useDispatch();
  const selectedStoreId = useSelector(setSelectedStoreId);
  const {data, isLoadMore, isRefreshing, onLoadMore, onRefresh} = useAPIList(
    getListStoreAction,
    selectedListStore,
  );
  const handleStoreSelect = (store: TStore) => {
    console.log('Selected Store:', store);
    dispatch(setSelectedStoreId(store.id));
    console.log('Dispatching setSelectedStoreId with ID:', store.id);
    Navigation.reset(APP_SCREEN.AppStack.name);
  };
  return (
    <Container>
      <Space vertical={scale(appTheme.gap_5)} />
      <AppHeader
        title="Danh sách cửa hàng"
        onPressIconLeft={() => {
          Navigation.goBack();
        }}
      />
      <Text>Chọn 1 cửa hàng</Text>
      <AppFlatlist
        data={data ?? []}
        isLoadMore={isLoadMore}
        isRefreshing={isRefreshing}
        onLoadMore={onLoadMore}
        onRefresh={onRefresh}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleStoreSelect(item)}>
            <StoreItem>
              <StoreName>{item.name}</StoreName>
              <StoreAddress>{item.address}</StoreAddress>
            </StoreItem>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const StoreItem = styled.View`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const StoreName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const StoreAddress = styled.Text`
  font-size: 14px;
  color: #555;
`;

export default StoreSelection;
