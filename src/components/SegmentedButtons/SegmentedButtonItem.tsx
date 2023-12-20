import * as React from 'react';
import {
  Animated,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import color from 'color';

import { useInternalTheme } from '../../core/theming';
import type { IconSource } from '../Icon';
import Icon from '../Icon';
import TouchableRipple from '../TouchableRipple/TouchableRipple';
import Text from '../Typography/Text';
import {
  getSegmentedButtonBorderRadius,
  getSegmentedButtonColors,
  getSegmentedButtonDensityPadding,
} from './utils';

import { moderateScale } from '@jmstechnologiesinc/react-native-size-matters';
import {MD3LightTheme as theme} from '../../styles/themes/v3/LightTheme';

export type Props = {
  /**
   * Whether the segmented button is checked
   */
  checked: boolean;
  /**
   * Icon to display for the `SegmentedButtonItem`.
   */
  icon?: IconSource;
  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;
  /**
   * Accessibility label for the `SegmentedButtonItem`. This is read by the screen reader when the user taps the button.
   */
  accessibilityLabel?: string;
  /**
   * Function to execute on press.
   */
  onPress?: (event: GestureResponderEvent) => void;
  /**
   * Value of button.
   */
  value: string;
  /**
   * Label text of the button.
   */
  label?: string;

  /**
   * subLabel text of the button.
   */
  subLabel?: string;
  /**
   * Button segment.
   */
  segment?: 'first' | 'last' | 'single';
  /**
   * Show optional check icon to indicate selected state
   */
  showSelectedCheck?: boolean;
  /**
   * Density is applied to the height, to allow usage in denser UIs.
   */
  density?: 'regular' | 'small' | 'medium' | 'high';
  style?: StyleProp<ViewStyle>;
  /**
   * testID to be used on tests.
   */
  testID?: string;
};

const SegmentedButtonItem = ({
  checked,
  accessibilityLabel,
  disabled,
  style,
  showSelectedCheck,
  icon,
  testID,
  label,
  subLabel,
  onPress,
  segment,
  density = 'regular',
}: Props) => {
  const theme = useInternalTheme();

  const checkScale = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!showSelectedCheck) {
      return;
    }
    if (checked) {
      Animated.spring(checkScale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(checkScale, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [checked, checkScale, showSelectedCheck]);

  const { roundness, isV3 } = theme;
  const { borderColor, textColor, borderWidth, backgroundColor } =
    getSegmentedButtonColors({
      checked,
      theme,
      disabled,
    });

  const borderRadius = (isV3 ? moderateScale(5) : moderateScale(1)) * roundness;
  const segmentBorderRadius = getSegmentedButtonBorderRadius({
    theme,
    segment,
  });
  const rippleColor = color(textColor).alpha(0.12).rgb().string();

  const iconSize = isV3 ? moderateScale(18) : theme.spacing.x4;
  const iconStyle = {
    marginRight: label
      ? moderateScale(5)
      : checked && showSelectedCheck
      ? moderateScale(3)
      : 0,
    ...(label && {
      transform: [
        {
          scale: checkScale.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        },
      ],
    }),
  };

  const buttonStyle: ViewStyle = {
    backgroundColor,
    borderColor,
    borderWidth,
    borderRadius,
    ...segmentBorderRadius,
  };
  const paddingVertical = getSegmentedButtonDensityPadding({ density });
  const rippleStyle: ViewStyle = {
    borderRadius,
    ...segmentBorderRadius,
  };
  const showIcon = icon && !label ? true : checked ? !showSelectedCheck : true;
  const labelTextStyle: TextStyle = {
    ...(!isV3
      ? {
          textTransform: 'uppercase',
          fontWeight: '500',
        }
      : theme.fonts.labelLarge),
    color: textColor,
  };

  const descriptionColor = theme.isV3
    ? theme.colors.onSurfaceVariant
    : color(theme.colors.text).alpha(0.54).rgb().string();

  return (
    <View style={[buttonStyle, styles.button, style]}>
      <TouchableRipple
        borderless
        onPress={onPress}
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled, checked }}
        accessibilityRole="button"
        disabled={disabled}
        rippleColor={rippleColor}
        testID={testID}
        style={rippleStyle}
      >
        <View
          style={
            subLabel
              ? [styles.subLabelContent, { paddingVertical, paddingBottom: 3 }]
              : [styles.content, { paddingVertical }]
          }
        >
          {checked && showSelectedCheck ? (
            <Animated.View
              testID={`${testID}-check-icon`}
              style={[iconStyle, { transform: [{ scale: checkScale }] }]}
            >
              <Icon source={'check'} size={iconSize} />
            </Animated.View>
          ) : null}
          {showIcon ? (
            <Animated.View style={iconStyle}>
              <Icon
                source={icon}
                size={iconSize}
                color={disabled ? textColor : undefined}
              />
            </Animated.View>
          ) : null}
          <Text
            variant="labelLarge"
            style={[styles.label, labelTextStyle]}
            selectable={false}
            numberOfLines={1}
          >
            {label}
          </Text>
          {subLabel ? (
            <Text
              variant={'bodyMedium'}
              style={[styles.label, { color: descriptionColor }]}
              selectable={false}
              numberOfLines={1}
            >
              {subLabel}
            </Text>
          ) : null}
        </View>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    minWidth: theme.spacing.x19,
    borderStyle: 'solid',
  },
  label: {
    textAlign: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(9),
    paddingHorizontal: theme.spacing.x4,
  },
  subLabelContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(9),
  },
});

export default SegmentedButtonItem;

const SegmentedButtonWithTheme = SegmentedButtonItem;
export { SegmentedButtonWithTheme as SegmentedButton };
