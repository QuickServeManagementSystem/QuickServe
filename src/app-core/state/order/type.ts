import {BaseResType} from '../type';

export type TOrderRequest = {
  storeId: number;
  products: [
    {
      productTemplateId: number;
      quantity: number;
      ingredients: [
        {
          id: number;
          price: number;
        },
      ];
    },
  ];
};

export type TOrderCustomerRequest = {
  products: [
    {
      productTemplateId: number;
      quantity: number;
      ingredients: [
        {
          id: number;
          price: number;
          quantity: number;
        },
      ];
    },
  ];
  storeId: number;
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
  created: string;
  platform: number;
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

export type TGetOrderStaff = {
  id: string;
  status: number;
  created: string;
  platform: number;
};

export type TGetStatusOrder = {
  id: string;
  status: number;
};
export type TGetFilterHistoryOrder = {
  StoreName: string;
  Last7Days: boolean;
  Status: number;
};

export type TGetFilterHistoryOrderStaff = {
  Status: number;
};

export type TGetOrderHistoryCustomer = {
  id: string;
  totalPrice: number;
  billCode: string;
  status: number;
  storeId: number;
  created: string;
};

export type TGetOrderHistoryStaff = {
  id: string;
  status: number;
  created: string;
  platform: number;
};

export type TGetStatusOrderResponse = BaseResType<TGetStatusOrder>;

export type TGetOrderResponse = BaseResType<TGetOrder>;

export type TGetOrderStaffResponse = BaseResType<TGetOrderStaff>;

export type TGetOrderHistoryCustomerResponse =
  BaseResType<TGetOrderHistoryCustomer>;

export type TGetOrderHistoryStaffResponse = BaseResType<TGetOrderHistoryStaff>;
