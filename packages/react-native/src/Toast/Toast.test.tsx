import { render, screen, userEvent } from '@testing-library/react-native';
import { Toast } from './Toast';

describe('<Toast />', () => {
  const user = userEvent.setup();

  it('dismisses from its accessible close button', async () => {
    const onDismiss = jest.fn();

    await render(<Toast open message="Saved" duration={0} onDismiss={onDismiss} />);

    await user.press(screen.getByRole('button', { name: 'Dismiss' }));

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
