import { BackHandler as NativeBackHandler } from 'react-native';

import { BackHandler as DefaultBackHandler } from '../BackHandler/BackHandler';
import { BackHandler as NativePlatformBackHandler } from '../BackHandler/BackHandler.native';

describe('BackHandler', () => {
  it("is react-native's own on iOS and Android", () => {
    expect(NativePlatformBackHandler).toBe(NativeBackHandler);
  });

  it('is inert elsewhere (the web has no hardware back button)', () => {
    const handler = jest.fn();
    const subscription = DefaultBackHandler.addEventListener(
      'hardwareBackPress',
      handler
    );
    expect(typeof subscription.remove).toBe('function');
    expect(() => subscription.remove()).not.toThrow();
    expect(handler).not.toHaveBeenCalled();
  });
});
