import color from 'color';

import theme from '../../styles/themes/v3/LightTheme';
import { tokens } from '../../styles/themes/v3/tokens';

export const getToggleButtonColor = ({
  checked,
}: {
  checked: boolean | null;
}) => {
  if (checked) {
    if (theme.isV3) {
      return color(theme.colors.onSecondaryContainer)
        .alpha(tokens.md.ref.opacity.level2)
        .rgb()
        .string();
    }
    if (theme.dark) {
      return 'rgba(255, 255, 255, .12)';
    }
    return 'rgba(0, 0, 0, .08)';
  }
  return 'transparent';
};
