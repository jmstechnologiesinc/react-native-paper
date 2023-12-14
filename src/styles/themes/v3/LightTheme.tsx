import color from 'color';

import type { MD3Theme } from '../../../types';
import configureFonts from '../../fonts';
import { MD3Colors, tokens } from './tokens';

import { moderateScale } from 'react-native-size-matters';

const { palette, opacity } = tokens.md.ref;
const spacing = tokens.md.sys.spacing;

export const MD3LightTheme: MD3Theme = {
  dark: false,
  roundness: moderateScale(4),
  version: 3,
  isV3: true,
  colors: {
    primary: palette.primary40,
    primaryContainer: palette.primary90,
    secondary: palette.secondary40,
    secondaryContainer: palette.secondary90,
    tertiary: palette.tertiary40,
    tertiaryContainer: palette.tertiary90,
    surface: palette.neutral99,
    surfaceVariant: palette.neutralVariant90,
    surfaceDisabled: color(palette.neutral10)
    .alpha(opacity.level2)
    .rgb()
    .string(),
    background: palette.neutral99,
    error: palette.error40,
    errorContainer: palette.error90,
    onPrimary: palette.primary100,
    onPrimaryContainer: palette.primary10,
    onSecondary: palette.secondary100,
    onSecondaryContainer: palette.secondary10,
    onTertiary: palette.tertiary100,
    onTertiaryContainer: palette.tertiary10,
    onSurface: palette.neutral10,
    onSurfaceVariant: palette.neutralVariant30,
    onSurfaceDisabled: color(palette.neutral10)
    .alpha(opacity.level4)
    .rgb()
    .string(),
    onError: palette.error100,
    onErrorContainer: palette.error10,
    onBackground: palette.neutral10,
    outline: palette.neutralVariant50,
    outlineVariant: palette.neutralVariant80,
    inverseSurface: palette.neutral20,
    inverseOnSurface: palette.neutral95,
    inversePrimary: palette.primary80,
    shadow: palette.neutral0,
    scrim: palette.neutral0,
    backdrop: color(MD3Colors.neutralVariant20).alpha(0.4).rgb().string(),
    elevation: {
      level0: palette.level0,
      level1: palette.level1,
      level2: palette.level2,
      level3: palette.level3,
      level4: palette.level4,
      level5: palette.level5,
    },
  },
  fonts: configureFonts(),
  animation: {
    scale: 1.0,
  },
  spacing,
};
