import { AccessibilityInfo } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { DurationPill } from './DurationPill';

describe('<DurationPill />', () => {
  it('renders the live status without warning, with and without reduced motion', async () => {
    await render(<DurationPill seconds={30} status="live" />);
    expect(screen.getByText('0:30')).toBeOnTheScreen();

    jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValueOnce(true);
    await render(<DurationPill seconds={30} status="live" />);
    expect(screen.getAllByText('0:30').length).toBeGreaterThan(0);

    jest.restoreAllMocks();
  });

  it('formats seconds under a minute', async () => {
    await render(<DurationPill seconds={5} />);

    expect(screen.getByText('0:05')).toBeOnTheScreen();
  });

  it('formats seconds over a minute as minutes and seconds', async () => {
    await render(<DurationPill seconds={125} />);

    expect(screen.getByText('2:05')).toBeOnTheScreen();
  });

  it('exposes its status and duration as one accessible label', async () => {
    await render(<DurationPill seconds={125} status="completed" />);

    expect(screen.getByLabelText('completed, 2:05')).toBeOnTheScreen();
  });

  it('clamps negative durations to zero', async () => {
    await render(<DurationPill seconds={-10} />);

    expect(screen.getByText('0:00')).toBeOnTheScreen();
  });

  it('renders a placeholder instead of NaN for a non-finite duration', async () => {
    await render(<DurationPill seconds={NaN} />);

    expect(screen.getByText('—:—')).toBeOnTheScreen();
  });
});
