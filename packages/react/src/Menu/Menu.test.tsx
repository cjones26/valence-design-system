import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Menu } from './Menu';

describe('<Menu />', () => {
  const user = userEvent.setup();

  it('reports the selected action', async () => {
    const onAction = vi.fn();

    render(<Menu label="Actions" items={[{ value: 'edit', label: 'Edit' }]} onAction={onAction} />);

    await user.click(screen.getByRole('button', { name: 'Actions' }));

    await user.click(await screen.findByRole('menuitem', { name: 'Edit' }));

    expect(onAction).toHaveBeenCalledWith('edit');
  });
});
