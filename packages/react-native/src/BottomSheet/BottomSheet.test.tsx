import { render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { BottomSheet } from './BottomSheet';

jest.mock('@gorhom/bottom-sheet');
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 24, right: 0, bottom: 34, left: 0 }),
}));

describe('<BottomSheet />', () => {
  const user = userEvent.setup();

  it('renders while open and closes from the backdrop', async () => {
    const onClose = jest.fn();

    await render(
      <BottomSheet open title="Repeat" onClose={onClose}>
        Schedule
      </BottomSheet>,
    );

    expect(screen.getByText('Schedule')).toBeOnTheScreen();

    await user.press(screen.getByRole('button', { name: 'Close sheet' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('configures dynamic sizing and dismissal', async () => {
    await render(
      <BottomSheet open title="Repeat" onClose={() => {}}>
        Schedule
      </BottomSheet>,
    );

    const sheet = await screen.findByTestId('bottom-sheet');

    expect(sheet.props).toEqual(
      expect.objectContaining({
        enableDynamicSizing: true,
        enablePanDownToClose: true,
        topInset: 24,
        maxDynamicContentSize: expect.any(Number),
      }),
    );
  });

  it('configures keyboard handling', async () => {
    await render(
      <BottomSheet open title="Repeat" onClose={() => {}}>
        Schedule
      </BottomSheet>,
    );

    const sheet = await screen.findByTestId('bottom-sheet');

    expect(sheet.props).toEqual(
      expect.objectContaining({
        keyboardBehavior: 'interactive',
        keyboardBlurBehavior: 'restore',
        android_keyboardInputMode: 'adjustResize',
      }),
    );
  });

  it('dismisses when the controlled open prop becomes false', async () => {
    const onClose = jest.fn();

    const { rerender } = await render(
      <BottomSheet open title="Repeat" onClose={onClose}>
        Schedule
      </BottomSheet>,
    );

    await screen.findByText('Schedule');

    await rerender(
      <BottomSheet open={false} title="Repeat" onClose={onClose}>
        Schedule
      </BottomSheet>,
    );

    await waitFor(() => expect(screen.queryByText('Schedule')).not.toBeOnTheScreen());

    expect(onClose).not.toHaveBeenCalled();
  });

  it('requests closure after a swipe dismissal', async () => {
    const onClose = jest.fn();

    await render(
      <BottomSheet open title="Repeat" onClose={onClose}>
        Schedule
      </BottomSheet>,
    );

    const sheet = await screen.findByTestId('bottom-sheet');

    sheet.props.onChange(-1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
