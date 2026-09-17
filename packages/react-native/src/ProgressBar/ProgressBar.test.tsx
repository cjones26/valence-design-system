import { render, screen } from '@testing-library/react-native';
import { ProgressBar } from './ProgressBar';

describe('<ProgressBar />', () => {
  it('exposes its value and clamps overflow', async () => {
    await render(<ProgressBar label="Daily goal progress" value={120} max={100} />);

    const progress = screen.getByLabelText('Daily goal progress');

    expect(progress.props).toEqual(
      expect.objectContaining({
        accessibilityRole: 'progressbar',
        accessibilityValue: { min: 0, max: 100, now: 100 },
      }),
    );
    expect(progress.children[0]).toHaveStyle({ width: '100%' });
  });

  it('normalizes non-finite values', async () => {
    await render(<ProgressBar label="Daily goal progress" value={NaN} max={Infinity} />);

    const progress = screen.getByLabelText('Daily goal progress');

    expect(progress).toHaveAccessibilityValue({ min: 0, max: 100, now: 0 });
    expect(progress.children[0]).toHaveStyle({ width: '0%' });
  });
});
