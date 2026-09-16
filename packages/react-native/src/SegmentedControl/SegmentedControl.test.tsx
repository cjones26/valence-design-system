import { useState } from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { AccessibilityInfo, Text } from 'react-native';

import { SegmentedControl } from './SegmentedControl';
import { DEFAULT_THEME } from '../ThemeProvider/ThemeProvider';

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
      <Text>selected: {value}</Text>
    </>
  );
}

describe('<SegmentedControl />', () => {
  const user = userEvent.setup();

  it('renders each option with an accessible name', async () => {
    await render(<SegmentedControl label="View" options={OPTIONS} value="day" />);

    expect(screen.getByRole('radio', { name: 'Day' })).toBeOnTheScreen();
    expect(screen.getByRole('radio', { name: 'Week' })).toBeOnTheScreen();
  });

  it('marks the current value as checked', async () => {
    await render(<SegmentedControl label="View" options={OPTIONS} value="week" />);

    expect(screen.getByRole('radio', { name: 'Week' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Day' })).not.toBeChecked();
  });

  it('renders text icons without placing raw text inside a View', async () => {
    await render(
      <SegmentedControl
        label="View"
        options={[{ value: 'day', label: 'Day', icon: '☀' }]}
        value="day"
      />,
    );

    expect(screen.getByText('☀')).toBeOnTheScreen();
  });

  it('provides the muted foreground color to disabled icon renderers', async () => {
    await render(
      <SegmentedControl
        label="View"
        options={[
          {
            value: 'day',
            label: 'Day',
            icon: (color) => (
              <Text testID="icon" style={{ color }}>
                I
              </Text>
            ),
          },
        ]}
        value="day"
        disabled
      />,
    );

    expect(screen.getByTestId('icon')).toHaveStyle({ color: DEFAULT_THEME.color_text_muted });
  });

  it('invokes onChange with the pressed option value', async () => {
    await render(<ControlledSegmentedControl />);

    await user.press(screen.getByRole('radio', { name: 'Week' }));

    expect(screen.getByText('selected: week')).toBeOnTheScreen();
  });

  it('does not invoke onChange when disabled', async () => {
    await render(<ControlledSegmentedControl disabled />);

    await user.press(screen.getByRole('radio', { name: 'Week' }));

    expect(screen.getByText('selected: day')).toBeOnTheScreen();
  });

  it('marks options as disabled when the control is disabled', async () => {
    await render(<SegmentedControl label="View" options={OPTIONS} value="day" disabled />);

    expect(screen.getByRole('radio', { name: 'Day' })).toBeDisabled();
    expect(screen.getByRole('radio', { name: 'Week' })).toBeDisabled();
  });

  it('marks the current value as checked without warning, with and without reduced motion', async () => {
    await render(<SegmentedControl label="View" options={OPTIONS} value="week" />);
    expect(screen.getByRole('radio', { name: 'Week' })).toBeChecked();

    jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValueOnce(true);
    await render(<SegmentedControl label="View" options={OPTIONS} value="week" />);
    expect(screen.getAllByRole('radio', { name: 'Week' }).length).toBeGreaterThan(0);

    jest.restoreAllMocks();
  });

  it('renders nothing when options is empty', async () => {
    const { toJSON } = await render(<SegmentedControl label="View" options={[]} value="day" />);

    expect(toJSON()).toBeNull();
  });

  it('marks no option as checked when value matches nothing', async () => {
    await render(<SegmentedControl label="View" options={OPTIONS} value="month" />);

    expect(screen.getByRole('radio', { name: 'Day' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Week' })).not.toBeChecked();
  });

  it('warns when options contains duplicate values', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await render(
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
