import { useState } from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { Text } from 'react-native';

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
      {pressed && <Text>pressed</Text>}
    </>
  );
}

describe('<StepButton />', () => {
  const user = userEvent.setup();

  it('renders with an accessible name', async () => {
    await render(<StepButton label="Log run" tone="positive" />);

    expect(screen.getByRole('button', { name: 'Log run' })).toBeOnTheScreen();
  });

  it('invokes onPress when pressed', async () => {
    await render(<PressableStepButton />);

    await user.press(screen.getByRole('button', { name: 'Log run' }));

    expect(screen.getByText('pressed')).toBeOnTheScreen();
  });

  it('does not invoke onPress when disabled', async () => {
    await render(<PressableStepButton disabled />);

    await user.press(screen.getByRole('button', { name: 'Log run' }));

    expect(screen.queryByText('pressed')).not.toBeOnTheScreen();
  });

  it('marks the button as disabled when explicitly disabled', async () => {
    await render(<StepButton label="Log run" tone="positive" disabled />);

    expect(screen.getByRole('button', { name: 'Log run' })).toBeDisabled();
  });

  it('renders a visible border when disabled, since its fill alone is too faint to define its shape', async () => {
    await render(<StepButton label="Log run" tone="positive" disabled />);

    expect(screen.getByRole('button', { name: 'Log run' })).toHaveStyle({ borderWidth: 1 });
  });

  it('uses a 48pt button height without hitSlop', async () => {
    await render(<StepButton label="Log run" tone="positive" />);

    expect(screen.getByRole('button', { name: 'Log run' })).toHaveStyle({ minHeight: 48 });
  });
});
