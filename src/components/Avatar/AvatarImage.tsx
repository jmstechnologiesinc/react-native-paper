import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import FastImage, { FastImageProps, Source } from 'react-native-fast-image';

import { withInternalTheme } from '../../core/theming';
import type { InternalTheme } from '../../types';

import { MD3LightTheme as theme } from '../../styles/themes/v3/LightTheme';

const defaultSize = theme.spacing.x16;

export type AvatarImageSource =
  | Source
  | ((props: { size: number }) => React.ReactNode);

export type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Image to display for the `Avatar`.
   * It accepts a standard React Native Image `source` prop
   * Or a function that returns an `Image`.
   */
  source: AvatarImageSource;
  /**
   * Size of the avatar.
   */
  size?: number;
  style?: StyleProp<ViewStyle>;
  /**
   * Invoked on load error.
   */
  onError?: FastImageProps['onError'];
  /**
   * Invoked on mount and on layout changes.
   */
  onLayout?: FastImageProps['onLayout'];
  /**
   * Invoked when load completes successfully.
   */
  onLoad?: FastImageProps['onLoad'];
  /**
   * Invoked when load either succeeds or fails.
   */
  onLoadEnd?: FastImageProps['onLoadEnd'];
  /**
   * Invoked on load start.
   */
  onLoadStart?: FastImageProps['onLoadStart'];
  /**
   * Invoked on download progress.
   */
  onProgress?: FastImageProps['onProgress'];
  /**
   * @optional
   */
  theme: InternalTheme;
};

/**
 * Avatars can be used to represent people in a graphical way.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/avatar-image.png" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Avatar } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Avatar.Image size={24} source={require('../assets/avatar.png')} />
 * );
 * export default MyComponent
 * ```
 */
const AvatarImage = ({
  size = defaultSize,
  source,
  style,
  onError,
  onLayout,
  onLoad,
  onLoadEnd,
  onLoadStart,
  onProgress,
  theme,
  ...rest
}: Props) => {
  const { colors } = theme;

  const { backgroundColor = colors?.primary } = StyleSheet.flatten(style) || {};

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
        style,
      ]}
      {...rest}
    >
      {typeof source === 'function' && source({ size })}
      {typeof source !== 'function' && (
        <FastImage
          source={source}
          style={{ width: size, height: size, borderRadius: size / 2 }}
          onError={onError}
          onLayout={onLayout}
          onLoad={onLoad}
          onLoadEnd={onLoadEnd}
          onLoadStart={onLoadStart}
          onProgress={onProgress}
          accessibilityIgnoresInvertColors
        />
      )}
    </View>
  );
};

AvatarImage.displayName = 'Avatar.Image';

export default withInternalTheme(AvatarImage);
