import * as React from 'react';
import { Text, TextStyle, StyleSheet, StyleProp } from 'react-native';

import { moderateScale } from 'react-native-size-matters';

import theme from '../../../styles/themes/v3/LightTheme';
import StyledText from './StyledText';

export type Props = React.ComponentProps<typeof Text> & {
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
};

// @component-group Typography

/**
 * Typography component for showing a caption.
 *
 * <div class="screenshots">
 *   <img src="screenshots/caption.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Caption } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Caption>Caption</Caption>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Caption = (props: Props) => (
  <StyledText
    {...props}
    alpha={0.54}
    family="regular"
    style={[styles.text, props.style]}
  />
);

export default Caption;

const styles = StyleSheet.create({
  text: {
    fontSize: theme.spacing.x3,
    lineHeight: theme.spacing.x5,
    marginVertical: moderateScale(2),
    letterSpacing: moderateScale(0.4),
  },
});
