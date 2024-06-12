import {customVariants} from './AppText/variant';
import {
  ALPHA_VALUE,
  DEPTH_LEVEL,
  GAP_SPACING,
  ICON_SIZE,
  border_radius,
  lightColors,
} from './style';

export const LightTheme = {
  ...border_radius,
  colors: lightColors,
  ...GAP_SPACING,
  ...ICON_SIZE,
  ...DEPTH_LEVEL,
  ...ALPHA_VALUE,
  fonts: customVariants,
} as const;

const DefaultTheme = {
  dark: false,
  ...LightTheme,
};

export default DefaultTheme;
