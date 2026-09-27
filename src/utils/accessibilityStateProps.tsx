import { Platform } from 'react-native';
import type { AccessibilityRole, AccessibilityState, Role } from 'react-native';

// The roles whose `checked` / `selected` state a browser reads as `aria-checked`; any other role (a toggle button, a
// chip) reads a pressed state instead.
const CHECKABLE_ROLES: ReadonlyArray<AccessibilityRole | Role> = [
  'checkbox',
  'radio',
  'switch',
  'menuitemcheckbox',
  'menuitemradio',
];

type Props = {
  accessibilityState: AccessibilityState;
  'aria-checked'?: boolean | 'mixed';
  'aria-pressed'?: boolean;
  'aria-disabled'?: boolean;
};

/**
 * The accessibility state of a component, as each platform reads it. iOS and Android read `accessibilityState`,
 * exactly as before. react-native-web reads only the `aria-*` props (it ignores `accessibilityState`), so on the web
 * the same state is also given as its ARIA twins: `checked` of a checkbox, radio or switch is `aria-checked`, the
 * `checked`/`selected` of a button-like control is `aria-pressed`, and `disabled` is `aria-disabled`.
 */
const accessibilityStateProps = (
  role: AccessibilityRole | Role | undefined,
  state: AccessibilityState
): Props => {
  if (Platform.OS !== 'web') {
    return { accessibilityState: state };
  }
  const props: Props = { accessibilityState: state };
  const { checked, selected, disabled } = state;
  if (role && CHECKABLE_ROLES.includes(role)) {
    if (checked !== undefined) props['aria-checked'] = checked;
  } else if (checked !== undefined || selected !== undefined) {
    props['aria-pressed'] = Boolean(checked ?? selected);
  }
  if (disabled) props['aria-disabled'] = true;
  return props;
};

export default accessibilityStateProps;
