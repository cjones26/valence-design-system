import { render, screen, userEvent } from '@testing-library/react-native';
import { Menu } from './Menu';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

describe('<Menu />', () => {
  const user = userEvent.setup();

  it('reports the selected action', async () => {
    const onAction = jest.fn();

    await render(
      <Menu label="Actions" items={[{ value: 'edit', label: 'Edit' }]} onAction={onAction} />,
    );

    await user.press(screen.getByRole('button', { name: 'Actions' }));

    await user.press(screen.getByRole('menuitem', { name: 'Edit' }));

    expect(onAction).toHaveBeenCalledWith('edit');
  });
});
