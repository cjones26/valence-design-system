import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast } from './Toast';

describe('<Toast />', () => {
  const user = userEvent.setup();

  it('dismisses from its accessible close button', async () => {
    const onDismiss = vi.fn();

    render(<Toast open message="Saved" duration={0} onDismiss={onDismiss} />);

    await user.click(screen.getByRole('button', { name: 'Dismiss' }));

    expect(onDismiss).toHaveBeenCalledOnce();
  });
});
