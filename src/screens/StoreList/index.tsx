import {APP_SCREEN} from '@navigation/constant';
import Navigation from '@navigation/Provider';
import AppHeader from '@views/AppHeader';
import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const stores = [
  {id: '1', name: 'Store 1'},
  {id: '2', name: 'Store 2'},
];

const StoreSelection = () => {
  const handleStoreSelect = (storeId: string) => {};

  return (
    <Container>
      <AppHeader title="Danh sách cửa hàng" />
      <Text>Chọn 1 cửa hàng</Text>
      <FlatList
        data={stores}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleStoreSelect(item.id)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

export default StoreSelection;
