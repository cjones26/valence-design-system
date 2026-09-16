import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Toggle } from './Toggle';

function ControlledToggle({ disabled }: { disabled?: boolean }) {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <Toggle checked={checked} onChange={setChecked} disabled={disabled} label="Notifications" />
      <span>checked: {String(checked)}</span>
    </>
  );
}

describe('<Toggle />', () => {
  const user = userEvent.setup();

  it('renders with an accessible name', () => {
    render(<Toggle checked={false} label="Notifications" />);

    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeInTheDocument();
  });

  it('reflects the checked state', () => {
    render(<Toggle checked label="Notifications" />);

    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeChecked();
  });

  it('reflects the unchecked state', () => {
    render(<Toggle checked={false} label="Notifications" />);

    expect(screen.getByRole('switch', { name: 'Notifications' })).not.toBeChecked();
  });

  it('invokes onChange with the toggled value when clicked', async () => {
    render(<ControlledToggle />);

    await user.click(screen.getByRole('switch', { name: 'Notifications' }));

    expect(screen.getByText('checked: true')).toBeInTheDocument();
  });

  it('does not invoke onChange when disabled', async () => {
    render(<ControlledToggle disabled />);

    await user.click(screen.getByRole('switch', { name: 'Notifications' }));

    expect(screen.getByText('checked: false')).toBeInTheDocument();
  });

  it('marks the switch as disabled', () => {
    render(<Toggle checked={false} label="Notifications" disabled />);

    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeDisabled();
  });
});
