import * as React from 'react';
import { View, ViewStyle, StyleSheet, StyleProp } from 'react-native';

import { withInternalTheme } from '../../core/theming';
import { MD3LightTheme as theme } from '../../styles/themes/v3/LightTheme';
import type { InternalTheme } from '../../types';
import Icon, { IconSource } from '../Icon';

export type Props = {
  /**
   * Icon to show.
   */
  icon: IconSource;
  /**
   * Color for the icon.
   */
  color?: string;
  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  theme: InternalTheme;
};

const ICON_SIZE = theme.spacing.x6;

/**
 * A component to show an icon in a list item.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/list-icon.png" />
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
 *     <List.Icon color={MD3Colors.tertiary70} icon="folder" />
 *     <List.Icon color={MD3Colors.tertiary70} icon="equal" />
 *     <List.Icon color={MD3Colors.tertiary70} icon="calendar" />
 *   </>
 * );
 *
 * export default MyComponent;
 * ```
 */
const ListIcon = ({ icon, color: iconColor, style, theme }: Props) => (
  <View
    style={[theme.isV3 ? styles.itemV3 : styles.item, style]}
    pointerEvents="box-none"
  >
    <Icon source={icon} size={ICON_SIZE} color={iconColor} />
  </View>
);

const styles = StyleSheet.create({
  item: {
    margin: theme.spacing.x2,
    height: theme.spacing.x10,
    width: theme.spacing.x10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemV3: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

ListIcon.displayName = 'List.Icon';

export default withInternalTheme(ListIcon);
