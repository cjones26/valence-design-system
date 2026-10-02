import { Linking } from 'react-native';
import { render, screen, userEvent } from '@testing-library/react-native';
import { Link } from './Link';

describe('<Link />', () => {
  const user = userEvent.setup();

  it('opens its URL when pressed', async () => {
    const openURL = jest.spyOn(Linking, 'openURL').mockResolvedValue(true);

    await render(<Link href="https://example.com">View details</Link>);

    await user.press(screen.getByRole('link', { name: 'View details' }));

    expect(openURL).toHaveBeenCalledWith('https://example.com');
  });
});
