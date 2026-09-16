import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RadioGroup } from './RadioGroup';

const OPTIONS = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
];

function ControlledRadioGroup({ disabled }: { disabled?: boolean }) {
  const [value, setValue] = useState('a');
  return <RadioGroup label="Options" options={OPTIONS} value={value} disabled={disabled} onChange={setValue} />;
}

describe('<RadioGroup />', () => {
  const user = userEvent.setup();

  it('renders an option for each entry', () => {
    render(<RadioGroup label="Options" options={OPTIONS} value="a" />);

    expect(screen.getByRole('radio', { name: 'Option A' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Option B' })).toBeInTheDocument();
  });

  it('checks the option matching the current value', () => {
    render(<RadioGroup label="Options" options={OPTIONS} value="b" />);

    expect(screen.getByRole('radio', { name: 'Option A' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Option B' })).toBeChecked();
  });

  it('selects a different option when clicked', async () => {
    render(<ControlledRadioGroup />);

    await user.click(screen.getByRole('radio', { name: 'Option B' }));

    expect(screen.getByRole('radio', { name: 'Option A' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Option B' })).toBeChecked();
  });

  it('does not change selection when disabled', async () => {
    render(<ControlledRadioGroup disabled />);

    await user.click(screen.getByRole('radio', { name: 'Option B' }));

    expect(screen.getByRole('radio', { name: 'Option A' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Option B' })).not.toBeChecked();
  });

  it('warns when options contains duplicate values', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <RadioGroup
        label="Options"
        options={[
          { value: 'a', label: 'Option A' },
          { value: 'a', label: 'Option A (again)' },
        ]}
        value="a"
      />,
    );

    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('duplicate values'));
    errorSpy.mockRestore();
  });
});
