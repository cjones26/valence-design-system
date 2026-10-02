import { render, screen, userEvent } from '@testing-library/react-native';
import { Dialog } from './Dialog';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

describe('<Dialog />', () => {
  const user = userEvent.setup();

  it('closes from its accessible button', async () => {
    const onClose = jest.fn();

    await render(
      <Dialog open title="Account details" onClose={onClose}>
        Details
      </Dialog>,
    );

    await user.press(screen.getByRole('button', { name: 'Close' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
