import * as React from 'react';
import {
  StyleSheet,
  StyleProp,
  ImageSourcePropType,
  ImageStyle,
  Image
} from 'react-native';

// import FastImage from 'react-native-fast-image';

import { withInternalTheme } from '../../core/theming';
import type { InternalTheme } from '../../types';

import { moderateScale } from '@jmstechnologiesinc/react-native-size-matters';
import { MD3LightTheme as theme } from '../../styles/themes/v3/LightTheme';

export type Props = {
  source: ImageSourcePropType;
  variant?: 'image' | 'video' | 'flag';
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
    }else if(variant === 'flag'){
      return [style, styles.flag]
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
    width: moderateScale(76),
    height: moderateScale(76),
  },
  flag: {
    width: moderateScale(40),
    height: moderateScale(40)
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
