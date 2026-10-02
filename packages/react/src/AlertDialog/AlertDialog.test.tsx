import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AlertDialog } from './AlertDialog';

describe('<AlertDialog />', () => {
  const user = userEvent.setup();

  it('requires explicit confirmation', async () => {
    const onConfirm = vi.fn();

    render(
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

    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Delete' }));

    expect(onConfirm).toHaveBeenCalledOnce();
  });
});
