import color from 'color';

import { MD3LightTheme } from './LightTheme';
import { MD3Colors, tokens } from './tokens';
import type { MD3Theme } from '../../../types';

const { palette, opacity } = tokens.md.ref;
const spacing = tokens.md.sys.spacing;

export const MD3DarkTheme: MD3Theme = {
  ...MD3LightTheme,
  dark: true,
  mode: 'adaptive',
  version: 3,
  isV3: true,
  colors: {
    primary: palette.primary80,
    primaryContainer: palette.primary30,
    secondary: palette.secondary80,
    secondaryContainer: palette.secondary30,
    tertiary: palette.tertiary80,
    tertiaryContainer: palette.tertiary30,
    surface: palette.neutral10,
    surfaceVariant: palette.neutralVariant30,
    surfaceDisabled: color(palette.neutral90)
      .alpha(opacity.level2)
      .rgb()
      .string(),
    background: palette.neutral10,
    error: palette.error80,
    errorContainer: palette.error30,
    onPrimary: palette.primary20,
    onPrimaryContainer: palette.primary90,
    onSecondary: palette.secondary20,
    onSecondaryContainer: palette.secondary90,
    onTertiary: palette.tertiary20,
    onTertiaryContainer: palette.tertiary90,
    onSurface: palette.neutral90,
    onSurfaceVariant: palette.neutralVariant80,
    onSurfaceDisabled: color(palette.neutral90)
      .alpha(opacity.level4)
      .rgb()
      .string(),
    onError: palette.error20,
    onErrorContainer: palette.error80,
    // Material 3 custom colors (tones 80/20/30/90 of green and orange), the
    // dark counterparts of the light theme's success and warning roles.
    success: 'rgb(156, 214, 125)',
    onSuccess: 'rgb(12, 57, 0)',
    successContainer: 'rgb(32, 81, 7)',
    onSuccessContainer: 'rgb(183, 243, 151)',
    warning: 'rgb(255, 183, 134)',
    onWarning: 'rgb(80, 36, 0)',
    warningContainer: 'rgb(114, 54, 0)',
    onWarningContainer: 'rgb(255, 220, 198)',
    onBackground: palette.neutral90,
    outline: palette.neutralVariant60,
    outlineVariant: palette.neutralVariant30,
    inverseSurface: palette.neutral90,
    inverseOnSurface: palette.neutral20,
    inversePrimary: palette.primary40,
    shadow: palette.neutral0,
    scrim: palette.neutral0,
    backdrop: color(MD3Colors.neutralVariant20).alpha(0.4).rgb().string(),
    elevation: {
      level0: 'transparent',
      // Note: Color values with transparency cause RN to transfer shadows to children nodes
      // instead of View component in Surface. Providing solid background fixes the issue.
      // Opaque color values generated with `palette.primary80` used as background
      level1: 'rgb(37, 35, 42)', // palette.primary80, alpha 0.05
      level2: 'rgb(44, 40, 49)', // palette.primary80, alpha 0.08
      level3: 'rgb(49, 44, 56)', // palette.primary80, alpha 0.11
      level4: 'rgb(51, 46, 58)', // palette.primary80, alpha 0.12
      level5: 'rgb(52, 49, 63)', // palette.primary80, alpha 0.14
    },
  },
  spacing,
};
