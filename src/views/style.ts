import {StyleSheet} from 'react-native';

export const lightColors = {
  transparent: 'transparent',
  white: '#FFFFFF',
  black: '#000000',
  background: '#FAFAFA',
  primary: '#FFA62F',
  secondary: '#F3BE62',
  error: '#FF3030',
  //text
  text_primary: '#181818',
  text_secondary: '#004744',
  text_third: '#FF783C',
  text_disable: '#747474',
  //stroke
  stroke_primary: '#D7D7D7',
  stroke_secondary: '#FF783C',
  //
  icon_primary: '#7C7B7B',
  //text input
  text_input_primary: '#5C5C5C',
  // custom colors
  button_primary: '#004744',
  button_background_primary: '#F1F1F1',
  button_background_secondary: '#FFC480',

  // header
  header_primary: '#181818',
  header_secondary: '#004744',
  // navigation theme converting
  card: '#FFFFFF',
  text: '#000000',
  border: '#000000',
  notification: '#FF6C44',
};
export const GAP_SPACING = {
  gap_130: 130,
  gap_64: 64,
  gap_60: 60,
  gap_44: 44,
  gap_42: 42,
  gap_40: 40,
  gap_38: 38,
  gap_37: 37,
  gap_34: 34,
  gap_32: 32,
  gap_30: 30,
  gap_28: 28,
  gap_27: 27,
  gap_26: 26,
  gap_25: 25,
  gap_24: 24,
  gap_23: 23,
  gap_22: 22,
  gap_20: 20,
  gap_19: 19,
  gap_18: 18,
  gap_17: 17,
  gap_16: 16,
  gap_15: 15,
  gap_14: 14,
  gap_13: 13,
  gap_12: 12,
  gap_11: 11,
  gap_10: 10,
  gap_9: 9,
  gap_8: 8,
  gap_7: 7,
  gap_6: 6,
  gap_5: 5,
  gap_4: 4,
  gap_3: 3,
  gap_2: 2,
  gap_1: 1,
  gap_0: 0,
} as const;

export const ICON_SIZE = {
  /** icon size 16 */
  icon_size_16: 16,
  /** icon size 24 */
  icon_size_24: 24,
  /** icon size 32 */
  icon_size_32: 32,
} as const;

export const DEPTH_LEVEL = {
  /** depth level for Z-axis 40 */
  depth_level_01: 40,
  /** depth level for Z-axis 30 */
  depth_level_02: 30,
  /** depth level for Z-axis 20 */
  depth_level_03: 20,
  /** depth level for Z-axis 10 */
  depth_level_04: 10,
} as const;

export const ALPHA_VALUE = {
  /** alpha value 100% */
  alpha_10: 'FF',
  /** alpha value 90% */
  alpha_09: 'E6',
  /** alpha value 80% */
  alpha_08: 'CD',
  /** alpha value 70% */
  alpha_07: 'B4',
  /** alpha value 60% */
  alpha_06: '9B',
  /** alpha value 50% */
  alpha_05: '82',
  /** alpha value 40% */
  alpha_04: '69',
  /** alpha value 30% */
  alpha_03: '37',
  /** alpha value 20% */
  alpha_02: '1E',
  /** alpha value 10% */
  alpha_01: '05',
  /** alpha value 8% */
  alpha_008: '14',
  /** alpha value 0.5% */
  alpha_005: '0d',
} as const;

export const border_radius = {
  border_radius_55: 55,
  border_radius_20: 20,
  border_radius_16: 16,
  border_radius_12: 12,
  border_radius_8: 8,
  border_radius_6: 6,
  border_radius_5: 5,
  border_radius_4: 4,
  border_radius_3: 3,
} as const;

export const TEXT_SIZE = {
  /** text size 10 */
  text_size_10: 10,
  /** text size 11 */
  text_size_11: 11,
  /** text size 12 */
  text_size_12: 12,
  /** text size 13 */
  text_size_13: 13,
  /** text size 14 */
  text_size_14: 14,
  /** text size 14 */
  text_size_16: 16,
  /** text size 17 */
  text_size_17: 17,
  /** text size 19 */
  text_size_19: 19,
  /** text size 20 */
  text_size_20: 20,
  /** text size 22 */
  text_size_22: 22,
  /** text size 24 */
  text_size_24: 24,
  /** text size 36 */
  text_size_36: 36,
  /** text size 48 */
  text_size_48: 48,
  /** text size 54 */
  text_size_54: 54,
  /** text size 64 */
  text_size_64: 64,
} as const;

export const ViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    padding: 10,
  },
  contentWrapper: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  content: {
    paddingHorizontal: 18,
  },
});
