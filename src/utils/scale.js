import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

export const scale = (size) => Math.round((SCREEN_WIDTH / BASE_WIDTH) * size);

export const verticalScale = (size) => Math.round((SCREEN_HEIGHT / BASE_HEIGHT) * size);

export const moderateScale = (size, factor = 0.5) =>
  Math.round(size + (scale(size) - size) * factor);

export const fontScale = (size) => {
  const scaled = moderateScale(size, 0.3);
  const maxFont = size * 1.3;
  return Math.min(scaled, maxFont);
};

export { SCREEN_WIDTH, SCREEN_HEIGHT };

export const isSmallDevice = SCREEN_WIDTH < 360;
export const isTablet = SCREEN_WIDTH >= 768;

export const wp = (percentage) => (SCREEN_WIDTH * percentage) / 100;
export const hp = (percentage) => (SCREEN_HEIGHT * percentage) / 100;
