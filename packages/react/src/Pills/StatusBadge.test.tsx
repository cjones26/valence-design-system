import { render, screen } from '@testing-library/react';

import { StatusBadge } from './StatusBadge';

describe('<StatusBadge />', () => {
  it('renders its content', () => {
    render(<StatusBadge status="success">Active</StatusBadge>);

    expect(screen.getByText('Active')).toBeInTheDocument();
  });
});
