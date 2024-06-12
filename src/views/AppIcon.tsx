import {MAP_ICON_TYPE} from '@assets/icon_constant';
import React from 'react';
import {SvgProps} from 'react-native-svg';

import AppTouchable from './AppTouchable';

export type ICON_TYPE = keyof typeof MAP_ICON_TYPE;
export type AppIconProps = SvgProps & {
  name: ICON_TYPE;
  fill_color?: string;
  onPress?: () => void;
};
const AppIcon: React.FC<AppIconProps> = ({name, onPress, ...props}) => {
  const ICON_IMPORT = MAP_ICON_TYPE[name];
  const Icon = ICON_IMPORT ? ICON_IMPORT().default : null;

  return Icon ? (
    <AppTouchable disabled={onPress ? false : true} onPress={onPress}>
      {<Icon {...props} />}
    </AppTouchable>
  ) : null;
};

export default AppIcon;
