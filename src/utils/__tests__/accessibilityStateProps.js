import { Platform } from 'react-native';

import accessibilityStateProps from '../accessibilityStateProps';

const withPlatform = (os, run) => {
  const original = Platform.OS;
  Platform.OS = os;
  try {
    run();
  } finally {
    Platform.OS = original;
  }
};

describe('accessibilityStateProps', () => {
  it('gives iOS and Android the accessibilityState alone, as before', () => {
    ['ios', 'android'].forEach((os) =>
      withPlatform(os, () => {
        const state = { checked: true, disabled: true };
        expect(accessibilityStateProps('checkbox', state)).toEqual({
          accessibilityState: state,
        });
      })
    );
  });

  it('adds the ARIA twins on the web', () => {
    withPlatform('web', () => {
      expect(
        accessibilityStateProps('radio', { checked: false, disabled: true })
      ).toEqual({
        accessibilityState: { checked: false, disabled: true },
        'aria-checked': false,
        'aria-disabled': true,
      });
      expect(accessibilityStateProps('checkbox', { checked: true })).toEqual({
        accessibilityState: { checked: true },
        'aria-checked': true,
      });
      // A button-like control (a chip, a segmented button) is pressed or not.
      expect(accessibilityStateProps('button', { selected: true })).toEqual({
        accessibilityState: { selected: true },
        'aria-pressed': true,
      });
      expect(
        accessibilityStateProps('button', { checked: false, disabled: false })
      ).toEqual({
        accessibilityState: { checked: false, disabled: false },
        'aria-pressed': false,
      });
      // No state, no twin (a chip that only shows a status).
      expect(accessibilityStateProps('text', {})).toEqual({
        accessibilityState: {},
      });
    });
  });
});
