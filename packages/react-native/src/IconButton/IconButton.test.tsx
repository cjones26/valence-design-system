import { render, screen, userEvent } from '@testing-library/react-native';
import { IconButton } from './IconButton';

describe('<IconButton />', () => {
  const user = userEvent.setup();

  it('exposes its label and handles activation', async () => {
    const onPress = jest.fn();

    await render(<IconButton label="Settings" icon="⚙" onPress={onPress} />);

    await user.press(screen.getByRole('button', { name: 'Settings' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
