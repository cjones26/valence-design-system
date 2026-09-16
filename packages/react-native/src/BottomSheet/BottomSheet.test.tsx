import { render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { BottomSheet } from './BottomSheet';

jest.mock('@gorhom/bottom-sheet');
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 24, right: 0, bottom: 34, left: 0 }),
}));

describe('<BottomSheet />', () => {
  it('renders while open and closes from the backdrop', async () => {
    const user = userEvent.setup();
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

  it('configures scrolling, safe-area bounds, and keyboard handling', async () => {
    await render(
      <BottomSheet open title="Repeat" onClose={() => {}}>
        Schedule
      </BottomSheet>,
    );

    const sheet = await screen.findByTestId('bottom-sheet');
    expect(sheet).toHaveProp('enableDynamicSizing', true);
    expect(sheet).toHaveProp('enablePanDownToClose', true);
    expect(sheet).toHaveProp('topInset', 24);
    expect(sheet).toHaveProp('maxDynamicContentSize', expect.any(Number));
    expect(sheet).toHaveProp('keyboardBehavior', 'interactive');
    expect(sheet).toHaveProp('keyboardBlurBehavior', 'restore');
    expect(sheet).toHaveProp('android_keyboardInputMode', 'adjustResize');
    expect(screen.getByText('Schedule')).toBeOnTheScreen();
  });

  it('dismisses when the controlled open prop becomes false', async () => {
    const onClose = jest.fn();
    const { rerender } = await render(
      <BottomSheet open title="Repeat" onClose={onClose}>
        Schedule
      </BottomSheet>,
    );
    expect(await screen.findByText('Schedule')).toBeOnTheScreen();

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
