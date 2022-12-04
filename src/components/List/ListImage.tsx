import * as React from 'react';
import {
  StyleSheet,
  StyleProp,
  Image,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native';

import { moderateScale } from 'react-native-size-matters';

import { withInternalTheme } from '../../core/theming';
import { MD3LightTheme as theme } from '../../styles/themes/v3/LightTheme';
import type { InternalTheme } from '../../types';

export type Props = {
  source: ImageSourcePropType;
  variant?: 'image' | 'video';
  style?: StyleProp<ImageStyle>;
  /**
   * @optional
   */
  theme: InternalTheme;
};

/**
 * A component to show image in a list item.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/list-image.png" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { List, MD3Colors } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <>
 *     <List.Image variant="image" source={{uri: 'https://www.someurl.com/apple'}} />
 *     <List.Image variant="video" source={require('../../some-apple.png')} />
 *   </>
 * );
 *
 * export default MyComponent;
 * ```
 */
const ListImage = ({ style, source, variant = 'image', theme }: Props) => {
  const getStyles = () => {
    if (variant === 'video') {
      if (!theme.isV3) {
        return [style, styles.video];
      }

      return [style, styles.videoV3];
    }

    return [style, styles.image];
  };

  return (
    <Image
      style={getStyles()}
      source={source}
      accessibilityIgnoresInvertColors
      testID="list-image"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: theme.spacing.x14,
    height: theme.spacing.x14,
  },
  video: {
    width: moderateScale(100),
    height: moderateScale(64),
    marginLeft: 0,
  },
  videoV3: {
    width: moderateScale(114),
    height: theme.spacing.x16,
    marginLeft: 0,
  },
});

ListImage.displayName = 'List.Image';

export default withInternalTheme(ListImage);
