import { render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

import { Typography } from './Typography';
import { DEFAULT_THEME as defaultTheme } from '../ThemeProvider/ThemeProvider';

describe('<Typography />', () => {
  it('renders its text content', async () => {
    await render(<Typography variant="body">Hello world</Typography>);

    expect(screen.getByText('Hello world')).toBeOnTheScreen();
  });

  it('renders long content in full', async () => {
    const longText = 'A '.repeat(200).trim();
    await render(<Typography variant="body">{longText}</Typography>);

    expect(screen.getByText(longText)).toBeOnTheScreen();
  });

  it('applies a visibly larger size for display than for meta text', async () => {
    await render(
      <>
        <Typography variant="display">Display</Typography>
        <Typography variant="meta">Meta</Typography>
      </>,
    );

    const display = screen.getByText('Display');
    const meta = screen.getByText('Meta');
    const displaySize = StyleSheet.flatten(display.props.style).fontSize;
    const metaSize = StyleSheet.flatten(meta.props.style).fontSize;
    expect(displaySize).toBeGreaterThan(metaSize);
  });

  it('defaults to the theme text color', async () => {
    await render(<Typography variant="body">Hello world</Typography>);

    expect(screen.getByText('Hello world')).toHaveStyle({ color: defaultTheme.color_text_primary });
  });

  it('lets an explicit style color override the theme default', async () => {
    await render(
      <Typography variant="body" style={{ color: '#ff0000' }}>
        Hello world
      </Typography>,
    );

    expect(screen.getByText('Hello world')).toHaveStyle({ color: '#ff0000' });
  });

  it('forwards additional accessibility props', async () => {
    await render(
      <Typography variant="body" accessibilityLabel="Custom label">
        Hello world
      </Typography>,
    );

    expect(screen.getByLabelText('Custom label')).toBeOnTheScreen();
  });

  it('defaults display/title/titleSm to accessibilityRole header', async () => {
    await render(
      <>
        <Typography variant="display">Display</Typography>
        <Typography variant="title">Title</Typography>
        <Typography variant="titleSm">Title sm</Typography>
      </>,
    );

    expect(screen.getByRole('header', { name: 'Display' })).toBeOnTheScreen();
    expect(screen.getByRole('header', { name: 'Title' })).toBeOnTheScreen();
    expect(screen.getByRole('header', { name: 'Title sm' })).toBeOnTheScreen();
  });

  it('does not default a non-heading variant to accessibilityRole header', async () => {
    await render(<Typography variant="body">Hello world</Typography>);

    expect(screen.queryByRole('header')).not.toBeOnTheScreen();
  });

  it('lets an explicit accessibilityRole override the heading default', async () => {
    await render(
      <Typography variant="title" accessibilityRole="text">
        Section title
      </Typography>,
    );

    expect(screen.queryByRole('header')).not.toBeOnTheScreen();
  });
});
