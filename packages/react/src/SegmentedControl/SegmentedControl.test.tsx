import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SegmentedControl } from './SegmentedControl';

const OPTIONS = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
];

function ControlledSegmentedControl({ disabled }: { disabled?: boolean }) {
  const [value, setValue] = useState('day');
  return (
    <>
      <SegmentedControl
        label="View"
        options={OPTIONS}
        value={value}
        onChange={setValue}
        disabled={disabled}
      />
      <span>selected: {value}</span>
    </>
  );
}

describe('<SegmentedControl />', () => {
  const user = userEvent.setup();

  it('renders each option with an accessible name', () => {
    render(<SegmentedControl label="View" options={OPTIONS} value="day" />);

    expect(screen.getByRole('radio', { name: 'Day' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Week' })).toBeInTheDocument();
  });

  it('marks the current value as checked', () => {
    render(<SegmentedControl label="View" options={OPTIONS} value="week" />);

    expect(screen.getByRole('radio', { name: 'Week' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Day' })).not.toBeChecked();
  });

  it('invokes onChange with the clicked option value', async () => {
    render(<ControlledSegmentedControl />);

    await user.click(screen.getByRole('radio', { name: 'Week' }));

    expect(screen.getByText('selected: week')).toBeInTheDocument();
  });

  it('does not invoke onChange when disabled', async () => {
    render(<ControlledSegmentedControl disabled />);

    await user.click(screen.getByRole('radio', { name: 'Week' }));

    expect(screen.getByText('selected: day')).toBeInTheDocument();
  });

  it('marks options as disabled when the control is disabled', () => {
    render(<SegmentedControl label="View" options={OPTIONS} value="day" disabled />);

    expect(screen.getByRole('radio', { name: 'Day' })).toBeDisabled();
    expect(screen.getByRole('radio', { name: 'Week' })).toBeDisabled();
  });

  it('moves selection to the next option with the arrow keys, like a native radio group', async () => {
    render(<ControlledSegmentedControl />);

    screen.getByRole('radio', { name: 'Day' }).focus();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('radio', { name: 'Week' })).toHaveFocus();
    expect(screen.getByText('selected: week')).toBeInTheDocument();
  });

  it('renders nothing when options is empty', () => {
    const { container } = render(<SegmentedControl label="View" options={[]} value="day" />);

    expect(container).toBeEmptyDOMElement();
  });

  it('marks no option as checked when value matches nothing', () => {
    render(<SegmentedControl label="View" options={OPTIONS} value="month" />);

    expect(screen.getByRole('radio', { name: 'Day' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Week' })).not.toBeChecked();
  });

  it('warns when options contains duplicate values', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <SegmentedControl
        label="View"
        options={[
          { value: 'day', label: 'Day' },
          { value: 'day', label: 'Day (again)' },
        ]}
        value="day"
      />,
    );

    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('duplicate values'));
    errorSpy.mockRestore();
  });
});
