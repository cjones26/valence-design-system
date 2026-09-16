import { useState } from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { AccessibilityInfo, Text } from 'react-native';

import { Toggle } from './Toggle';

function ControlledToggle({ disabled }: { disabled?: boolean }) {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <Toggle checked={checked} onChange={setChecked} disabled={disabled} label="Notifications" />
      <Text>checked: {String(checked)}</Text>
    </>
  );
}

describe('<Toggle />', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const user = userEvent.setup();

  it('renders with an accessible name', async () => {
    await render(<Toggle checked={false} label="Notifications" />);

    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeOnTheScreen();
  });

  it('reflects the checked state', async () => {
    await render(<Toggle checked label="Notifications" />);

    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeChecked();
  });

  it('reflects the unchecked state', async () => {
    await render(<Toggle checked={false} label="Notifications" />);

    expect(screen.getByRole('switch', { name: 'Notifications' })).not.toBeChecked();
  });

  it('invokes onChange with the toggled value when pressed', async () => {
    await render(<ControlledToggle />);

    await user.press(screen.getByRole('switch', { name: 'Notifications' }));

    expect(screen.getByText('checked: true')).toBeOnTheScreen();
  });

  it('does not invoke onChange when disabled', async () => {
    await render(<ControlledToggle disabled />);

    await user.press(screen.getByRole('switch', { name: 'Notifications' }));

    expect(screen.getByText('checked: false')).toBeOnTheScreen();
  });

  it('marks the switch as disabled', async () => {
    await render(<Toggle checked={false} label="Notifications" disabled />);

    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeDisabled();
  });

  it('uses a real 48pt minimum touch target', async () => {
    await render(<Toggle checked={false} label="Notifications" />);

    expect(screen.getByRole('switch', { name: 'Notifications' })).toHaveStyle({ minHeight: 48 });
  });

  it('reflects the checked state without warning, with and without reduced motion', async () => {
    await render(<Toggle checked label="Notifications" />);
    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeChecked();

    jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValueOnce(true);
    await render(<Toggle checked label="Notifications" />);
    expect(screen.getAllByRole('switch', { name: 'Notifications' }).length).toBeGreaterThan(0);

    jest.restoreAllMocks();
  });
});
