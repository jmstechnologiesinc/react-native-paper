import * as React from 'react';
import { Animated, StyleSheet } from 'react-native';

import AnimatedText from '../../Typography/AnimatedText';
import type { LabelBackgroundProps } from '../types';
import { moderateScale } from '@jmstechnologiesinc/react-native-size-matters';
import { MD3LightTheme as theme } from '../../../styles/themes/v3/LightTheme';

const LabelBackground = ({
  labeled,
  labelLayoutWidth,
  placeholderStyle,
  baseLabelTranslateX,
  topPosition,
  label,
  backgroundColor,
  roundness,
  labelStyle,
  maxFontSizeMultiplier,
  testID,
}: LabelBackgroundProps) => {
  const opacity = labeled.interpolate({
    inputRange: [0, 0.6],
    outputRange: [1, 0],
  });

  const labelTranslationX = {
    translateX: labeled.interpolate({
      inputRange: [0, 1],
      outputRange: [-baseLabelTranslateX, 0],
    }),
  };

  const labelTextScaleY = {
    scaleY: labeled.interpolate({
      inputRange: [0, 1],
      outputRange: [0.2, 1],
    }),
  };

  const labelTextTransform = [...labelStyle.transform, labelTextScaleY];

  const isRounded = roundness > 6;
  const roundedEdgeCover = isRounded ? (
    <Animated.View
      key="labelBackground-view"
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFill,
        styles.view,
        {
          backgroundColor,
          maxHeight: Math.max(roundness / 3, 2),
          bottom: Math.max(roundness, 2),
          transform: [labelTranslationX],
          opacity,
        },
      ]}
    />
  ) : null;

  return [
    roundedEdgeCover,
    <AnimatedText
      key="labelBackground-text"
      testID={`${testID}-label-background`}
      style={[
        placeholderStyle,
        labelStyle,
        styles.outlinedLabel,
        {
          top: topPosition + 1,
          width: labelLayoutWidth - placeholderStyle.paddingHorizontal,
          backgroundColor,
          opacity,
          transform: labelTextTransform,
        },
      ]}
      numberOfLines={1}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
    >
      {typeof label === 'string' ? label : label?.props.children}
    </AnimatedText>,
  ];
};

export default LabelBackground;

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    top: moderateScale(6),
    left: moderateScale(10),
    width: theme.spacing.x3,
  },
  // eslint-disable-next-line react-native/no-color-literals
  outlinedLabel: {
    position: 'absolute',
    left: theme.spacing.x2,
    paddingHorizontal: 0,
    color: 'transparent',
  },
});
