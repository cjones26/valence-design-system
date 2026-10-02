import { render, screen } from '@testing-library/react';
import { Link } from './Link';

describe('<Link />', () => {
  it('renders a navigable link', () => {
    render(<Link href="/details">View details</Link>);

    expect(screen.getByRole('link', { name: 'View details' })).toHaveAttribute('href', '/details');
  });

  it('removes navigation when disabled', () => {
    render(
      <Link href="/details" disabled>
        View details
      </Link>,
    );

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
