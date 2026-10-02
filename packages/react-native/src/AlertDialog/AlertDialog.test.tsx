import { render, screen, userEvent } from '@testing-library/react-native';
import { AlertDialog } from './AlertDialog';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

describe('<AlertDialog />', () => {
  const user = userEvent.setup();

  it('requires explicit confirmation', async () => {
    const onConfirm = jest.fn();

    await render(
      <AlertDialog
        open
        title="Delete record"
        description="This cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onClose={() => undefined}
        onConfirm={onConfirm}
      />,
    );

    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeOnTheScreen();

    await user.press(screen.getByRole('button', { name: 'Delete' }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
