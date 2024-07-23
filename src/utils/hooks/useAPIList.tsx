import {AppRootState, useAppDispatch, useAppSelector} from '@app-core/state';
import {TIngredient, TIngredientRequest} from '@app-core/state/ingredient/type';
import {
  TGetOrder,
  TGetOrderByIdRequest,
  TGetOrderRequest,
  TGetStatusOrder,
  TGetStatusOrderResponse,
} from '@app-core/state/order/type';
import {TCategoriesRequest, TCategory} from '@app-core/state/product/type';
import {BaseResType} from '@app-core/state/type';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import {isNull} from '@utils/common';
import {useState, useEffect} from 'react';

export type TypeAPIList<T> = BaseResType<T>;
export type TypeAPIRequest =
  | TCategoriesRequest
  | TIngredientRequest
  | TGetOrderRequest
  | TGetOrderByIdRequest
  | undefined;
export type TypeAPIRespone =
  | TCategory
  | TIngredient
  | TGetOrder
  | TGetStatusOrder
  | undefined;

const useAPIList = <T extends TypeAPIRespone, P extends TypeAPIRequest>(
  action: ActionCreatorWithPayload<P, string>,
  selector: (state: AppRootState) => TypeAPIList<T>,
  payload?: P,
) => {
  const dispatch = useAppDispatch();
  const dataSelector: TypeAPIList<T> = useAppSelector(selector);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [data, setData] = useState<T[]>();
  const [changedPayload, setChangedPayload] = useState<P | undefined | any>(
    payload || ({} as unknown as P),
  );

  useEffect(() => {
    // if (isFirstLoading) {
    //   setIsFirstLoading(false);
    //   dispatch(
    //     action({...{pageIndex: 1, pageSize: 10}, ...changedPayload} as P),
    //   );
    // }
    dispatch(
      action({...{pageNumber: 1, pageSize: 10}, ...changedPayload} as P),
    );
  }, [dispatch, action, changedPayload]);

  useEffect(() => {
    if (isFirstLoading && dataSelector.pageNumber !== 0) {
      setIsFirstLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSelector.pageNumber]);

  useEffect(() => {
    setIsRefreshing(false);
    setIsLoadMore(false);
    setData(dataSelector.data);
    // if (isFirstLoading) {
    //   setIsFirstLoading(false);
    // }
  }, [dataSelector.data]);

  useEffect(() => {
    if (dataSelector.pageNumber) {
      setIsLoadMore(false);
    }
  }, [dataSelector.pageNumber]);

  const onRefresh = () => {
    setIsRefreshing(true);
    setIsLoadMore(false);
    dispatch(action({...{pageNumber: 1}, ...changedPayload}));
    if (isNull(dataSelector.data)) {
      setIsRefreshing(false);
    }
  };

  const onLoadMore = () => {
    if (
      dataSelector.pageNumber < dataSelector.totalPages &&
      !isLoadMore &&
      !isRefreshing
    ) {
      setIsLoadMore(true);
      dispatch(
        action({
          ...changedPayload,
          pageNumber: dataSelector.pageNumber + 1,
          pageSize: 10,
        } as P),
      );
    }
  };

  return {
    data,
    isFirstLoading,
    isLoadMore,
    isRefreshing,
    setChangedPayload,
    onRefresh,
    onLoadMore,
    pagination: {
      totalPages: dataSelector.totalPages,
      pageNumber: dataSelector.pageNumber,
      totalItems: dataSelector.totalItems,
      pageSize: dataSelector.pageSize,
    },
  };
};

export default useAPIList;
