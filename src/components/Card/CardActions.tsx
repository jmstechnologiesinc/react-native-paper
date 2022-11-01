import * as React from 'react';
import { StyleSheet, StyleProp, View, ViewStyle } from 'react-native';
import theme from '../../styles/themes/v3/LightTheme';

type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Items inside the `CardActions`.
   */
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

/**
 * A component to show a list of actions inside a Card.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="small" src="screenshots/card-actions.png" />
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Card, Button } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Card>
 *     <Card.Actions>
 *       <Button>Cancel</Button>
 *       <Button>Ok</Button>
 *     </Card.Actions>
 *   </Card>
 * );
 *
 * export default MyComponent;
 * ```
 */
const CardActions = (props: Props) => {
  const { isV3 } = theme;
  const justifyContent = isV3 ? 'flex-end' : 'flex-start';

  return (
    <View
      {...props}
      style={[styles.container, props.style, { justifyContent }]}
    >
      {React.Children.map(props.children, (child, i) => {
        return React.isValidElement(child)
          ? React.cloneElement(child, {
              compact: !isV3 && child.props.compact !== false,
              mode: isV3 && (i === 0 ? 'outlined' : 'contained'),
              style: isV3 && styles.button,
            })
          : child;
      })}
    </View>
  );
};

CardActions.displayName = 'Card.Actions';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.x2,
  },
  button: {
    marginLeft: theme.spacing.x2,
  },
});

export default CardActions;
