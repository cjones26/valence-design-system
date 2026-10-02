import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './Tabs';

const options = [
  { value: 'first', label: 'First', content: 'First panel' },
  { value: 'second', label: 'Second', content: 'Second panel' },
];

describe('<Tabs />', () => {
  const user = userEvent.setup();

  it('reports tab selection', async () => {
    const onChange = vi.fn();

    render(<Tabs label="Sections" options={options} value="first" onChange={onChange} />);

    await user.click(screen.getByRole('tab', { name: 'Second' }));

    expect(onChange).toHaveBeenCalledWith('second');
  });
});
