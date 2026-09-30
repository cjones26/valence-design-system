import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Radio } from './Radio';

const ControlledRadio = ({ disabled }: { disabled?: boolean }) => {
  const [checked, setChecked] = useState(false);

  return (
    <Radio
      label="Notify me"
      checked={checked}
      disabled={disabled}
      onChange={() => setChecked(true)}
    />
  );
};

describe('<Radio />', () => {
  const user = userEvent.setup();

  it('renders with an accessible name', () => {
    render(<Radio label="Notify me" checked={false} />);

    expect(screen.getByRole('radio', { name: 'Notify me' })).toBeInTheDocument();
  });

  it('reflects the checked state', () => {
    render(<Radio label="Notify me" checked />);

    expect(screen.getByRole('radio', { name: 'Notify me' })).toBeChecked();
  });

  it('reflects the unchecked state', () => {
    render(<Radio label="Notify me" checked={false} />);

    expect(screen.getByRole('radio', { name: 'Notify me' })).not.toBeChecked();
  });

  it('invokes onChange and becomes checked when clicked', async () => {
    render(<ControlledRadio />);

    await user.click(screen.getByRole('radio', { name: 'Notify me' }));

    expect(screen.getByRole('radio', { name: 'Notify me' })).toBeChecked();
  });

  it('does not invoke onChange when disabled', async () => {
    render(<ControlledRadio disabled />);

    await user.click(screen.getByRole('radio', { name: 'Notify me' }));

    expect(screen.getByRole('radio', { name: 'Notify me' })).not.toBeChecked();
  });

  it('marks itself as disabled', () => {
    render(<Radio label="Notify me" checked={false} disabled />);

    expect(screen.getByRole('radio', { name: 'Notify me' })).toBeDisabled();
  });
});
