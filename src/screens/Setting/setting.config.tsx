import {en} from '@assets/text_constant';
import {ICON_TYPE} from '@views/AppIcon';

export interface SettingsProps {
  name: string;
  icon: ICON_TYPE;
  id: string;
}

export enum ESetting {
  login = 'login',
  logout = 'logout',
  historyProduct = 'historyProduct',
  profile = 'profile',
}

export const dataSettings: SettingsProps[] = [
  {
    name: en.setting.login,
    icon: 'ic_login',
    id: ESetting.login,
  },
  {
    name: en.setting.logout,
    icon: 'ic_logout',
    id: ESetting.logout,
  },
  {
    name: en.setting.historyproduct,
    icon: 'ic_history',
    id: ESetting.historyProduct,
  },
  {
    name: en.setting.profile,
    icon: 'ic_history',
    id: ESetting.profile,
  },
];
