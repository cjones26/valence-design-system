import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Card } from './Card';

function PressableCard() {
  const [pressed, setPressed] = useState(false);
  return (
    <>
      <Card title="Trip to Tokyo" onPress={() => setPressed(true)} />
      {pressed && <span>pressed</span>}
    </>
  );
}

describe('<Card />', () => {
  const user = userEvent.setup();

  it('renders the title', () => {
    render(<Card title="Trip to Tokyo" />);

    expect(screen.getByText('Trip to Tokyo')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<Card title="Trip to Tokyo">Departs Friday</Card>);

    expect(screen.getByText('Departs Friday')).toBeInTheDocument();
  });

  it('is not exposed as a button when onPress is not provided', () => {
    render(<Card title="Trip to Tokyo" />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('exposes a button role named after the title by default', () => {
    render(<Card title="Trip to Tokyo" onPress={() => {}} />);

    expect(screen.getByRole('button', { name: 'Trip to Tokyo' })).toBeInTheDocument();
  });

  it('uses actionLabel as the accessible name when provided', () => {
    render(<Card title="Trip to Tokyo" actionLabel="View trip details" onPress={() => {}} />);

    expect(screen.getByRole('button', { name: 'View trip details' })).toBeInTheDocument();
  });

  it('includes a non-resting status in the default accessible name', () => {
    render(<Card title="Trip to Tokyo" status="success" onPress={() => {}} />);

    expect(screen.getByRole('button', { name: 'Trip to Tokyo, success' })).toBeInTheDocument();
  });

  it('does not add status to an explicit actionLabel', () => {
    render(
      <Card
        title="Trip to Tokyo"
        status="success"
        actionLabel="View trip details"
        onPress={() => {}}
      />,
    );

    expect(screen.getByRole('button', { name: 'View trip details' })).toBeInTheDocument();
  });

  it('invokes onPress when clicked', async () => {
    render(<PressableCard />);

    await user.click(screen.getByRole('button'));

    expect(screen.getByText('pressed')).toBeInTheDocument();
  });

  it('invokes onPress on Enter', async () => {
    render(<PressableCard />);

    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');

    expect(screen.getByText('pressed')).toBeInTheDocument();
  });

  it('makes card content transparent to clicks so a nested element can never be independently pressed', async () => {
    render(
      <Card title="Trip to Tokyo" onPress={() => {}}>
        <button type="button">Cancel</button>
      </Card>,
    );

    await expect(user.click(screen.getByRole('button', { name: 'Cancel' }))).rejects.toThrow(
      /pointer-events: none/,
    );
  });

  it('renders a non-text element child directly instead of wrapping it in Typography', () => {
    render(
      <Card title="Trip to Tokyo">
        <img src="/tokyo.jpg" alt="Tokyo skyline" />
      </Card>,
    );

    expect(screen.getByRole('img', { name: 'Tokyo skyline' })).toBeInTheDocument();
  });

  it('marks card content as inert so it is unreachable by keyboard or assistive tech', () => {
    render(<Card title="Trip to Tokyo" onPress={() => {}} />);

    expect(screen.getByText('Trip to Tokyo').parentElement).toHaveAttribute('inert');
  });

  it('folds plain text children into the default accessible name so they stay reachable', () => {
    render(
      <Card title="Trip to Tokyo" onPress={() => {}}>
        Departs Friday
      </Card>,
    );

    expect(
      screen.getByRole('button', { name: 'Trip to Tokyo, Departs Friday' }),
    ).toBeInTheDocument();
  });
});
