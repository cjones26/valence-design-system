import { render, screen, userEvent } from '@testing-library/react-native';
import { Tabs } from './Tabs';

const options = [
  { value: 'first', label: 'First', content: 'First panel' },
  { value: 'second', label: 'Second', content: 'Second panel' },
];

describe('<Tabs />', () => {
  const user = userEvent.setup();

  it('reports tab selection', async () => {
    const onChange = jest.fn();

    await render(<Tabs label="Sections" options={options} value="first" onChange={onChange} />);

    await user.press(screen.getByRole('tab', { name: 'Second' }));

    expect(onChange).toHaveBeenCalledWith('second');
  });
});
