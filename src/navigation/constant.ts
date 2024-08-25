import {SubmitOrderResponse} from '@app-core/state/payment/type';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import Bill from '@screens/Bill';
import Cart from '@screens/Cart';
import HistoryOrder from '@screens/HistoryOrder';
import HistoryOrderDetail from '@screens/HistoryOrder/HistoryOrderDetail';
import HistoryOrderStaff from '@screens/HistoryOrderStaff';
import HistoryOrderStaffDetail from '@screens/HistoryOrderStaff/HistoryOrderStaffDetail';
import {DetailProduct, Home, Order, Setting, Splash} from '@screens/index';
import Welcome from '@screens/Login';
import SignIn from '@screens/Login/signIn';
import SignUp from '@screens/Login/signUp';
import Payment from '@screens/Payment';
import WebViewPaymentVNPay from '@screens/PaymentVNPay';
import Profile from '@screens/Profile';
import StatusOrder from '@screens/StatusOrder';
import StoreSelection from '@screens/StoreList';
import {Platform} from 'react-native';

import HomeStack from './Stack/HomeStack';

export const screenOptionsNativeStack: NativeStackNavigationOptions = {
  headerShown: false,
  customAnimationOnGesture: true,
  fullScreenGestureEnabled: true,
  gestureEnabled: true,
  animationTypeForReplace: 'push',
  animation: 'slide_from_right',
  presentation: Platform.OS === 'android' ? 'modal' : undefined,
};

export type AppScreenType = {
  [key in string]: {
    name: string;
    component?: React.ComponentType<any>;
  };
};

export const AUTH_APP_SCREEN = {
  Welcome: {
    name: 'Welcome',
    component: Welcome,
  },
  SignIn: {
    name: 'SignIn',
    component: SignIn,
  },
  SignUp: {
    name: 'SignUp',
    component: SignUp,
  },
} as const;

export const BOTTOM_TAB_SCREEN = {
  HomeStack: {
    name: 'HomeStack',
    component: HomeStack,
  },
  Order: {
    name: 'Order',
    component: Order,
  },
  Setting: {
    name: 'Setting',
    component: Setting,
  },
} as const;

export const HOME_STACK_SCREEN = {
  Home: {
    name: 'Home',
    component: Home,
  },
  DetailProduct: {
    name: 'DetailProduct',
    component: DetailProduct,
  },
} as const;

export const APP_SCREEN = {
  ...AUTH_APP_SCREEN,
  ...HOME_STACK_SCREEN,
  AuthStack: {
    name: 'AuthStack',
  },
  AppStack: {
    name: 'AppStack',
  },
  BottomStack: {
    name: 'BottomStack',
  },
  HomeStack: {
    name: 'HomeStack',
  },
  Splash: {
    name: 'Splash',
    component: Splash,
  },

  Cart: {
    name: 'Cart',
    component: Cart,
  },
  Payment: {
    name: 'Payment',
    component: Payment,
  },
  Order: {
    name: 'Order',
    component: Order,
  },
  StatusOrder: {
    name: 'StatusOrder',
    component: StatusOrder,
  },

  WebViewPaymentVNPay: {
    name: 'WebViewPaymentVNPay',
    component: WebViewPaymentVNPay,
  },
  HistoryOrder: {
    name: 'HistoryOrder',
    component: HistoryOrder,
  },
  HistoryOrderDetail: {
    name: 'HistoryOrderDetail',
    component: HistoryOrderDetail,
  },
  HistoryOrderStaff: {
    name: 'HistoryOrderStaff',
    component: HistoryOrderStaff,
  },
  HistoryOrderStaffDetail: {
    name: 'HistoryOrderStaffDetail',
    component: HistoryOrderStaffDetail,
  },
  Bill: {
    name: 'Bill',
    component: Bill,
  },
  Profile: {
    name: 'Profile',
    component: Profile,
  },
  StoreSelection: {
    name: 'StoreSelection',
    component: StoreSelection,
  },
} as const;

export interface ScreenPropType {
  [APP_SCREEN.AuthStack.name]: undefined;
  [APP_SCREEN.AppStack.name]: {
    status?: number;
  };
  [APP_SCREEN.BottomStack.name]: undefined;

  [APP_SCREEN.HomeStack.name]: undefined;
  [APP_SCREEN.DetailProduct.name]: {
    detailProduct: any;
  };

  [APP_SCREEN.Cart.name]: undefined;
  [APP_SCREEN.Bill.name]: undefined;
  [APP_SCREEN.Payment.name]: {
    orderId: string;
  };

  [APP_SCREEN.Order.name]: undefined;

  [APP_SCREEN.WebViewPaymentVNPay.name]: {
    url: string;
  };
  [APP_SCREEN.Profile.name]: undefined;
  [APP_SCREEN.HistoryOrder.name]: undefined;
  [APP_SCREEN.StatusOrder.name]: {
    orderStatus?: SubmitOrderResponse['data'];
  };
  [APP_SCREEN.HistoryOrderDetail.name]: undefined;
  [APP_SCREEN.HistoryOrderStaff.name]: undefined;
  [APP_SCREEN.HistoryOrderStaffDetail.name]: undefined;
  [APP_SCREEN.Welcome.name]: undefined;
  [APP_SCREEN.StoreSelection.name]: undefined;
  [APP_SCREEN.SignIn.name]: undefined;
  [APP_SCREEN.SignUp.name]: undefined;

  [APP_SCREEN.Splash.name]: undefined;
}
