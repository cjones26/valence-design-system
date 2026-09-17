import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NumberField } from './NumberField';

const ControlledNumberField = ({
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
}) => {
  const [value, setValue] = useState(initial);

  return (
    <NumberField
      label="Quantity"
      value={value}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      onChange={setValue}
    />
  );
};

describe('<NumberField />', () => {
  const user = userEvent.setup();

  it('renders the current value', () => {
    render(<NumberField label="Quantity" value={3} />);

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('increases the value when Increase is clicked', async () => {
    render(<ControlledNumberField initial={3} />);

    await user.click(screen.getByLabelText('Increase Quantity'));

    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('decreases the value when Decrease is clicked', async () => {
    render(<ControlledNumberField initial={3} />);

    await user.click(screen.getByLabelText('Decrease Quantity'));

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('does not decrease below min', async () => {
    render(<ControlledNumberField initial={0} min={0} />);

    await user.click(screen.getByLabelText('Decrease Quantity'));

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('does not increase above max', async () => {
    render(<ControlledNumberField initial={10} max={10} />);

    await user.click(screen.getByLabelText('Increase Quantity'));

    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('disables Decrease at min', () => {
    render(<NumberField label="Quantity" value={0} min={0} />);

    expect(screen.getByLabelText('Decrease Quantity')).toBeDisabled();
  });

  it('disables Increase at max', () => {
    render(<NumberField label="Quantity" value={10} max={10} />);

    expect(screen.getByLabelText('Increase Quantity')).toBeDisabled();
  });

  it('does not change the value when disabled', async () => {
    render(<ControlledNumberField initial={3} disabled />);

    await user.click(screen.getByLabelText('Increase Quantity'));

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('disables both steppers when disabled', () => {
    render(<NumberField label="Quantity" value={3} disabled />);

    expect(screen.getByLabelText('Decrease Quantity')).toBeDisabled();
    expect(screen.getByLabelText('Increase Quantity')).toBeDisabled();
  });

  it('disables both steppers when step is 0', () => {
    render(<NumberField label="Quantity" value={3} step={0} />);

    expect(screen.getByLabelText('Decrease Quantity')).toBeDisabled();
    expect(screen.getByLabelText('Increase Quantity')).toBeDisabled();
  });

  it('moves in the correct direction when step is negative', async () => {
    render(<ControlledNumberField initial={3} step={-1} />);

    await user.click(screen.getByLabelText('Increase Quantity'));

    expect(screen.getByText('4')).toBeInTheDocument();

    await user.click(screen.getByLabelText('Decrease Quantity'));

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('falls back to a finite value when value is NaN', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<NumberField label="Quantity" value={NaN} />);

    expect(screen.getByText('0')).toBeInTheDocument();
    errorSpy.mockRestore();
  });

  it('uses the minimum as the fallback for a non-finite value', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<NumberField label="Quantity" value={NaN} min={10} />);

    expect(screen.getByText('10')).toBeInTheDocument();
    errorSpy.mockRestore();
  });

  it('preserves a finite value and disables both steppers when the range is invalid', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<NumberField label="Quantity" value={3} min={10} max={0} />);

    expect({
      value: screen.getByText('3').textContent,
      decreaseDisabled: screen.getByLabelText('Decrease Quantity').hasAttribute('disabled'),
      increaseDisabled: screen.getByLabelText('Increase Quantity').hasAttribute('disabled'),
    }).toEqual({ value: '3', decreaseDisabled: true, increaseDisabled: true });
    errorSpy.mockRestore();
  });

  it('disables both steppers when a bound is non-finite', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<NumberField label="Quantity" value={3} max={Infinity} />);

    expect(screen.getByLabelText('Decrease Quantity')).toBeDisabled();
    expect(screen.getByLabelText('Increase Quantity')).toBeDisabled();
    errorSpy.mockRestore();
  });

  it('gives the steppers a contextual accessible name based on the field label', () => {
    render(<NumberField label="Pushups" value={3} />);

    expect(screen.getByLabelText('Decrease Pushups')).toBeInTheDocument();
    expect(screen.getByLabelText('Increase Pushups')).toBeInTheDocument();
  });
});
