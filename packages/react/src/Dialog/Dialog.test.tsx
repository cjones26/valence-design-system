import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog } from './Dialog';

describe('<Dialog />', () => {
  const user = userEvent.setup();

  it('renders a labeled modal and closes from its button', async () => {
    const onClose = vi.fn();

    render(
      <Dialog open title="Account details" onClose={onClose}>
        Details
      </Dialog>,
    );

    expect(screen.getByRole('dialog', { name: 'Account details' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close' }));

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('can omit its close button', () => {
    render(
      <Dialog open title="Required decision" showCloseButton={false} onClose={() => undefined}>
        Choose an action.
      </Dialog>,
    );

    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
  });
});
