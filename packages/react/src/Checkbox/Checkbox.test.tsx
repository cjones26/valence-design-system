import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Checkbox } from './Checkbox';

function ControlledCheckbox({ disabled }: { disabled?: boolean }) {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox checked={checked} onChange={setChecked} disabled={disabled} label="Accept terms" />
  );
}

describe('<Checkbox />', () => {
  const user = userEvent.setup();

  it('renders with the label as its accessible name', () => {
    render(<Checkbox checked={false} label="Accept terms" />);

    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeInTheDocument();
  });

  it('reflects the checked state', () => {
    render(<Checkbox checked label="Accept terms" />);

    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeChecked();
  });

  it('reflects the unchecked state', () => {
    render(<Checkbox checked={false} label="Accept terms" />);

    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).not.toBeChecked();
  });

  it('toggles to checked when clicked', async () => {
    render(<ControlledCheckbox />);

    await user.click(screen.getByRole('checkbox', { name: 'Accept terms' }));

    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeChecked();
  });

  it('does not toggle when disabled', async () => {
    render(<ControlledCheckbox disabled />);

    await user.click(screen.getByRole('checkbox', { name: 'Accept terms' }));

    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).not.toBeChecked();
  });

  it('marks the checkbox as disabled', () => {
    render(<Checkbox checked={false} disabled label="Accept terms" />);

    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeDisabled();
  });
});
