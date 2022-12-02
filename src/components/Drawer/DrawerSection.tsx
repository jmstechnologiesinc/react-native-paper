import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import color from 'color';

import theme from '../../styles/themes/v3/LightTheme';
import { MD3Colors } from '../../styles/themes/v3/tokens';
import Divider from '../Divider';
import Text from '../Typography/Text';

export type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Title to show as the header for the section.
   */
  title?: string;
  /**
   * Content of the `Drawer.Section`.
   */
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
};

/**
 * A component to group content inside a navigation drawer.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="small" src="screenshots/drawer-section.png" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Drawer } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [active, setActive] = React.useState('');
 *
 *   return (
 *     <Drawer.Section title="Some title">
 *       <Drawer.Item
 *         label="First Item"
 *         active={active === 'first'}
 *         onPress={() => setActive('first')}
 *       />
 *       <Drawer.Item
 *         label="Second Item"
 *         active={active === 'second'}
 *         onPress={() => setActive('second')}
 *       />
 *     </Drawer.Section>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const DrawerSection = ({ children, title, style, ...rest }: Props) => {
  const { isV3 } = theme;
  const titleColor = isV3
    ? theme.colors.onSurfaceVariant
    : color(theme.colors.text).alpha(0.54).rgb().string();
  const titleMargin = isV3 ? theme.spacing.x7 : theme.spacing.x4;
  const font = isV3 ? theme.fonts.titleSmall : theme.fonts.medium;

  return (
    <View style={[styles.container, style]} {...rest}>
      {title && (
        <View style={[styles.titleContainer, isV3 && styles.v3TitleContainer]}>
          {title && (
            <Text
              variant="titleSmall"
              numberOfLines={1}
              style={[
                {
                  color: titleColor,
                  marginLeft: titleMargin,
                  ...font,
                },
              ]}
            >
              {title}
            </Text>
          )}
        </View>
      )}
      {children}
      <Divider
        {...(isV3 && { horizontalInset: true, bold: true })}
        style={[styles.divider, isV3 && styles.v3Divider]}
      />
    </View>
  );
};

DrawerSection.displayName = 'Drawer.Section';

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.x1,
  },
  titleContainer: {
    height: theme.spacing.x10,
    justifyContent: 'center',
  },
  v3TitleContainer: {
    height: theme.spacing.x14,
  },
  divider: {
    marginTop: theme.spacing.x1,
  },
  v3Divider: {
    backgroundColor: MD3Colors.neutralVariant50,
  },
});

export default DrawerSection;
