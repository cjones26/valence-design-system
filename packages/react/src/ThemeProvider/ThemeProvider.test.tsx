import { render, screen } from '@testing-library/react';

import { ThemeProvider } from './ThemeProvider';

describe('<ThemeProvider />', () => {
  it('renders its children', () => {
    render(
      <ThemeProvider>
        <span>content</span>
      </ThemeProvider>,
    );

    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('applies camel-case token overrides as CSS custom properties', () => {
    render(
      <ThemeProvider theme={{ colorTextPrimary: '#123456' }}>
        <span>content</span>
      </ThemeProvider>,
    );

    expect(screen.getByText('content').parentElement).toHaveStyle('--color-text-primary: #123456');
  });
});
