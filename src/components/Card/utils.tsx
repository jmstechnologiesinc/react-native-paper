import color from 'color';

import { black, white } from '../../styles/themes/v2/colors';
import theme from '../../styles/themes/v3/LightTheme';

type CardMode = 'elevated' | 'outlined' | 'contained';

export const getCardCoverStyle = ({
  index,
  total,
}: {
  index?: number;
  total?: number;
}) => {
  const { isV3, roundness } = theme;

  if (isV3) {
    return {
      borderRadius: 3 * roundness,
    };
  }

  if (index === 0) {
    if (total === 1) {
      return {
        borderRadius: roundness,
      };
    }

    return {
      borderTopLeftRadius: roundness,
      borderTopRightRadius: roundness,
    };
  }

  if (typeof total === 'number' && index === total - 1) {
    return {
      borderBottomLeftRadius: roundness,
    };
  }

  return undefined;
};

const getBorderColor = () => {
  if (theme.isV3) {
    return theme.colors.outline;
  }

  if (theme.dark) {
    return color(white).alpha(0.12).rgb().string();
  }
  return color(black).alpha(0.12).rgb().string();
};

const getBackgroundColor = ({
  isMode,
}: {
  isMode: (mode: CardMode) => boolean;
}) => {
  if (theme.isV3) {
    if (isMode('contained')) {
      return theme.colors.surfaceVariant;
    }
    if (isMode('outlined')) {
      return theme.colors.surface;
    }
  }
  return undefined;
};

export const getCardColors = ({ mode }: { mode: CardMode }) => {
  const isMode = (modeToCompare: CardMode) => {
    return mode === modeToCompare;
  };

  return {
    backgroundColor: getBackgroundColor({
      isMode,
    }),
    borderColor: getBorderColor(),
  };
};
