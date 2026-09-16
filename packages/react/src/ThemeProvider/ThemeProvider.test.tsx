import { render, screen } from '@testing-library/react';

import { ThemeProvider } from './ThemeProvider';

describe('<ThemeProvider />', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders its children', () => {
    render(
      <ThemeProvider>
        <span>content</span>
      </ThemeProvider>,
    );

    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('exposes the requested preset for descendant styling', () => {
    render(
      <ThemeProvider preset="bauhaus">
        <span>content</span>
      </ThemeProvider>,
    );

    expect(screen.getByText('content').parentElement).toHaveAttribute('data-preset', 'bauhaus');
  });

  it('exposes the requested mode for descendant styling', () => {
    render(
      <ThemeProvider mode="dark">
        <span>content</span>
      </ThemeProvider>,
    );

    expect(screen.getByText('content').parentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('applies token overrides as CSS custom properties', () => {
    render(
      <ThemeProvider theme={{ color_text_primary: '#123456' }}>
        <span>content</span>
      </ThemeProvider>,
    );

    expect(screen.getByText('content').parentElement).toHaveStyle({ '--color-text-primary': '#123456' });
  });

  it('defaults the preset attribute to hi-vis when not provided', () => {
    render(
      <ThemeProvider>
        <span>content</span>
      </ThemeProvider>,
    );

    expect(screen.getByText('content').parentElement).toHaveAttribute('data-preset', 'hi-vis');
  });

  it('always resolves a concrete mode alongside a requested preset', () => {
    render(
      <ThemeProvider preset="bauhaus">
        <span>content</span>
      </ThemeProvider>,
    );

    const wrapper = screen.getByText('content').parentElement;
    expect(wrapper).toHaveAttribute('data-preset', 'bauhaus');
    expect(wrapper).toHaveAttribute('data-theme', expect.stringMatching(/^(light|dark)$/));
  });

  it('defaults to the system color-scheme preference when mode is not given', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    } as MediaQueryList);

    render(
      <ThemeProvider>
        <span>content</span>
      </ThemeProvider>,
    );

    expect(screen.getByText('content').parentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('lets an explicit mode override the system preference', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    } as MediaQueryList);

    render(
      <ThemeProvider mode="light">
        <span>content</span>
      </ThemeProvider>,
    );

    expect(screen.getByText('content').parentElement).toHaveAttribute('data-theme', 'light');
  });
});
