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

  it('reports activation', async () => {
    const onPress = jest.fn();

    await render(
      <Link href="https://example.com" onPress={onPress}>
        View details
      </Link>,
    );

    await user.press(screen.getByRole('link', { name: 'View details' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not replace navigation with the activation callback', async () => {
    const openURL = jest.spyOn(Linking, 'openURL').mockResolvedValue(true);

    await render(
      <Link href="https://example.com" onPress={() => undefined}>
        View details
      </Link>,
    );

    await user.press(screen.getByRole('link', { name: 'View details' }));

    expect(openURL).toHaveBeenCalledWith('https://example.com');
  });
});
