// The hardware back button exists only on Android. react-native-web's `BackHandler` logs «BackHandler is not supported
// on web» on every subscription, so the web (and any other non-native platform) gets an inert one. Upstream
// react-native-paper #4085.
function emptyFunction() {}

export const BackHandler = {
  exitApp: emptyFunction,
  addEventListener(): { remove: () => void } {
    return {
      remove: emptyFunction,
    };
  },
  removeEventListener: emptyFunction,
};
