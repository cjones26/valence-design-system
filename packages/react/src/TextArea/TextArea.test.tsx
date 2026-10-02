import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextArea } from './TextArea';

describe('<TextArea />', () => {
  const user = userEvent.setup();

  it('reports text changes', async () => {
    const onChangeText = vi.fn();

    render(<TextArea label="Notes" value="" onChangeText={onChangeText} />);

    await user.type(screen.getByRole('textbox', { name: 'Notes' }), 'A');

    expect(onChangeText).toHaveBeenCalledWith('A');
  });

  it('connects invalid helper text to the field', () => {
    render(<TextArea label="Notes" value="" error helperText="Notes are required" />);

    expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveAccessibleDescription(
      'Notes are required',
    );
  });
});
