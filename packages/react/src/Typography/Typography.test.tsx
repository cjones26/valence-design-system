import { render, screen } from '@testing-library/react';

import { Typography } from './Typography';

describe('<Typography />', () => {
  it('renders its text content', () => {
    render(<Typography variant="body">Hello world</Typography>);

    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('renders long content in full', () => {
    const longText = 'A '.repeat(200).trim();
    render(<Typography variant="body">{longText}</Typography>);

    expect(screen.getByText(longText)).toBeInTheDocument();
  });

  it('applies a different style per variant', () => {
    render(
      <>
        <Typography variant="display">Display</Typography>
        <Typography variant="meta">Meta</Typography>
      </>,
    );

    // Variants differ via var(--type-*) references in Typography.module.css.
    // jsdom's getComputedStyle never resolves custom-property references
    // through a stylesheet rule (confirmed across font-size, font-weight,
    // and letter-spacing) — only literal values and inline styles resolve.
    // className is the ceiling of what's verifiable here without a real
    // browser test runner.
    expect(screen.getByText('Display').className).not.toBe(screen.getByText('Meta').className);
  });

  it('forwards additional attributes', () => {
    render(
      <Typography variant="body" aria-label="Custom label">
        Hello world
      </Typography>,
    );

    expect(screen.getByLabelText('Custom label')).toBeInTheDocument();
  });

  it('renders a span by default for a non-heading variant', () => {
    render(<Typography variant="body">Hello world</Typography>);

    expect(screen.getByText('Hello world').tagName).toBe('SPAN');
  });

  it('defaults display/title/titleSm to real heading elements', () => {
    render(
      <>
        <Typography variant="display">Display</Typography>
        <Typography variant="title">Title</Typography>
        <Typography variant="titleSm">Title sm</Typography>
      </>,
    );

    expect(
      screen.getAllByRole('heading').map((heading) => ({
        level: Number(heading.tagName.slice(1)),
        name: heading.textContent,
      })),
    ).toEqual([
      { level: 1, name: 'Display' },
      { level: 2, name: 'Title' },
      { level: 3, name: 'Title sm' },
    ]);
  });

  it('lets as override the default heading level', () => {
    render(
      <Typography variant="titleSm" as="h1">
        Compact page title
      </Typography>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Compact page title' }),
    ).toBeInTheDocument();
  });
});
