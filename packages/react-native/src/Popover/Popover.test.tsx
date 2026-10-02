import { useState } from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { Popover } from './Popover';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

const PopoverExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} label="Details" trigger="Open" onOpenChange={setOpen}>
      More details
    </Popover>
  );
};

describe('<Popover />', () => {
  const user = userEvent.setup();

  it('reveals its content from the trigger', async () => {
    await render(<PopoverExample />);

    await user.press(screen.getByRole('button', { name: 'Details' }));

    expect(screen.getByText('More details')).toBeOnTheScreen();
  });
});
