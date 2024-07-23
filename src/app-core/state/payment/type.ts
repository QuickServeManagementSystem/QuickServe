export type TSubmitOrderRequest = {
  orderId: string;
};

export type TCreateVNPayRequest = {
  orderId: string;
  totalPrice: number;
  orderInfo: string;
};

export type TPaymentResponse = {
  success: boolean;
  errors: [
    {
      errorCode: number;
      fieldName: string;
      description: string;
    },
  ];
  data: {
    paymentUrl: string;
  };
};

export type SubmitOrderResponse = {
  data: {
    id: string;
    name: string;
    paymentType: number;
    refOrderId: number;
    status: number;
  };
  success: boolean;
  errors: any;
};
