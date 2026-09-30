import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchField } from './SearchField';

const SearchExample = ({ onSubmit }: { onSubmit?: () => void }) => {
  const [value, setValue] = useState('');

  return (
    <SearchField
      label="Search documentation"
      value={value}
      onChangeText={setValue}
      onSubmit={onSubmit}
    />
  );
};

describe('<SearchField />', () => {
  const user = userEvent.setup();

  it('updates through keyboard input and submits with Enter', async () => {
    const onSubmit = vi.fn();
    render(<SearchExample onSubmit={onSubmit} />);

    const input = screen.getByRole('searchbox', { name: 'Search documentation' });

    await user.type(input, 'backup{Enter}');

    expect(input).toHaveValue('backup');
    expect(onSubmit).toHaveBeenCalledOnce();
  });

  it('supports a disabled state', () => {
    render(<SearchField label="Search documentation" value="" disabled />);

    expect(screen.getByRole('searchbox')).toBeDisabled();
  });
});
