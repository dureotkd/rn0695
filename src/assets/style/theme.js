import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const COLORS = {
  black: '#000',
  orange10: '#FFF5EC',
  orange50: '#FFEBD2',
  orange100: '#FFD0A4',
  orange300: '#FF9157',
  orange400: '#FF5E1F',
  orange700: '#FF3600',
  grey: '#9E9E9E',
  grey50: '#F5F5F5',
  grey100: '#EEEEEE',
  grey200: '#E0E0E0',
  grey300: '#BDBDBD',
  grey400: '#9E9E9E',
  grey500: '#757575',
  grey600: '#616161',
  grey700: '#424242',
  grey800: '#212121',
  primary: '#FF5E1F',
  lightRed: '#ED4F4F',
  lightBlack: '#212121',
  secondary: '#FFCC00',
  other: '#3D5AFE',
};

const RADIUS = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 10,
  xxl: 20,
  xxxl: 40,
  round: 100,
};

const FONT_SIZE = {
  sm: wp('3.2%'),
  md: wp('3.9%'),
  xl: wp('4.26%'),
  xxl: wp('4.8%'),
  xxxl: wp('5.33%'),
  bxl: wp('5.86%'),
};

const MARGIN = {
  bsm: wp('0.53%'),
  sm: wp('1.06%'),
  md: wp('1.6%'),
  lg: wp('2.13%'),
  xl: wp('3.66%'),
  xxl: wp('4.2%'),
  xxxl: wp('5.7%'),
};

//
const SPACING = {
  sm: wp('2%'),
  bsm: wp('3%'),
  gd: wp('4%'),
  layout: wp('2.66%'),
  bLayout: wp('8.6%'),
};

const FONT_WEIGHT = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
};

export { COLORS, RADIUS, SPACING, FONT_SIZE, MARGIN, FONT_WEIGHT, hp, wp };
