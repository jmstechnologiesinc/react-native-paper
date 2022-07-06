import color from 'color';
import theme from '../../styles/themes/v3/LightTheme';
import { white, black } from '../../styles/themes/v2/colors';
import type { IconSource } from '../Icon';

export const MIN_WIDTH = 112;
export const MAX_WIDTH = 280;

type ContentProps = {
  isV3: boolean;
  iconWidth: number;
  leadingIcon?: IconSource;
  trailingIcon?: IconSource;
};

type ColorProps = {
  disabled?: boolean;
};

const getDisabledColor = () => {
  if (theme.isV3) {
    return theme.colors.onSurfaceDisabled;
  }

  return color(theme.dark ? white : black)
    .alpha(0.32)
    .rgb()
    .string();
};

const getTitleColor = ({ disabled }: ColorProps) => {
  if (disabled) {
    return getDisabledColor();
  }

  if (theme.isV3) {
    return theme.colors.onSurface;
  }

  return color(theme.colors.text).alpha(0.87).rgb().string();
};

const getIconColor = ({ disabled }: ColorProps) => {
  if (disabled) {
    return getDisabledColor();
  }

  if (theme.isV3) {
    return theme.colors.onSurfaceVariant;
  }

  return color(theme.colors.text).alpha(0.54).rgb().string();
};

export const getMenuItemColor = ({ disabled }: ColorProps) => {
  return {
    titleColor: getTitleColor({ disabled }),
    iconColor: getIconColor({ disabled }),
    underlayColor: theme.isV3
      ? color(theme.colors.primary).alpha(0.12).rgb().string()
      : undefined,
  };
};

export const getContentMaxWidth = ({
  isV3,
  iconWidth,
  leadingIcon,
  trailingIcon,
}: ContentProps) => {
  if (isV3) {
    if (leadingIcon && trailingIcon) {
      return MAX_WIDTH - (2 * iconWidth + 24);
    }

    if (leadingIcon || trailingIcon) {
      return MAX_WIDTH - (iconWidth + 24);
    }

    return MAX_WIDTH - 12;
  }

  if (leadingIcon) {
    return MAX_WIDTH - (iconWidth + 48);
  }

  return MAX_WIDTH - 16;
};
