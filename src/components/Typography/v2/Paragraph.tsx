import * as React from 'react';
import { TextProps, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import StyledText from './StyledText';
import theme from '../../../styles/themes/v3/LightTheme';

type Props = TextProps & {
  children: React.ReactNode;
};

// @component-group Typography

/**
 * Typography component for showing a paragraph.
 *
 * <div class="screenshots">
 *   <img src="screenshots/paragraph.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Paragraph } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Paragraph>Paragraph</Paragraph>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Paragraph = (props: Props) => (
  <StyledText
    {...props}
    alpha={0.87}
    family="regular"
    style={[styles.text, props.style]}
  />
);

export default Paragraph;

const styles = StyleSheet.create({
  text: {
    fontSize: moderateScale(14),
    lineHeight: theme.spacing.x5,
    marginVertical: moderateScale(2),
    letterSpacing: moderateScale(0.25),
  },
});
