import { useState } from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { render, screen, userEvent } from '@testing-library/react-native';
import { Platform } from 'react-native';
import type { DatePickerValue } from '@valencesoftwareio/types';
import { DatePicker } from './DatePicker';

jest.mock('@react-native-community/datetimepicker');

const ControlledDatePicker = ({ disabled }: { disabled?: boolean }) => {
  const [value, setValue] = useState<DatePickerValue | null>('2026-09-30');

  return <DatePicker label="Due date" value={value} onChange={setValue} disabled={disabled} />;
};

describe('<DatePicker />', () => {
  const user = userEvent.setup();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('opens the system date picker', async () => {
    await render(<ControlledDatePicker />);

    await user.press(screen.getByRole('button', { name: 'Due date' }));

    expect(screen.getByRole('button', { name: 'Native date picker' })).toBeOnTheScreen();
  });

  it('opens the Android system dialog', async () => {
    jest.replaceProperty(Platform, 'OS', 'android');

    await render(<ControlledDatePicker />);

    await user.press(screen.getByRole('button', { name: 'Due date' }));

    expect(DateTimePickerAndroid.open).toHaveBeenCalledTimes(1);
  });

  it('commits the selected date', async () => {
    await render(<ControlledDatePicker />);

    await user.press(screen.getByRole('button', { name: 'Due date' }));

    await user.press(screen.getByRole('button', { name: 'Native date picker' }));

    await user.press(screen.getByRole('button', { name: 'Done' }));

    expect(screen.getByRole('button', { name: 'Due date' })).toHaveAccessibilityValue({
      text: 'Oct 15, 2026',
    });
  });

  it('clears an optional value', async () => {
    await render(<ControlledDatePicker />);

    await user.press(screen.getByRole('button', { name: 'Clear Due date' }));

    expect(screen.queryByRole('button', { name: 'Clear Due date' })).not.toBeOnTheScreen();
  });

  it('cannot open when disabled', async () => {
    await render(<ControlledDatePicker disabled />);

    await user.press(screen.getByRole('button', { name: 'Due date' }));

    expect(screen.queryByRole('button', { name: 'Native date picker' })).not.toBeOnTheScreen();
  });

  it('exposes error guidance to assistive technology', async () => {
    await render(
      <DatePicker
        label="Due date"
        value={null}
        error
        helperText="Choose a due date."
        onChange={() => undefined}
      />,
    );

    expect(screen.getByRole('button', { name: 'Due date' })).toHaveProp(
      'accessibilityHint',
      'Invalid. Choose a due date.',
    );
  });
});
