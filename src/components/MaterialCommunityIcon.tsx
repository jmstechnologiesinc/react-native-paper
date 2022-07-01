import * as React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { black } from '../styles/themes/v2/colors';
// @ts-ignore:next-line
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export type IconProps = {
  icon: string;
  color?: string;
  size: number;
  direction: 'rtl' | 'ltr';
  allowFontScaling?: boolean;
};

export const accessibilityProps =
  Platform.OS === 'web'
    ? {
        role: 'img',
        focusable: false,
      }
    : {
        accessibilityElementsHidden: true,
        importantForAccessibility:
          'no-hide-descendants' as 'no-hide-descendants',
      };

const defaultIcon = ({
  icon,
  color = black,
  size,
  direction,
  allowFontScaling,
}: IconProps) => (
  <FontAwesomeIcon
    allowFontScaling={allowFontScaling}
    icon={icon}
    color={color}
    size={size}
    style={[
      {
        transform: [{ scaleX: direction === 'rtl' ? -1 : 1 }],
        lineHeight: size,
      },
      styles.icon,
    ]}
    pointerEvents="none"
    selectable={false}
    {...accessibilityProps}
  />
);

const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'transparent',
  },
});

export default defaultIcon;
