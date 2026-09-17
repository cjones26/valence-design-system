import { useState } from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

import { Checkbox } from './Checkbox';

const ControlledCheckbox = ({ disabled }: { disabled?: boolean }) => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox checked={checked} onChange={setChecked} disabled={disabled} label="Accept terms" />
  );
};

describe('<Checkbox />', () => {
  const user = userEvent.setup();

  it('renders with the label as its accessible name', async () => {
    await render(<Checkbox checked={false} label="Accept terms" />);

    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeOnTheScreen();
  });

  it('reflects the checked state', async () => {
    await render(<Checkbox checked label="Accept terms" />);

    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeChecked();
  });

  it('reflects the unchecked state', async () => {
    await render(<Checkbox checked={false} label="Accept terms" />);

    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).not.toBeChecked();
  });

  it('toggles to checked when pressed', async () => {
    await render(<ControlledCheckbox />);

    await user.press(screen.getByRole('checkbox', { name: 'Accept terms' }));

    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeChecked();
  });

  it('does not toggle when disabled', async () => {
    await render(<ControlledCheckbox disabled />);

    await user.press(screen.getByRole('checkbox', { name: 'Accept terms' }));

    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).not.toBeChecked();
  });

  it('marks the checkbox as disabled', async () => {
    await render(<Checkbox checked={false} disabled label="Accept terms" />);

    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeDisabled();
  });

  it('uses a real 48pt minimum touch target', async () => {
    await render(<Checkbox checked={false} label="Accept terms" />);

    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toHaveStyle({ minHeight: 48 });
  });
});
