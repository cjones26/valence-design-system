import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { StepButton } from './StepButton';

function PressableStepButton({ disabled }: { disabled?: boolean }) {
  const [pressed, setPressed] = useState(false);

  return (
    <>
      <StepButton
        label="Log run"
        tone="positive"
        disabled={disabled}
        onPress={() => setPressed(true)}
      />
      {pressed && <span>pressed</span>}
    </>
  );
}

describe('<StepButton />', () => {
  const user = userEvent.setup();

  it('renders with an accessible name', () => {
    render(<StepButton label="Log run" tone="positive" />);

    expect(screen.getByRole('button', { name: 'Log run' })).toBeInTheDocument();
  });

  it('invokes onPress when pressed', async () => {
    render(<PressableStepButton />);

    await user.click(screen.getByRole('button', { name: 'Log run' }));

    expect(screen.getByText('pressed')).toBeInTheDocument();
  });

  it('does not invoke onPress when disabled', async () => {
    render(<PressableStepButton disabled />);

    await user.click(screen.getByRole('button', { name: 'Log run' }));

    expect(screen.queryByText('pressed')).not.toBeInTheDocument();
  });

  it('marks the button as disabled when explicitly disabled', () => {
    render(<StepButton label="Log run" tone="positive" disabled />);

    expect(screen.getByRole('button', { name: 'Log run' })).toBeDisabled();
  });
});
