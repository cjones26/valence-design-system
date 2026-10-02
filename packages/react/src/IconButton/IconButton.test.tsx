import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconButton } from './IconButton';

describe('<IconButton />', () => {
  const user = userEvent.setup();

  it('exposes its label and handles activation', async () => {
    const onPress = vi.fn();

    render(<IconButton label="Settings" icon="⚙" onPress={onPress} />);

    await user.click(screen.getByRole('button', { name: 'Settings' }));

    expect(onPress).toHaveBeenCalledOnce();
  });
});
