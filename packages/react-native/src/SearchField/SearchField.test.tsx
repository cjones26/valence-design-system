import { useState } from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
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

  it('updates through keyboard input', async () => {
    await render(<SearchExample />);

    const input = screen.getByLabelText('Search documentation');

    await user.type(input, 'backup');

    expect(input).toHaveDisplayValue('backup');
  });

  it('submits from the keyboard', async () => {
    const onSubmit = jest.fn();

    await render(<SearchExample onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText('Search documentation'), 'backup', {
      submitEditing: true,
    });

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('supports a disabled state', async () => {
    await render(<SearchField label="Search documentation" value="" disabled />);

    expect(screen.getByLabelText('Search documentation')).toBeDisabled();
  });
});
