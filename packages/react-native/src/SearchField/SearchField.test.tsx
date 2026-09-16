import { useState } from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { SearchField } from './SearchField';

function SearchExample({ onSubmit }: { onSubmit?: () => void }) {
  const [value, setValue] = useState('');
  return (
    <SearchField
      label="Search documentation"
      value={value}
      onChangeText={setValue}
      onSubmit={onSubmit}
    />
  );
}

describe('<SearchField />', () => {
  it('updates through keyboard input and submits', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    await render(<SearchExample onSubmit={onSubmit} />);
    const input = screen.getByLabelText('Search documentation');

    await user.type(input, 'backup');
    await user.press(input);
    input.props.onSubmitEditing();

    expect(input).toHaveProp('value', 'backup');
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('supports a disabled state', async () => {
    await render(<SearchField label="Search documentation" value="" disabled />);
    expect(screen.getByLabelText('Search documentation')).toHaveProp('accessibilityState', {
      disabled: true,
    });
  });
});
