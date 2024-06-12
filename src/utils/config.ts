// import {Platform} from 'react-native';
// import * as NativeConfig from 'react-native-config';

function Config() {
  const default_config = {
    API_URL: '',
    GOOGLE_CLIENT_ID: '',
    GOOGLE_IOS_CLIENT_ID: '',
    APPLE_IOS_CLIENT_ID: '',
    APPLE_OTHER_CLIENT_ID: '',
    SSO_REDIRECT_URI: '',
    PLACE_API_KEY: '',
    GOOGlE_MAP_API: '',
    APP_DEEP_LINK: '',
    API_BRANCH_IO: '',
    BRANCH_IO_KEY: '',
    ONESIGNAL_APP_ID: '',
  };
  const configObj: typeof default_config = Object.assign(default_config);

  return configObj;
}

export const CONFIG = Config();
