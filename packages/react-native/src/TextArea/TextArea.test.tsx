import { render, screen, userEvent } from '@testing-library/react-native';
import { TextArea } from './TextArea';

describe('<TextArea />', () => {
  const user = userEvent.setup();

  it('reports text changes', async () => {
    const onChangeText = jest.fn();

    await render(<TextArea label="Notes" value="" onChangeText={onChangeText} />);

    await user.type(screen.getByLabelText('Notes'), 'A');

    expect(onChangeText).toHaveBeenCalledWith('A');
  });
});
