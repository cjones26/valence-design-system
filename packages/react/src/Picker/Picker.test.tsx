import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Picker } from './Picker';

const options = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
];

const ControlledPicker = ({ disabled }: { disabled?: boolean }) => {
  const [value, setValue] = useState('daily');

  return (
    <Picker
      label="Frequency"
      options={options}
      value={value}
      onChange={setValue}
      disabled={disabled}
    />
  );
};

describe('<Picker />', () => {
  const user = userEvent.setup();

  it('exposes its label and selected value', () => {
    render(<Picker label="Frequency" options={options} value="weekly" />);

    expect(screen.getByRole('combobox', { name: 'Frequency' })).toHaveTextContent('Weekly');
  });

  it('shows its options when opened', async () => {
    render(<ControlledPicker />);

    await user.tab();

    await user.keyboard('{Enter}');

    expect(screen.getAllByRole('option')).toHaveLength(2);
  });

  it('changes the selected value', async () => {
    render(<ControlledPicker />);

    await user.tab();

    await user.keyboard('{Enter}');

    await user.keyboard('{ArrowDown}{Enter}');

    expect(screen.getByRole('combobox', { name: 'Frequency' })).toHaveTextContent('Weekly');
  });

  it('cannot open when disabled', async () => {
    render(<ControlledPicker disabled />);

    await user.tab();

    await user.keyboard('{Enter}');

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('connects error helper text to the control', () => {
    render(
      <Picker
        label="Frequency"
        options={options}
        value=""
        error
        helperText="Choose a frequency."
      />,
    );

    const picker = screen.getByRole('combobox', { name: 'Frequency' });
    expect(picker).toBeInvalid();
    expect(picker).toHaveAccessibleDescription('Choose a frequency.');
  });
});
