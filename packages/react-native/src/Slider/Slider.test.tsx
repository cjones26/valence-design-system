import { render, screen, fireEvent } from '@testing-library/react-native';

import { Slider } from './Slider';

jest.mock('@react-native-community/slider', () => {
  const { View } = jest.requireActual('react-native');

  return { __esModule: true, default: View };
});

describe('<Slider />', () => {
  it('exposes an accessible value reflecting min, max, and current value', async () => {
    await render(<Slider value={40} min={0} max={100} label="Volume" />);

    expect(screen.getByLabelText('Volume')).toHaveAccessibilityValue({ min: 0, max: 100, now: 40 });
  });

  it('forwards native value changes through the shared onChange callback', async () => {
    const onChange = jest.fn();

    await render(<Slider value={40} min={0} max={100} onChange={onChange} label="Volume" />);

    fireEvent(screen.getByLabelText('Volume'), 'valueChange', 65);

    expect(onChange).toHaveBeenCalledWith(65);
  });

  it('exposes the disabled accessibility state', async () => {
    await render(<Slider value={40} min={0} max={100} label="Volume" disabled />);

    expect(screen.getByLabelText('Volume')).toBeDisabled();
  });

  it('reports a fixed value when min equals max', async () => {
    await render(<Slider value={5} min={5} max={5} label="Fixed" />);

    expect(screen.getByLabelText('Fixed')).toHaveAccessibilityValue({ min: 5, max: 5, now: 5 });
  });

  it('falls back to a finite value when value is NaN', async () => {
    await render(<Slider value={NaN} min={0} max={100} label="Volume" />);

    expect(screen.getByLabelText('Volume')).toHaveAccessibilityValue({ now: 0 });
  });

  it('replaces an invalid range with a disabled fixed control', async () => {
    await render(<Slider value={5} min={10} max={0} label="Volume" />);

    const slider = screen.getByLabelText('Volume');
    expect(slider).toBeDisabled();
    expect(slider).toHaveAccessibilityValue({ min: 0, max: 0, now: 0 });
  });

  it('contains a non-finite bound in a disabled fixed control', async () => {
    await render(<Slider value={5} min={0} max={NaN} label="Volume" />);

    const slider = screen.getByLabelText('Volume');
    expect(slider).toBeDisabled();
    expect(slider).toHaveAccessibilityValue({ min: 0, max: 0, now: 0 });
  });
});
