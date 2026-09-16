import { useState } from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

import { Radio } from './Radio';

function ControlledRadio({ disabled }: { disabled?: boolean }) {
  const [checked, setChecked] = useState(false);
  return (
    <Radio
      label="Notify me"
      checked={checked}
      disabled={disabled}
      onChange={() => setChecked(true)}
    />
  );
}

describe('<Radio />', () => {
  const user = userEvent.setup();

  it('renders with an accessible name', async () => {
    await render(<Radio label="Notify me" checked={false} />);

    expect(screen.getByRole('radio', { name: 'Notify me' })).toBeOnTheScreen();
  });

  it('reflects the checked state', async () => {
    await render(<Radio label="Notify me" checked />);

    expect(screen.getByRole('radio', { name: 'Notify me' })).toBeChecked();
  });

  it('reflects the unchecked state', async () => {
    await render(<Radio label="Notify me" checked={false} />);

    expect(screen.getByRole('radio', { name: 'Notify me' })).not.toBeChecked();
  });

  it('invokes onChange and becomes checked when pressed', async () => {
    await render(<ControlledRadio />);

    await user.press(screen.getByRole('radio', { name: 'Notify me' }));

    expect(screen.getByRole('radio', { name: 'Notify me' })).toBeChecked();
  });

  it('does not invoke onChange when disabled', async () => {
    await render(<ControlledRadio disabled />);

    await user.press(screen.getByRole('radio', { name: 'Notify me' }));

    expect(screen.getByRole('radio', { name: 'Notify me' })).not.toBeChecked();
  });

  it('marks itself as disabled', async () => {
    await render(<Radio label="Notify me" checked={false} disabled />);

    expect(screen.getByRole('radio', { name: 'Notify me' })).toBeDisabled();
  });

  it('uses a real 48pt row without overlapping hitSlop', async () => {
    await render(<Radio label="Notify me" checked={false} />);

    expect(screen.getByRole('radio', { name: 'Notify me' })).toHaveStyle({ minHeight: 48 });
  });
});
