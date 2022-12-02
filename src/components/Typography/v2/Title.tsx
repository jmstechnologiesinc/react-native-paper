import * as React from 'react';
import { Text, StyleSheet } from 'react-native';

import { moderateScale } from 'react-native-size-matters';

import theme from '../../../styles/themes/v3/LightTheme';
import StyledText from './StyledText';

export type Props = React.ComponentProps<typeof Text> & {
  children: React.ReactNode;
};

// @component-group Typography

/**
 * Typography component for showing a title.
 *
 * <div class="screenshots">
 *   <img src="screenshots/title.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Title } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Title>Title</Title>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Title = (props: Props) => (
  <StyledText
    {...props}
    alpha={0.87}
    family="medium"
    style={[styles.text, props.style]}
  />
);

export default Title;

const styles = StyleSheet.create({
  text: {
    fontSize: theme.spacing.x5,
    lineHeight: moderateScale(30),
    marginVertical: moderateScale(2),
    letterSpacing: moderateScale(0.15),
  },
});
