import * as React from 'react';
import {
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import { withInternalTheme } from '../../core/theming';
import Surface from '../Surface';
import Text from '../Typography/Text';
import { getChipColors } from './helpers';

import {MD3LightTheme as theme} from '../../styles/themes/v3/LightTheme';

const Chip = ({
  mode = 'flat',
  children,
  icon,
  avatar,
  selected = false,
  disabled = false,
  accessibilityLabel,
  closeIconAccessibilityLabel = 'Close',
  onPress,
  onLongPress,
  onClose,
  closeIcon,
  textStyle,
  style,
  theme,
  testID,
  selectedColor,
  showSelectedOverlay = false,
  ellipsizeMode,
  compact,
  elevated = false,
  ...rest
}) => {
  const isV3 = true;

  const isOutlined = mode === 'outlined';

  const defaultBorderRadius = 8;

  const {
    backgroundColor: customBackgroundColor,
    borderRadius = defaultBorderRadius,
  } = (StyleSheet.flatten(style) || {});

  const {
    borderColor,
    textColor,
    backgroundColor,
  } = getChipColors({
    isOutlined,
    theme,
    selectedColor,
    showSelectedOverlay,
    customBackgroundColor,
    disabled,
  });

  

  const elevationStyle = isV3 || Platform.OS === 'android' ? elevation : 0;
  const multiplier = isV3 ? (compact ? 1.5 : 2) : 1;
  const labelSpacings = {
    marginRight: onClose ? 0 : theme.spacing.x2 * multiplier,
    marginLeft:
      avatar || icon || selected
        ? theme.spacing.x1 * multiplier
        : theme.spacing.x2 * multiplier,
  };

  const labelTextStyle = {
    color: textColor,
    ...theme.fonts.labelLarge,
  };
  return (
    <Surface
      style={
        [
          styles.container,
          {  
            ...styles.md3OutlineContainer,
            elevation: elevationStyle,
            backgroundColor,
            borderColor,
            borderRadius,
          },
          style,
        ]
      }
      {...(theme.isV3 && { elevation: elevationStyle })}
      {...rest}
    >
        <View
          style={[styles.content, isV3 && styles.md3Content, {paddingRight: 4}]}
        >
          <Text
            variant="labelLarge"
            selectable={false}
            numberOfLines={1}
            style={[
              isV3 ? styles.md3LabelText : styles.labelText,
              labelTextStyle,
              labelSpacings,
              textStyle,
            ]}
            ellipsizeMode={ellipsizeMode}
          >
            {children}
          </Text>
        </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    flexDirection: Platform.select({ default: 'column', web: 'row' }),
  },
  md3OutlineContainer: {
    borderWidth: moderateScale(1),
  },
  md3FlatContainer: {
    borderWidth: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.spacing.x1,
    position: 'relative',
    flexGrow: 1,
  },
  md3Content: {
    paddingLeft: 0,
  },
  icon: {
    padding: theme.spacing.x1,
    alignSelf: 'center',
  },
  md3Icon: {
    paddingLeft: theme.spacing.x2,
    paddingRight: 0,
  },
  closeIcon: {
    marginRight: theme.spacing.x1,
  },
  md3CloseIcon: {
    marginRight: theme.spacing.x2,
    padding: 0,
  },
  labelText: {
    minHeight: theme.spacing.x6,
    lineHeight: theme.spacing.x6,
    textAlignVertical: 'center',
    marginVertical: theme.spacing.x1,
  },
  md3LabelText: {
    textAlignVertical: 'center',
    marginVertical: 6,
  },
  avatar: {
    width: theme.spacing.x6,
    height: theme.spacing.x6,
    borderRadius: theme.spacing.x3,
  },
  avatarWrapper: {
    marginRight: theme.spacing.x1,
  },
  md3AvatarWrapper: {
    marginLeft: theme.spacing.x1,
    marginRight: 0,
  },
  md3SelectedIcon: {
    paddingLeft: theme.spacing.x1,
  },
  avatarSelected: {
    position: 'absolute',
    top: theme.spacing.x1,
    left: theme.spacing.x1,
    backgroundColor: 'rgba(0, 0, 0, .29)',
  },
  closeButtonStyle: {
    position: 'absolute',
    right: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    flexGrow: 1,
  },
});

export default withInternalTheme(Chip);
