import React from 'react';
import type { ColorValue, StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';

import color from 'color';
import { moderateScale } from 'react-native-size-matters';

import overlay from '../../styles/overlay';
import { black, white } from '../../styles/themes/v2/colors';
import theme from '../../styles/themes/v3/LightTheme';
import Tooltip from '../Tooltip/Tooltip';
import AppbarAction from './AppbarAction';
import AppbarBackAction from './AppbarBackAction';
import AppbarContent from './AppbarContent';

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
  renderOnly?: React.ComponentType<any>[];
  renderExcept?: React.ComponentType<any>[];
  mode?: AppbarModes;
};

export const DEFAULT_APPBAR_HEIGHT = theme.spacing.x14;
const MD3_DEFAULT_APPBAR_HEIGHT = theme.spacing.x16;

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
    React.Children.toArray(children as React.ReactNode | React.ReactNode[])
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
          ![AppbarContent, AppbarAction, AppbarBackAction, Tooltip].includes(
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
          color:
            typeof child.props.color !== 'undefined'
              ? child.props.color
              : isV3
              ? undefined
              : isDark
              ? white
              : black,
        };

        if (child.type === AppbarContent) {
          props.mode = mode;
          props.style = [
            isV3
              ? i === 0 && !shouldCenterContent && styles.v3Spacing
              : i !== 0 && styles.v2Spacing,
            shouldCenterContent && styles.centerAlignedContent,
            child.props.style,
          ];
        }
        return React.cloneElement(child, props);
      })
  );
};

const styles = StyleSheet.create({
  centerAlignedContent: {
    alignItems: 'center',
  },
  v2Spacing: {
    marginLeft: theme.spacing.x2,
  },
  v3Spacing: {
    marginLeft: theme.spacing.x3,
  },
});
