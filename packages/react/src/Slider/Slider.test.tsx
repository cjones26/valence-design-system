import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Slider } from './Slider';

function ControlledSlider({ disabled }: { disabled?: boolean }) {
  const [value, setValue] = useState(40);

  return (
    <Slider
      value={value}
      min={0}
      max={100}
      onChange={setValue}
      label="Volume"
      disabled={disabled}
    />
  );
}

describe('<Slider />', () => {
  it('exposes an accessible value reflecting min, max, and current value', () => {
    render(<Slider value={40} min={0} max={100} label="Volume" />);

    const slider = screen.getByRole('slider', { name: 'Volume' });
    expect(slider).toHaveValue('40');
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '100');
  });

  it('invokes onChange when the value changes', () => {
    render(<ControlledSlider />);

    fireEvent.change(screen.getByRole('slider', { name: 'Volume' }), { target: { value: '65' } });

    expect(screen.getByRole('slider', { name: 'Volume' })).toHaveValue('65');
  });

  it('does not respond to input when disabled', () => {
    render(<ControlledSlider disabled />);

    expect(screen.getByRole('slider', { name: 'Volume' })).toBeDisabled();
  });

  it('reports a fixed value when min equals max', () => {
    render(<Slider value={5} min={5} max={5} label="Fixed" />);

    const slider = screen.getByRole('slider', { name: 'Fixed' });
    expect(slider).toHaveValue('5');
    expect(slider).toHaveAttribute('min', '5');
    expect(slider).toHaveAttribute('max', '5');
  });

  it('passes step through to the input', () => {
    render(<Slider value={40} min={0} max={100} step={10} label="Volume" />);

    expect(screen.getByRole('slider', { name: 'Volume' })).toHaveAttribute('step', '10');
  });

  it('falls back to a finite value and warns when value is NaN', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<Slider value={NaN} min={0} max={100} label="Volume" />);

    expect(screen.getByRole('slider', { name: 'Volume' })).toHaveValue('0');
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('"value" must be a finite number'),
    );
    errorSpy.mockRestore();
  });

  it('replaces an invalid range with a disabled fixed control', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<Slider value={5} min={10} max={0} label="Volume" />);

    const slider = screen.getByRole('slider', { name: 'Volume' });
    expect(slider).toBeDisabled();
    expect(slider).toHaveValue('0');
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '0');
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('"min" (10) and "max" (0)'));
    errorSpy.mockRestore();
  });

  it('contains a non-finite bound in a disabled fixed control', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<Slider value={5} min={0} max={NaN} label="Volume" />);

    const slider = screen.getByRole('slider', { name: 'Volume' });
    expect(slider).toBeDisabled();
    expect(slider).toHaveValue('0');
    errorSpy.mockRestore();
  });
});
