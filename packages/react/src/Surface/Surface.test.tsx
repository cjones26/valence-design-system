import { render, screen } from '@testing-library/react';
import { Surface } from './Surface';

describe('<Surface />', () => {
  it('renders arbitrary content without adding interaction semantics', () => {
    render(<Surface><span>Cloud backup</span></Surface>);

    expect(screen.getByText('Cloud backup')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
