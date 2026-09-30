import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { DatePickerValue } from '@valencesoftwareio/types';
import { DatePicker } from './DatePicker';

const ControlledDatePicker = ({ disabled }: { disabled?: boolean }) => {
  const [value, setValue] = useState<DatePickerValue | null>('2026-09-30');

  return <DatePicker label="Due date" value={value} onChange={setValue} disabled={disabled} />;
};

describe('<DatePicker />', () => {
  const user = userEvent.setup();

  it('opens an accessible calendar', async () => {
    render(<ControlledDatePicker />);

    await user.click(screen.getByRole('button', { name: /Open Due date calendar/ }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('changes the selected date', async () => {
    render(<ControlledDatePicker />);

    await user.click(screen.getByRole('button', { name: /Open Due date calendar/ }));

    await user.click(screen.getByRole('button', { name: /Tuesday, September 29, 2026/ }));

    expect(screen.getByRole('spinbutton', { name: /day, Due date/ })).toHaveValue(29);
  });

  it('clears an optional value', async () => {
    render(<ControlledDatePicker />);

    await user.click(screen.getByRole('button', { name: 'Clear Due date' }));

    expect(screen.queryByRole('button', { name: 'Clear Due date' })).not.toBeInTheDocument();
  });

  it('cannot open when disabled', async () => {
    render(<ControlledDatePicker disabled />);

    await user.click(screen.getByRole('button', { name: /Open Due date calendar/ }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('exposes its error guidance', () => {
    render(
      <DatePicker
        label="Due date"
        value={null}
        error
        helperText="Choose a due date."
        onChange={() => undefined}
      />,
    );

    expect(screen.getByText('Choose a due date.')).toBeInTheDocument();
  });
});
