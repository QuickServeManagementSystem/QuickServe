import {Alert, Platform, Linking} from 'react-native';
import Toast from 'react-native-toast-message';

const permissonType = {
  media: 'thư viện ảnh',
  camera: 'camera',
  location: 'vị trí',
};

export default {
  success: (text: string) => {
    Toast.show({
      type: 'success',
      text1: 'Thành công',
      text2: typeof text === 'string' && text ? text : 'Thành công',
    });
  },

  error: (text?: any) => {
    Toast.show({
      type: 'error',
      text1: 'Vui Lòng Thử Lại',
      text2: typeof text === 'string' && text ? text : 'Có lỗi xảy ra',
    });
  },

  warning: (text: string = '') => {
    Toast.show({
      type: 'info',
      text1: 'Cảnh báo',
      text2: typeof text === 'string' && text ? text : 'Warning',
    });
  },

  goToSetting: (
    type: 'media' | 'camera' | 'location',
    onCancel?: () => void,
    onConfirm?: () => void,
  ) => {
    Alert.alert(
      'Thông báo',
      `Bạn cần cấp quyền truy cập ${permissonType[type]} để sử dụng chức năng này`,
      [
        {
          text: 'Hủy',
          onPress: onCancel,
        },
        {
          text: 'Đi đến cài đặt',
          onPress: () => {
            Platform.OS === 'ios'
              ? Linking.openURL('app-settings:')
              : Linking.openSettings();
            onConfirm && onConfirm();
          },
        },
      ],
    );
  },
};
