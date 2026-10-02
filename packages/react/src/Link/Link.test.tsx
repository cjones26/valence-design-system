import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link } from './Link';

describe('<Link />', () => {
  const user = userEvent.setup();

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

  it('lets the activation callback replace navigation', async () => {
    const onPress = vi.fn();

    render(
      <Link href="#details" onPress={onPress}>
        View details
      </Link>,
    );

    await user.click(screen.getByRole('link', { name: 'View details' }));

    expect(onPress).toHaveBeenCalledOnce();
  });
});
