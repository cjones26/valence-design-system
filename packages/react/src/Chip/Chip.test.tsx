import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Chip } from './Chip';

function PressableChip({ disabled }: { disabled?: boolean }) {
  const [pressed, setPressed] = useState(false);
  return (
    <>
      <Chip onPress={() => setPressed(true)} disabled={disabled}>
        Vegetarian
      </Chip>
      {pressed && <span>pressed</span>}
    </>
  );
}

describe('<Chip />', () => {
  const user = userEvent.setup();

  it('renders with an accessible name', () => {
    render(<Chip>Vegetarian</Chip>);

    expect(screen.getByRole('button', { name: 'Vegetarian' })).toBeInTheDocument();
  });

  it('marks the chip as selected', () => {
    render(<Chip selected>Vegetarian</Chip>);

    expect(screen.getByRole('button', { name: 'Vegetarian' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('does not mark the chip as selected by default', () => {
    render(<Chip>Vegetarian</Chip>);

    expect(screen.getByRole('button', { name: 'Vegetarian' })).not.toHaveAttribute('aria-pressed', 'true');
  });

  it('invokes onPress when clicked', async () => {
    render(<PressableChip />);

    await user.click(screen.getByRole('button', { name: 'Vegetarian' }));

    expect(screen.getByText('pressed')).toBeInTheDocument();
  });

  it('does not invoke onPress when disabled', async () => {
    render(<PressableChip disabled />);

    await user.click(screen.getByRole('button', { name: 'Vegetarian' }));

    expect(screen.queryByText('pressed')).not.toBeInTheDocument();
  });

  it('marks the chip as disabled', () => {
    render(<Chip disabled>Vegetarian</Chip>);

    expect(screen.getByRole('button', { name: 'Vegetarian' })).toBeDisabled();
  });
});
