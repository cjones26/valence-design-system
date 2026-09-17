import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { themes } from '@valence/tokens';

import { ThemeProvider, useTheme } from './ThemeProvider';

const ThemeReporter = () => {
  const theme = useTheme();

  return <Text>{theme.color_text_primary}</Text>;
};

describe('<ThemeProvider />', () => {
  it('provides the default preset in light mode by default', async () => {
    await render(
      <ThemeProvider mode="light">
        <ThemeReporter />
      </ThemeProvider>,
    );

    expect(screen.getByText(themes['hi-vis'].light.color_text_primary)).toBeOnTheScreen();
  });

  it('provides the requested preset', async () => {
    await render(
      <ThemeProvider preset="bauhaus" mode="light">
        <ThemeReporter />
      </ThemeProvider>,
    );

    expect(screen.getByText(themes.bauhaus.light.color_text_primary)).toBeOnTheScreen();
  });

  it('provides dark mode tokens when mode is dark', async () => {
    await render(
      <ThemeProvider mode="dark">
        <ThemeReporter />
      </ThemeProvider>,
    );

    expect(screen.getByText(themes['hi-vis'].dark.color_text_primary)).toBeOnTheScreen();
  });

  it('applies token overrides on top of the preset', async () => {
    await render(
      <ThemeProvider mode="light" theme={{ color_text_primary: '#123456' }}>
        <ThemeReporter />
      </ThemeProvider>,
    );

    expect(screen.getByText('#123456')).toBeOnTheScreen();
  });

  it('falls back to the default theme outside a provider', async () => {
    await render(<ThemeReporter />);

    expect(screen.getByText(themes['hi-vis'].light.color_text_primary)).toBeOnTheScreen();
  });
});
