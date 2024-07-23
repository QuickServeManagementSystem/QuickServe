import {BaseResType} from '../type';

export type TOrderRequest = {
  name: string;
  phoneNumber: string;
  products: [
    {
      productTemplateId: number;
      quantity: number;
      ingredients: [
        {
          id: number;
          quantity: number;
          price: number;
        },
      ];
    },
  ];
};

export type TUpdateOrder = {
  orderId: string;
  status: number;
};

export type TGetOrderByIdRequest = {
  orderId: string;
};

export type TOrderResponse = {
  success: boolean;
  errors: [
    {
      errorCode: number;
      fieldName: string;
      description: string;
    },
  ];
  data: {
    orderId: string;
    status: number;
  };
};

export type TGetOrderRequest = {
  PageNumber: number;
  PageSize: number;
};

export type TGetOrder = {
  id: string;
  customerId: string;
  totalPrice: number;
  status: number;
  storeId: number;
  billCode: string;
  products: [
    {
      id: number;
      name: string;
      price: number;
      productTemplateId: number;
      quantity: number;
      ingredients: [
        {
          id: number;
          name: string;
          price: number;
          calo: number;
          defaultQuantity: number;
          description: string;
          imageUrl: string;
          ingredientTypeId: number;
          status: number;
          createdBy: string;
          created: string;
          lastModifiedBy: string;
          lastModified: string;
          ingredientType: {
            id: number;
            name: string;
            status: number;
          };
        },
      ];
    },
  ];
};

export type TGetStatusOrder = {
  id: string;
  status: number;
};

export type TGetStatusOrderResponse = BaseResType<TGetStatusOrder>;

export type TGetOrderResponse = BaseResType<TGetOrder>;