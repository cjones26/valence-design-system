import { render, screen } from '@testing-library/react';

import { DeltaPill } from './DeltaPill';

describe('<DeltaPill />', () => {
  it('renders a positive delta with a plus sign', () => {
    render(<DeltaPill value={5} unit="%" />);

    expect(screen.getByText('+5%')).toBeInTheDocument();
  });

  it('renders a negative delta without a plus sign', () => {
    render(<DeltaPill value={-3} unit="%" />);

    expect(screen.getByText('-3%')).toBeInTheDocument();
  });

  it('renders zero with neutral styling instead of hiding it', () => {
    render(<DeltaPill value={0} unit="%" />);

    const pill = screen.getByText('0%');
    expect(pill).toBeInTheDocument();
    expect(pill.className).not.toMatch(/deltaPositive|deltaNegative/);
  });

  it('renders a placeholder instead of NaN/Infinity for a non-finite value', () => {
    render(<DeltaPill value={NaN} unit="%" />);

    const pill = screen.getByText('—%');
    expect(pill).toBeInTheDocument();
    expect(pill.className).not.toMatch(/deltaPositive|deltaNegative/);
  });
});
