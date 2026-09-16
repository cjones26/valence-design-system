import { render, screen } from '@testing-library/react';
import { Divider } from './Divider';

describe('<Divider />', () => {
  it('renders with separator semantics', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});
