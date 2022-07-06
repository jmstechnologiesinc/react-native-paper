import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { RadioButtonContext, RadioButtonContextType } from './RadioButtonGroup';
import { handlePress, isChecked } from './utils';
// @ts-ignore:next-line
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import TouchableRipple from '../TouchableRipple/TouchableRipple';

import type { $RemoveChildren } from '../../types';
import { getSelectionControlIOSColor } from '../Checkbox/utils';

// @ts-ignore:next-line
import { faCheck } from '@fortawesome/pro-regular-svg-icons';

type Props = $RemoveChildren<typeof TouchableRipple> & {
  /**
   * Value of the radio button
   */
  value: string;
  /**
   * Status of radio button.
   */
  status?: 'checked' | 'unchecked';
  /**
   * Whether radio is disabled.
   */
  disabled?: boolean;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  /**
   * Custom color for radio.
   */
  color?: string;
  /**
   * @optional
   */

  /**
   * testID to be used on tests.
   */
  testID?: string;
};

/**
 * Radio buttons allow the selection a single option from a set.
 * This component follows platform guidelines for iOS, but can be used
 * on any platform.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/radio-enabled.ios.png" />
 *     <figcaption>Enabled</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/radio-disabled.ios.png" />
 *     <figcaption>Disabled</figcaption>
 *   </figure>
 * </div>
 */
const RadioButtonIOS = ({
  disabled,
  onPress,
  status,
  value,
  testID,
  ...rest
}: Props) => {
  return (
    <RadioButtonContext.Consumer>
      {(context?: RadioButtonContextType) => {
        const checked =
          isChecked({
            contextValue: context?.value,
            status,
            value,
          }) === 'checked';

        const { checkedColor, rippleColor } = getSelectionControlIOSColor({
          disabled,
          customColor: rest.color,
        });

        return (
          <TouchableRipple
            {...rest}
            borderless
            rippleColor={rippleColor}
            onPress={
              disabled
                ? undefined
                : () => {
                    handlePress({
                      onPress,
                      value,
                      onValueChange: context?.onValueChange,
                    });
                  }
            }
            accessibilityRole="radio"
            accessibilityState={{ disabled, checked }}
            accessibilityLiveRegion="polite"
            style={styles.container}
            testID={testID}
          >
            <View style={{ opacity: checked ? 1 : 0 }}>
              <FontAwesomeIcon
                allowFontScaling={false}
                icon={faCheck}
                size={24}
                color={checkedColor}
                direction="ltr"
              />
            </View>
          </TouchableRipple>
        );
      }}
    </RadioButtonContext.Consumer>
  );
};

RadioButtonIOS.displayName = 'RadioButton.IOS';

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    padding: 6,
  },
});

export default RadioButtonIOS;

export { RadioButtonIOS };
