import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BottomSheet } from './BottomSheet';

describe('<BottomSheet />', () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = function showModal() {
      this.setAttribute('open', '');
    };
    HTMLDialogElement.prototype.close = function close() {
      this.removeAttribute('open');
    };
  });

  it('renders only while open and closes from the backdrop', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { rerender } = render(
      <BottomSheet open={false} title="Repeat" onClose={onClose}>
        Schedule
      </BottomSheet>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    rerender(
      <BottomSheet open title="Repeat" onClose={onClose}>
        Schedule
      </BottomSheet>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Repeat' });
    await user.click(dialog);
    expect(onClose).toHaveBeenCalledOnce();
  });
});
