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
});
