import {useAppDispatch, useAppSelector} from '@app-core/state';
import {createOrderAction} from '@app-core/state/order/reducer';
import {
  getListOrderHistoryAction,
  selectListOrderHistorySelector,
} from '@app-core/state/order/reducer';
import {en} from '@assets/text_constant';
import {useAppContext} from '@utils/appContext';
import {formatNumber, MaxSize, Space} from '@utils/common';
import AppFlatlist from '@views/AppFlatlist';
import AppHeader from '@views/AppHeader';
import AppIcon from '@views/AppIcon';
import {AppTextSupportColor} from '@views/AppText';
import AppTouchable from '@views/AppTouchable';
import React, {useContext, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {scale} from 'react-native-size-matters';
import styled, {useTheme} from 'styled-components/native';

import {Context} from '../../reducer';

const HistoryOrder = () => {
  const appTheme = useTheme();
  const dispatch = useAppDispatch();
  const orderHistory = useAppSelector(selectListOrderHistorySelector);

  useEffect(() => {
    dispatch(getListOrderHistoryAction());
  }, [dispatch]);

  return (
    <Container>
      <Space vertical={scale(5)} />
      <AppHeader title="Lịch sử đơn hàng" />

      {/* Render danh sách lịch sử đơn hàng ở đây */}
      <AppFlatlist
        data={orderHistory?.data || []}
        renderItem={({item}) => (
          <WrapProduct>
            <WrapInfoProduct>
              {/* Hiển thị thông tin sản phẩm */}
            </WrapInfoProduct>
            <WrapAction>
              {/* Các hành động như Xem chi tiết, Xóa đơn hàng */}
            </WrapAction>
          </WrapProduct>
        )}
        keyExtractor={item => item.id.toString()}
      />
      <Space vertical={scale(50)} />
    </Container>
  );
};

const CartContainer = styled.View`
  background-color: ${({theme}) => theme.colors.gray_9};
  padding: ${({theme}) => theme.gap_10}px;
  shadow-color: ${({theme}) => theme.colors.black};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  elevation: 5;
`;
const ContainerCart = styled.View`
  margin: 0 ${({theme}) => theme.gap_16}px;
`;

const ButtonViewMore = styled(AppTouchable)`
  margin: ${({theme}) => theme.gap_10}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const WrapActionAmount = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${({theme}) => theme.colors.stroke_primary};
  border-radius: ${({theme}) => theme.border_radius_5}px;
  padding: ${({theme}) => theme.gap_2}px;
  max-width: ${scale(100)}px;
  min-width: ${scale(100)}px;
`;

const Line = styled.View`
  height: 1px;
  margin: ${({theme}) => theme.gap_10}px 0px;
  background-color: ${({theme}) => theme.colors.stroke_primary};
`;

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.white};
`;

const WrapProduct = styled(CartContainer)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({theme}) => theme.gap_10}px;
  background-color: ${({theme}) => theme.colors.white};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: ${({theme}) => theme.border_radius_8}px;
`;

const WrapInfoProduct = styled.View``;

const WrapAction = styled.View``;

const TouchableDelete = styled(AppTouchable)`
  padding: ${({theme}) => theme.gap_10}px;
  border-radius: 99999px;
  width: ${({theme}) => theme.gap_30}px;
  height: ${({theme}) => theme.gap_30}px;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  background-color: ${({theme}) => theme.colors.error + theme.alpha_05};
`;
const WrapButton = styled(AppTouchable)`
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  align-items: center;
  align-self: center;
  margin-bottom: ${scale(30)}px;
  border-radius: ${({theme}) => theme.border_radius_8}px;
  width: ${MaxSize.WIDTH / 1.1}px;
  padding: ${({theme}) => theme.gap_10}px;
  background-color: ${({theme}) => theme.colors.primary};
`;

const TouchableMinus = styled(AppTouchable)`
  background-color: ${({theme}) => theme.colors.button_background_thrid};
  padding: ${({theme}) => theme.gap_2}px;
  border-radius: ${({theme}) => theme.border_radius_5}px;
`;

const TouchableAdd = styled(AppTouchable)`
  background-color: ${({theme}) => theme.colors.secondary};
  padding: ${({theme}) => theme.gap_2}px;
  border-radius: ${({theme}) => theme.border_radius_5}px;
`;

export default HistoryOrder;
