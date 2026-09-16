import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('<ProgressBar />', () => {
  it('exposes its value and clamps overflow', () => {
    render(<ProgressBar label="Daily goal progress" value={120} max={100} />);
    const progress = screen.getByRole('progressbar', { name: 'Daily goal progress' });

    expect(progress).toHaveAttribute('aria-valuenow', '100');
    expect(progress.firstElementChild).toHaveStyle({ width: '100%' });
  });

  it('normalizes non-finite values', () => {
    render(<ProgressBar label="Daily goal progress" value={NaN} max={Infinity} />);
    const progress = screen.getByRole('progressbar', { name: 'Daily goal progress' });

    expect(progress).toHaveAttribute('aria-valuemax', '100');
    expect(progress).toHaveAttribute('aria-valuenow', '0');
    expect(progress.firstElementChild).toHaveStyle({ width: '0%' });
  });
});
