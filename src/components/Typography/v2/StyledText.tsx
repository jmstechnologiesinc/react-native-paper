import * as React from 'react';
import { I18nManager, StyleProp, StyleSheet, TextStyle } from 'react-native';

import color from 'color';
import type { ThemeProp } from 'src/types';

import theme from '../../../styles/themes/v3/LightTheme';
import Text from './Text';

type Props = React.ComponentProps<typeof Text> & {
  alpha?: number;
  family: 'regular' | 'medium' | 'light' | 'thin';
  style?: StyleProp<TextStyle>;
  theme?: ThemeProp;
};

const StyledText = ({ alpha = 1, family, style, ...rest }: Props) => {
  const textColor = color(
    theme.isV3 ? theme.colors.onSurface : theme.colors?.text
  )
    .alpha(alpha)
    .rgb()
    .string();
  const writingDirection = I18nManager.getConstants().isRTL ? 'rtl' : 'ltr';

  return (
    <Text
      {...rest}
      style={[
        styles.text,
        {
          color: textColor,
          ...(!theme.isV3 && theme.fonts?.[family]),
          writingDirection,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
  },
});

export default StyledText;
