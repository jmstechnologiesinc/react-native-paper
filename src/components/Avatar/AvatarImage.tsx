import * as React from 'react';
import {
  Image,
  ImageProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { withInternalTheme } from '../../core/theming';
import { MD3LightTheme as theme } from '../../styles/themes/v3/LightTheme';
import type { InternalTheme } from '../../types';

const defaultSize = theme.spacing.x16;

export type AvatarImageSource =
  | ImageProps['source']
  | ((props: { size: number }) => React.ReactNode);

export type Props = React.ComponentPropsWithRef<typeof View> & {
  source: AvatarImageSource;
  size?: number;
  style?: StyleProp<ViewStyle>;
  onError?: ImageProps['onError'];
  onLayout?: ImageProps['onLayout'];
  onLoad?: ImageProps['onLoad'];
  onLoadEnd?: ImageProps['onLoadEnd'];
  onLoadStart?: ImageProps['onLoadStart'];
  onProgress?: ImageProps['onProgress'];
  theme: InternalTheme;
};

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
        <Image
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
