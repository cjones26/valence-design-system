import { useState } from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

import { NumberField } from './NumberField';

function ControlledNumberField({
  initial,
  min,
  max,
  step,
  disabled,
}: {
  initial: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}) {
  const [value, setValue] = useState(initial);
  return (
    <NumberField label="Quantity" value={value} min={min} max={max} step={step} disabled={disabled} onChange={setValue} />
  );
}

describe('<NumberField />', () => {
  const user = userEvent.setup();

  it('renders the current value', async () => {
    await render(<NumberField label="Quantity" value={3} />);

    expect(screen.getByText('3')).toBeOnTheScreen();
  });

  it('increases the value when Increase is pressed', async () => {
    await render(<ControlledNumberField initial={3} />);

    await user.press(screen.getByLabelText('Increase Quantity'));

    expect(screen.getByText('4')).toBeOnTheScreen();
  });

  it('decreases the value when Decrease is pressed', async () => {
    await render(<ControlledNumberField initial={3} />);

    await user.press(screen.getByLabelText('Decrease Quantity'));

    expect(screen.getByText('2')).toBeOnTheScreen();
  });

  it('does not decrease below min', async () => {
    await render(<ControlledNumberField initial={0} min={0} />);

    await user.press(screen.getByLabelText('Decrease Quantity'));

    expect(screen.getByText('0')).toBeOnTheScreen();
  });

  it('does not increase above max', async () => {
    await render(<ControlledNumberField initial={10} max={10} />);

    await user.press(screen.getByLabelText('Increase Quantity'));

    expect(screen.getByText('10')).toBeOnTheScreen();
  });

  it('disables Decrease at min', async () => {
    await render(<NumberField label="Quantity" value={0} min={0} />);

    expect(screen.getByLabelText('Decrease Quantity')).toBeDisabled();
  });

  it('disables Increase at max', async () => {
    await render(<NumberField label="Quantity" value={10} max={10} />);

    expect(screen.getByLabelText('Increase Quantity')).toBeDisabled();
  });

  it('does not change the value when disabled', async () => {
    await render(<ControlledNumberField initial={3} disabled />);

    await user.press(screen.getByLabelText('Increase Quantity'));

    expect(screen.getByText('3')).toBeOnTheScreen();
  });

  it('disables both steppers when disabled', async () => {
    await render(<NumberField label="Quantity" value={3} disabled />);

    expect(screen.getByLabelText('Decrease Quantity')).toBeDisabled();
    expect(screen.getByLabelText('Increase Quantity')).toBeDisabled();
  });

  it('disables both steppers when step is 0', async () => {
    await render(<NumberField label="Quantity" value={3} step={0} />);

    expect(screen.getByLabelText('Decrease Quantity')).toBeDisabled();
    expect(screen.getByLabelText('Increase Quantity')).toBeDisabled();
  });

  it('moves in the correct direction when step is negative', async () => {
    await render(<ControlledNumberField initial={3} step={-1} />);

    await user.press(screen.getByLabelText('Increase Quantity'));
    expect(screen.getByText('4')).toBeOnTheScreen();

    await user.press(screen.getByLabelText('Decrease Quantity'));
    expect(screen.getByText('3')).toBeOnTheScreen();
  });

  it('uses 48pt stepper targets without hitSlop', async () => {
    await render(<NumberField label="Quantity" value={5} />);

    expect(screen.getByLabelText('Decrease Quantity')).toHaveStyle({ width: 48 });
    expect(screen.getByLabelText('Increase Quantity')).toHaveStyle({ width: 48 });
  });

  it('falls back to a finite value and warns when value is NaN', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await render(<NumberField label="Quantity" value={NaN} />);

    expect(screen.getByText('0')).toBeOnTheScreen();
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('"value" must be a finite number'));
    errorSpy.mockRestore();
  });

  it('uses the minimum as the fallback for a non-finite value', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await render(<NumberField label="Quantity" value={NaN} min={10} />);

    expect(screen.getByText('10')).toBeOnTheScreen();
    errorSpy.mockRestore();
  });

  it('preserves a finite value and disables both steppers when the range is invalid', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await render(<NumberField label="Quantity" value={3} min={10} max={0} />);

    expect(screen.getByText('3')).toBeOnTheScreen();
    expect(screen.getByLabelText('Decrease Quantity')).toBeDisabled();
    expect(screen.getByLabelText('Increase Quantity')).toBeDisabled();
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('"min" (10) and "max" (0)'));
    errorSpy.mockRestore();
  });

  it('disables both steppers when a bound is non-finite', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await render(<NumberField label="Quantity" value={3} max={Infinity} />);

    expect(screen.getByLabelText('Decrease Quantity')).toBeDisabled();
    expect(screen.getByLabelText('Increase Quantity')).toBeDisabled();
    errorSpy.mockRestore();
  });

  it('gives the steppers a contextual accessible name based on the field label', async () => {
    await render(<NumberField label="Pushups" value={3} />);

    expect(screen.getByLabelText('Decrease Pushups')).toBeOnTheScreen();
    expect(screen.getByLabelText('Increase Pushups')).toBeOnTheScreen();
  });
});
