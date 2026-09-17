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

  it('exposes its label, options, and selected value', () => {
    render(<Picker label="Frequency" options={options} value="weekly" />);

    expect(screen.getByRole('combobox', { name: 'Frequency' })).toHaveValue('weekly');
    expect(screen.getAllByRole('option')).toHaveLength(2);
  });

  it('changes the selected value using native select behavior', async () => {
    render(<ControlledPicker />);

    await user.selectOptions(screen.getByRole('combobox', { name: 'Frequency' }), 'weekly');

    expect(screen.getByRole('combobox', { name: 'Frequency' })).toHaveValue('weekly');
  });

  it('cannot change when disabled', async () => {
    render(<ControlledPicker disabled />);

    await user.selectOptions(screen.getByRole('combobox', { name: 'Frequency' }), 'weekly');

    expect(screen.getByRole('combobox', { name: 'Frequency' })).toHaveValue('daily');
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
