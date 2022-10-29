import React from 'react';
import color from 'color';
import { StyleSheet } from 'react-native';
import type { ColorValue, StyleProp, ViewStyle } from 'react-native';

import { moderateScale } from 'react-native-size-matters';

import AppbarContent from './AppbarContent';
import AppbarAction from './AppbarAction';
import AppbarBackAction from './AppbarBackAction';
import overlay from '../../styles/overlay';
import theme from '../../styles/themes/v3/LightTheme';
import { black, white } from '../../styles/themes/v2/colors';

export type AppbarModes = 'small' | 'medium' | 'large' | 'center-aligned';

export const getAppbarColor = (
  elevation: number,
  customBackground?: ColorValue,
  elevated?: boolean
) => {
  const { isV3, dark: isDarkTheme, mode, colors } = theme;
  const isAdaptiveMode = mode === 'adaptive';
  if (customBackground) {
    return customBackground;
  }

  if (!isV3) {
    if (isDarkTheme && isAdaptiveMode) {
      return overlay(elevation, colors?.surface);
    }

    return colors.primary;
  }

  if (elevated) {
    return color(colors.surface)
      .mix(color(colors.primary), 0.08)
      .rgb()
      .string();
  }

  return colors.surface;
};

type RenderAppbarContentProps = {
  children: React.ReactNode;
  isDark: boolean;
  shouldCenterContent?: boolean;
  isV3: boolean;
  renderOnly?: React.ReactNode[];
  renderExcept?: React.ReactNode[];
  mode?: AppbarModes;
};

export const DEFAULT_APPBAR_HEIGHT = theme.spacing.xxxLarge;
const MD3_DEFAULT_APPBAR_HEIGHT = theme.spacing.xxxxLarge;

export const modeAppbarHeight = {
  small: MD3_DEFAULT_APPBAR_HEIGHT,
  medium: moderateScale(112),
  large: moderateScale(152),
  'center-aligned': MD3_DEFAULT_APPBAR_HEIGHT,
};

export const modeTextVariant = {
  small: 'titleLarge',
  medium: 'headlineSmall',
  large: 'headlineMedium',
  'center-aligned': 'titleLarge',
};

export const renderAppbarContent = ({
  children,
  isDark,
  shouldCenterContent = false,
  isV3,
  renderOnly,
  renderExcept,
  mode = 'small',
}: RenderAppbarContentProps) => {
  return (
    React.Children.toArray(children)
      .filter((child) => child != null && typeof child !== 'boolean')
      .filter((child) =>
        // @ts-expect-error: TypeScript complains about the type of type but it doesn't matter
        renderExcept ? !renderExcept.includes(child.type) : child
      )
      // @ts-expect-error: TypeScript complains about the type of type but it doesn't matter
      .filter((child) => (renderOnly ? renderOnly.includes(child.type) : child))
      .map((child, i) => {
        if (
          !React.isValidElement(child) ||
          ![AppbarContent, AppbarAction, AppbarBackAction].includes(
            // @ts-expect-error: TypeScript complains about the type of type but it doesn't matter
            child.type
          )
        ) {
          return child;
        }

        const props: {
          color?: string;
          style?: StyleProp<ViewStyle>;
          mode?: AppbarModes;
        } = {
          color: isV3
            ? undefined
            : typeof child.props.color !== 'undefined'
            ? child.props.color
            : isDark
            ? white
            : black,
        };

        if (child.type === AppbarContent) {
          props.mode = mode;
          props.style = [
            isV3 ? i === 0 && styles.v3Spacing : i !== 0 && styles.v2Spacing,
            shouldCenterContent &&
              (isV3
                ? styles.v3CenterAlignedContent
                : styles.v2CenterAlignedContent),
            child.props.style,
          ];
        }
        return React.cloneElement(child, props);
      })
  );
};

const styles = StyleSheet.create({
  v2Spacing: {
    marginLeft: theme.spacing.xxxSmall,
  },
  v2CenterAlignedContent: {
    alignItems: 'center',
  },
  v3Spacing: {
    marginLeft: theme.spacing.xxSmall,
  },
  v3CenterAlignedContent: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
