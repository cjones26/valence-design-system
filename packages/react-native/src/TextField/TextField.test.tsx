import { useState } from 'react';
import { AccessibilityInfo } from 'react-native';
import { render, screen, userEvent } from '@testing-library/react-native';

import { TextField } from './TextField';

function ControlledTextField({ disabled }: { disabled?: boolean }) {
  const [value, setValue] = useState('');

  return <TextField label="Name" value={value} onChangeText={setValue} disabled={disabled} />;
}

describe('<TextField />', () => {
  const user = userEvent.setup();

  it('renders with an accessible name', async () => {
    await render(<TextField label="Name" value="" />);

    expect(screen.getByLabelText('Name')).toBeOnTheScreen();
  });

  it('renders the helper text when provided', async () => {
    await render(<TextField label="Name" value="" helperText="Required" />);

    expect(screen.getByText('Required')).toBeOnTheScreen();
  });

  it('updates the value as the user types', async () => {
    await render(<ControlledTextField />);

    await user.type(screen.getByLabelText('Name'), 'Ada');

    expect(screen.getByLabelText('Name')).toHaveDisplayValue('Ada');
  });

  it('does not update the value when disabled', async () => {
    await render(<ControlledTextField disabled />);

    await user.type(screen.getByLabelText('Name'), 'Ada');

    expect(screen.getByLabelText('Name')).toHaveDisplayValue('');
  });

  it('marks the field as disabled', async () => {
    await render(<TextField label="Name" value="" disabled />);

    expect(screen.getByLabelText('Name')).toBeDisabled();
  });

  it('exposes the helper text to assistive tech via accessibilityHint', async () => {
    await render(<TextField label="Name" value="" error helperText="Name is required" />);

    expect(screen.getByLabelText('Name')).toHaveProp(
      'accessibilityHint',
      'Invalid. Name is required',
    );
  });

  it('keeps the accessible name unchanged when invalid', async () => {
    await render(<TextField label="Name" value="" error />);

    expect(screen.getByLabelText('Name')).toBeOnTheScreen();
    expect(screen.getByLabelText('Name')).toHaveProp('accessibilityHint', 'Invalid.');
  });

  it('announces the invalid state when the field becomes invalid', async () => {
    const announceSpy = jest
      .spyOn(AccessibilityInfo, 'announceForAccessibility')
      .mockImplementation(() => {});

    const { rerender } = await render(<TextField label="Name" value="" />);

    announceSpy.mockClear();

    await rerender(<TextField label="Name" value="" error />);

    expect(announceSpy).toHaveBeenCalledWith('Name is invalid');

    announceSpy.mockRestore();
  });

  it('does not repeat the invalid announcement while the error remains active', async () => {
    const announceSpy = jest
      .spyOn(AccessibilityInfo, 'announceForAccessibility')
      .mockImplementation(() => {});

    const { rerender } = await render(<TextField label="Name" value="" error />);

    announceSpy.mockClear();

    await rerender(<TextField label="Name" value="" error />);

    expect(announceSpy).not.toHaveBeenCalled();

    announceSpy.mockRestore();
  });

  it('maps shared input semantics', async () => {
    await render(
      <TextField
        label="Password"
        value="secret"
        autoComplete="current-password"
        secureTextEntry
        maxLength={80}
      />,
    );

    const field = screen.getByLabelText('Password');

    expect(field.props).toEqual(
      expect.objectContaining({
        autoComplete: 'current-password',
        secureTextEntry: true,
        maxLength: 80,
      }),
    );
  });
});
