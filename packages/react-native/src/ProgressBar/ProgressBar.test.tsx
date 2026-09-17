import { render, screen } from '@testing-library/react-native';
import { ProgressBar } from './ProgressBar';

describe('<ProgressBar />', () => {
  it('exposes its value and clamps overflow', async () => {
    await render(<ProgressBar label="Daily goal progress" value={120} max={100} />);

    expect(screen.getByLabelText('Daily goal progress')).toHaveAccessibilityValue({
      min: 0,
      max: 100,
      now: 100,
    });
  });

  it('normalizes non-finite values', async () => {
    await render(<ProgressBar label="Daily goal progress" value={NaN} max={Infinity} />);

    expect(screen.getByLabelText('Daily goal progress')).toHaveAccessibilityValue({
      min: 0,
      max: 100,
      now: 0,
    });
  });
});
