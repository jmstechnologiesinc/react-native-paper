import * as React from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import Text from '../Typography/Text';

import { white } from '../../styles/themes/v2/colors';
import getContrastingColor from '../../utils/getContrastingColor';
import theme from '../../styles/themes/v3/LightTheme';
import { moderateScale } from 'react-native-size-matters';

const defaultSize = moderateScale(64);

type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Initials to show as the text in the `Avatar`.
   */
  label: string;
  /**
   * Size of the avatar.
   */
  size?: number;
  /**
   * Custom color for the text.
   */
  color?: string;
  /**
   * Style for text container
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Style for the title.
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * @optional
   */
};

/**
 * Avatars can be used to represent people in a graphical way.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/avatar-text.png" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Avatar } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Avatar.Text size={24} label="XD" />
 * );
 * ```
 */
const AvatarText = ({
  label,
  size = defaultSize,
  style,
  labelStyle,
  color: customColor,
  ...rest
}: Props) => {
  const { backgroundColor = theme.colors?.primary, ...restStyle } =
    StyleSheet.flatten(style) || {};
  const textColor =
    customColor ??
    getContrastingColor(backgroundColor, white, 'rgba(0, 0, 0, .54)');

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / moderateScale(2),
          backgroundColor,
        },
        styles.container,
        restStyle,
      ]}
      {...rest}
    >
      <Text
        style={[
          styles.text,
          {
            color: textColor,
            fontSize: size / moderateScale(2),
            lineHeight: size,
          },
          labelStyle,
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
};

AvatarText.displayName = 'Avatar.Text';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default AvatarText;
