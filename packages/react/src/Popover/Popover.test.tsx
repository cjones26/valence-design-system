import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover } from './Popover';

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
    render(<PopoverExample />);

    await user.click(screen.getByRole('button', { name: 'Details' }));

    expect(await screen.findByText('More details')).toBeInTheDocument();
  });
});
