import {MAPPING_FONT_FAMILY} from '@assets/font_constant';
import {TEXT_SIZE} from '@views/style';

/** */
export type Font = {
  fontFamily: string;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  fontStyle?: 'normal' | 'italic' | undefined;
};

export type AppTextType = {
  fontFamily: string;
  fontSize: number;
  letterSpacing?: number;
  fontWeight?: Font['fontWeight'];
  lineHeight?: number;
  fontStyle?: Font['fontStyle'];
};

/** your custom variant */
export const customVariants = {
  regular_12: {
    fontFamily: MAPPING_FONT_FAMILY[400].Exo,
    fontSize: TEXT_SIZE.text_size_12,
  },
  regular_13: {
    fontFamily: MAPPING_FONT_FAMILY[400].Exo,
    fontSize: TEXT_SIZE.text_size_13,
  },
  regular_14: {
    fontFamily: MAPPING_FONT_FAMILY[400].Exo,
    fontSize: TEXT_SIZE.text_size_14,
  },
  regular_16: {
    fontFamily: MAPPING_FONT_FAMILY[400].Exo,
    fontSize: TEXT_SIZE.text_size_16,
  },
  regular_20: {
    fontFamily: MAPPING_FONT_FAMILY[400].Exo,
    fontSize: TEXT_SIZE.text_size_20,
  },
  regular_22: {
    fontFamily: MAPPING_FONT_FAMILY[400].Exo,
    fontSize: TEXT_SIZE.text_size_22,
    lineHeight: 28,
  },
  regular_24: {
    fontFamily: MAPPING_FONT_FAMILY[400].Exo,
    fontSize: TEXT_SIZE.text_size_24,
    lineHeight: 30,
  },
  regular_36: {
    fontFamily: MAPPING_FONT_FAMILY[400].Exo,
    fontSize: TEXT_SIZE.text_size_36,
    lineHeight: 42,
  },
  /** */
  medium_10: {
    fontFamily: MAPPING_FONT_FAMILY[500].Exo,
    fontSize: TEXT_SIZE.text_size_10,
  },
  medium_12: {
    fontFamily: MAPPING_FONT_FAMILY[500].Exo,
    fontSize: TEXT_SIZE.text_size_12,
  },
  medium_13: {
    fontFamily: MAPPING_FONT_FAMILY[500].Exo,
    fontSize: TEXT_SIZE.text_size_13,
  },
  medium_14: {
    fontFamily: MAPPING_FONT_FAMILY[500].Exo,
    fontSize: TEXT_SIZE.text_size_14,
  },
  medium_16: {
    fontFamily: MAPPING_FONT_FAMILY[500].Exo,
    fontSize: TEXT_SIZE.text_size_16,
  },
  medium_18: {
    fontFamily: MAPPING_FONT_FAMILY[500].Exo,
    fontSize: TEXT_SIZE.text_size_18,
  },
  medium_20: {
    fontFamily: MAPPING_FONT_FAMILY[500].Exo,
    fontSize: TEXT_SIZE.text_size_20,
    lineHeight: 24,
  },
  medium_22: {
    fontFamily: MAPPING_FONT_FAMILY[500].Exo,
    fontSize: TEXT_SIZE.text_size_22,
    lineHeight: 28,
  },
  medium_24: {
    fontFamily: MAPPING_FONT_FAMILY[500].Exo,
    fontSize: TEXT_SIZE.text_size_24,
    lineHeight: 30,
  },
  /** */
  light_12: {
    fontFamily: MAPPING_FONT_FAMILY[300].Exo,
    fontSize: TEXT_SIZE.text_size_12,
  },
  light_13: {
    fontFamily: MAPPING_FONT_FAMILY[200].Exo,
    fontSize: TEXT_SIZE.text_size_13,
  },
  light_14: {
    fontFamily: MAPPING_FONT_FAMILY[300].Exo,
    fontSize: TEXT_SIZE.text_size_14,
  },
  light_16: {
    fontFamily: MAPPING_FONT_FAMILY[300].Exo,
    fontSize: TEXT_SIZE.text_size_16,
  },
  light_20: {
    fontFamily: MAPPING_FONT_FAMILY[300].Exo,
    fontSize: TEXT_SIZE.text_size_20,
    lineHeight: 24,
  },
  light_22: {
    fontFamily: MAPPING_FONT_FAMILY[300].Exo,
    fontSize: TEXT_SIZE.text_size_22,
    lineHeight: 28,
  },
  light_24: {
    fontFamily: MAPPING_FONT_FAMILY[300].Exo,
    fontSize: TEXT_SIZE.text_size_24,
    lineHeight: 30,
  },
  /** */
  thin_12: {
    fontFamily: MAPPING_FONT_FAMILY[200].Exo,
    fontSize: TEXT_SIZE.text_size_12,
  },
  thin_13: {
    fontFamily: MAPPING_FONT_FAMILY[200].Exo,
    fontSize: TEXT_SIZE.text_size_13,
  },
  thin_14: {
    fontFamily: MAPPING_FONT_FAMILY[200].Exo,
    fontSize: TEXT_SIZE.text_size_14,
  },
  thin_16: {
    fontFamily: MAPPING_FONT_FAMILY[200].Exo,
    fontSize: TEXT_SIZE.text_size_16,
  },
  thin_20: {
    fontFamily: MAPPING_FONT_FAMILY[200].Exo,
    fontSize: TEXT_SIZE.text_size_20,
    lineHeight: 24,
  },
  thin_22: {
    fontFamily: MAPPING_FONT_FAMILY[200].Exo,
    fontSize: TEXT_SIZE.text_size_22,
    lineHeight: 28,
  },
  thin_24: {
    fontFamily: MAPPING_FONT_FAMILY[200].Exo,
    fontSize: TEXT_SIZE.text_size_24,
    lineHeight: 30,
  },
  /** */
  bold_12: {
    fontFamily: MAPPING_FONT_FAMILY[700].Exo,
    fontSize: TEXT_SIZE.text_size_12,
  },
  bold_13: {
    fontFamily: MAPPING_FONT_FAMILY[700].Exo,
    fontSize: TEXT_SIZE.text_size_13,
  },
  bold_14: {
    fontFamily: MAPPING_FONT_FAMILY[700].Exo,
    fontSize: TEXT_SIZE.text_size_14,
  },
  bold_16: {
    fontFamily: MAPPING_FONT_FAMILY[700].Exo,
    fontSize: TEXT_SIZE.text_size_16,
  },
  bold_20: {
    fontFamily: MAPPING_FONT_FAMILY[700].Exo,
    fontSize: TEXT_SIZE.text_size_20,
    lineHeight: 24,
  },
  bold_22: {
    fontFamily: MAPPING_FONT_FAMILY[700].Exo,
    fontSize: TEXT_SIZE.text_size_22,
    lineHeight: 28,
  },
  bold_24: {
    fontFamily: MAPPING_FONT_FAMILY[700].Exo,
    fontSize: TEXT_SIZE.text_size_24,
    lineHeight: 30,
  },
  bold_54: {
    fontFamily: MAPPING_FONT_FAMILY[700].Exo,
    fontSize: TEXT_SIZE.text_size_54,
    lineHeight: 60,
  },
  bold_64: {
    fontFamily: MAPPING_FONT_FAMILY[700].Exo,
    fontSize: TEXT_SIZE.text_size_64,
    lineHeight: 70,
  },
  /** */
  semibold_13: {
    fontFamily: MAPPING_FONT_FAMILY[600].Exo,
    fontSize: TEXT_SIZE.text_size_13,
  },
  semibold_14: {
    fontFamily: MAPPING_FONT_FAMILY[600].Exo,
    fontSize: TEXT_SIZE.text_size_14,
  },
  semibold_16: {
    fontFamily: MAPPING_FONT_FAMILY[600].Exo,
    fontSize: TEXT_SIZE.text_size_16,
  },
  semibold_20: {
    fontFamily: MAPPING_FONT_FAMILY[600].Exo,
    fontSize: TEXT_SIZE.text_size_20,
  },
  semibold_22: {
    fontFamily: MAPPING_FONT_FAMILY[600].Exo,
    fontSize: TEXT_SIZE.text_size_22,
  },
  semibold_24: {
    fontFamily: MAPPING_FONT_FAMILY[600].Exo,
    fontSize: TEXT_SIZE.text_size_24,
  },
  /** */
  regular_italic_12: {
    fontFamily: MAPPING_FONT_FAMILY[400].ExoItalic,
    fontSize: TEXT_SIZE.text_size_12,
  },
  regular_italic_13: {
    fontFamily: MAPPING_FONT_FAMILY[400].ExoItalic,
    fontSize: TEXT_SIZE.text_size_13,
  },
  regular_italic_14: {
    fontFamily: MAPPING_FONT_FAMILY[400].ExoItalic,
    fontSize: TEXT_SIZE.text_size_14,
  },
  regular_italic_16: {
    fontFamily: MAPPING_FONT_FAMILY[400].ExoItalic,
    fontSize: TEXT_SIZE.text_size_16,
  },
  regular_italic_20: {
    fontFamily: MAPPING_FONT_FAMILY[400].ExoItalic,
    fontSize: TEXT_SIZE.text_size_20,
    lineHeight: 24,
  },
  regular_italic_22: {
    fontFamily: MAPPING_FONT_FAMILY[400].ExoItalic,
    fontSize: TEXT_SIZE.text_size_22,
    lineHeight: 28,
  },
  regular_italic_24: {
    fontFamily: MAPPING_FONT_FAMILY[400].ExoItalic,
    fontSize: TEXT_SIZE.text_size_24,
    lineHeight: 30,
  },
  /** */
} as const;

export type CustomTextVariant = keyof typeof customVariants;
