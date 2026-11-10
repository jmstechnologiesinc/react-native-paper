import React from 'react';

import { render } from '@testing-library/react-native';
import color from 'color';
import renderer from 'react-test-renderer';

import { getTheme } from '../../../core/theming';
import { black, white } from '../../../styles/themes/v2/colors';
import { MD3LightTheme } from '../../../styles/themes/v3/LightTheme';
import Button from '../../Button/Button';
import Card from '../../Card/Card';
import { getCardColors, getCardCoverStyle } from '../../Card/utils';

describe('Card', () => {
  it('renders an outlined card', () => {
    const tree = renderer.create(<Card mode="outlined" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders with a custom theme', () => {
    const { getByLabelText } = render(
      <Card
        mode="outlined"
        accessibilityLabel="card"
        theme={{ colors: { surface: '#0000FF' } }}
      />
    );

    expect(getByLabelText('card')).toHaveStyle({
      backgroundColor: '#0000FF',
    });
  });
});

describe('CardActions', () => {
  it('renders button with passed mode', () => {
    const { getByTestId } = render(
      <Card>
        <Card.Actions testID="card-actions">
          <Button mode="contained">Agree</Button>
        </Card.Actions>
      </Card>
    );

    expect(getByTestId('card-actions').props.children[0].props.mode).toBe(
      'contained'
    );
  });
});

// Card lists its children by the exported components' own names (withTheme(Card.Cover), withTheme(Card.Title)):
// a content after a cover or a title opens with the card's spacing.
describe('CardContent', () => {
  it('takes the top spacing after a cover', () => {
    const { getByTestId } = render(
      <Card>
        <Card.Cover source={{ uri: 'https://example.com/cover.png' }} />
        <Card.Content testID="card-content" />
        <Card.Actions>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    );

    expect(getByTestId('card-content')).toHaveStyle({
      paddingTop: MD3LightTheme.spacing.x4,
    });
  });

  it('takes the top spacing after a title', () => {
    const { getByTestId } = render(
      <Card>
        <Card.Title title="Title" />
        <Card.Content testID="card-content" />
        <Card.Actions>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    );

    expect(getByTestId('card-content')).toHaveStyle({
      paddingTop: MD3LightTheme.spacing.x4,
    });
  });
});

describe('getCardColors - background color', () => {
  it('should return correct theme color, for theme version 3, contained mode', () => {
    expect(
      getCardColors({
        theme: getTheme(),
        mode: 'contained',
      })
    ).toMatchObject({ backgroundColor: getTheme().colors.surfaceVariant });
  });

  it('should return correct theme color, for theme version 3, outlined mode', () => {
    expect(
      getCardColors({
        theme: getTheme(),
        mode: 'outlined',
      })
    ).toMatchObject({ backgroundColor: getTheme().colors.surface });
  });

  it('should return undefined, for theme version 3, elevated mode', () => {
    expect(
      getCardColors({
        theme: getTheme(),
        mode: 'elevated',
      })
    ).toMatchObject({ backgroundColor: undefined });
  });

  it('should return undefined, for theme version 2', () => {
    expect(
      getCardColors({
        theme: getTheme(false, false),
      })
    ).toMatchObject({ backgroundColor: undefined });
  });
});

describe('getCardColors - border color', () => {
  it('should return correct theme color, for theme version 3', () => {
    expect(
      getCardColors({
        theme: getTheme(),
      })
    ).toMatchObject({ borderColor: getTheme().colors.outline });
  });

  it('should return correct color, for theme version 2, dark mode', () => {
    expect(
      getCardColors({
        theme: getTheme(true, false),
      })
    ).toMatchObject({
      borderColor: color(white).alpha(0.12).rgb().string(),
    });
  });

  it('should return correct color, for theme version 2, light mode', () => {
    expect(
      getCardColors({
        theme: getTheme(false, false),
      })
    ).toMatchObject({
      borderColor: color(black).alpha(0.12).rgb().string(),
    });
  });
});

describe('getCardCoverStyle - border radius', () => {
  it('should return correct border radius based on roundness, for theme version 3', () => {
    expect(
      getCardCoverStyle({
        theme: getTheme(),
      })
    ).toMatchObject({ borderRadius: 3 * getTheme().roundness });
  });

  it('should return correct border radius based on roundness, for theme version 2, when index is 0 and total is 1', () => {
    expect(
      getCardCoverStyle({
        theme: getTheme(false, false),
        index: 0,
        total: 1,
      })
    ).toMatchObject({ borderRadius: getTheme(false, false).roundness });
  });

  it('should return correct border radius based on roundness, for theme version 2, when index is 0 and total is other than 1', () => {
    expect(
      getCardCoverStyle({
        theme: getTheme(false, false),
        index: 0,
        total: 2,
      })
    ).toMatchObject({
      borderTopLeftRadius: getTheme(false, false).roundness,
      borderTopRightRadius: getTheme(false, false).roundness,
    });
  });

  it('should return correct border radius based on roundness, for theme version 2, when index is equal to total - 1', () => {
    expect(
      getCardCoverStyle({
        theme: getTheme(false, false),
        index: 1,
        total: 2,
      })
    ).toMatchObject({
      borderBottomLeftRadius: getTheme(false, false).roundness,
    });
  });
});
