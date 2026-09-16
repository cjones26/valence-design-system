import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './Button';

function PressableButton({ disabled, loading }: { disabled?: boolean; loading?: boolean }) {
  const [pressed, setPressed] = useState(false);
  return (
    <>
      <Button onPress={() => setPressed(true)} disabled={disabled} loading={loading}>
        Save
      </Button>
      {pressed && <span>pressed</span>}
    </>
  );
}

describe('<Button />', () => {
  const user = userEvent.setup();

  it('renders with an accessible name', () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('invokes onPress when pressed', async () => {
    render(<PressableButton />);

    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByText('pressed')).toBeInTheDocument();
  });

  it('does not invoke onPress when disabled', async () => {
    render(<PressableButton disabled />);

    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.queryByText('pressed')).not.toBeInTheDocument();
  });

  it('does not invoke onPress while loading', async () => {
    render(<PressableButton loading />);

    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.queryByText('pressed')).not.toBeInTheDocument();
  });

  it('marks the button as disabled when explicitly disabled', () => {
    render(<Button disabled>Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  });

  it('marks the button as disabled while loading', () => {
    render(<Button loading>Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  });

  it('marks the button as busy while loading', () => {
    render(<Button loading>Save</Button>);

    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveAttribute('data-loading', 'true');
  });

  it('does not mark the button as busy when not loading', () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).not.toHaveAttribute('aria-busy');
  });

  it('supports form button types', () => {
    render(<Button type="submit">Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('type', 'submit');
  });
});
