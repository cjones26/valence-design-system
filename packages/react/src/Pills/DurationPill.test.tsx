import { render, screen } from '@testing-library/react';

import { DurationPill } from './DurationPill';

describe('<DurationPill />', () => {
  it('formats seconds under a minute', () => {
    render(<DurationPill seconds={5} />);

    expect(screen.getByText('0:05')).toBeInTheDocument();
  });

  it('formats seconds over a minute as minutes and seconds', () => {
    render(<DurationPill seconds={125} />);

    expect(screen.getByText('2:05')).toBeInTheDocument();
  });

  it('exposes its status and duration without creating a live region', () => {
    render(<DurationPill seconds={125} status="completed" />);

    expect(screen.getByRole('timer', { name: 'completed, 2:05' })).toBeInTheDocument();
  });

  it('clamps negative durations to zero', () => {
    render(<DurationPill seconds={-10} />);

    expect(screen.getByText('0:00')).toBeInTheDocument();
  });

  it('renders a placeholder instead of NaN for a non-finite duration', () => {
    render(<DurationPill seconds={NaN} />);

    expect(screen.getByText('—:—')).toBeInTheDocument();
  });
});
