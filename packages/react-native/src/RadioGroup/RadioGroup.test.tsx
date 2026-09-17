import { useState } from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

import { RadioGroup } from './RadioGroup';

const OPTIONS = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
];

const ControlledRadioGroup = ({ disabled }: { disabled?: boolean }) => {
  const [value, setValue] = useState('a');

  return (
    <RadioGroup
      label="Options"
      options={OPTIONS}
      value={value}
      disabled={disabled}
      onChange={setValue}
    />
  );
};

describe('<RadioGroup />', () => {
  const user = userEvent.setup();

  it('renders an option for each entry', async () => {
    await render(<RadioGroup label="Options" options={OPTIONS} value="a" />);

    expect(screen.getByRole('radio', { name: 'Option A' })).toBeOnTheScreen();
    expect(screen.getByRole('radio', { name: 'Option B' })).toBeOnTheScreen();
  });

  it('checks the option matching the current value', async () => {
    await render(<RadioGroup label="Options" options={OPTIONS} value="b" />);

    expect(screen.getByRole('radio', { name: 'Option A' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Option B' })).toBeChecked();
  });

  it('selects a different option when pressed', async () => {
    await render(<ControlledRadioGroup />);

    await user.press(screen.getByRole('radio', { name: 'Option B' }));

    expect(screen.getByRole('radio', { name: 'Option A' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Option B' })).toBeChecked();
  });

  it('does not change selection when disabled', async () => {
    await render(<ControlledRadioGroup disabled />);

    await user.press(screen.getByRole('radio', { name: 'Option B' }));

    expect(screen.getByRole('radio', { name: 'Option A' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Option B' })).not.toBeChecked();
  });

  it('uses contiguous 48pt option rows without extra group spacing', async () => {
    await render(<RadioGroup label="Options" options={OPTIONS} value="a" />);

    expect(screen.getByRole('radio', { name: 'Option A' })).toHaveStyle({ minHeight: 48 });
    expect(screen.getByRole('radio', { name: 'Option B' })).toHaveStyle({ minHeight: 48 });
  });
});
