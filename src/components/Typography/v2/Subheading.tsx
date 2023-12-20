import * as React from 'react';
import { Text, TextStyle, StyleSheet, StyleProp } from 'react-native';

import StyledText from './StyledText';

import { moderateScale } from '@jmstechnologiesinc/react-native-size-matters';
import {MD3LightTheme as theme}  from '../../../styles/themes/v3/LightTheme';

export type Props = React.ComponentProps<typeof Text> & {
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
};

// @component-group Typography

/**
 * Typography component for showing a subheading.
 *
 * <div class="screenshots">
 *   <img src="screenshots/subheading.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Subheading } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Subheading>Subheading</Subheading>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Subheading = (props: Props) => (
  <StyledText
    {...props}
    alpha={0.87}
    family="regular"
    style={[styles.text, props.style]}
  />
);

export default Subheading;

const styles = StyleSheet.create({
  text: {
    fontSize: theme.spacing.x4,
    lineHeight: theme.spacing.x6,
    marginVertical: moderateScale(2),
    letterSpacing: moderateScale(0.5),
  },
});
