import { fireEvent, render, screen } from '@testing-library/react-native';
import { Picker } from './Picker';

const options = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
];

describe('<Picker />', () => {
  it('exposes its accessible name and selected value', async () => {
    await render(<Picker label="Frequency" options={options} value="weekly" />);

    expect(screen.getByLabelText('Frequency')).toBeOnTheScreen();
  });

  it('reports native value changes', async () => {
    const onChange = jest.fn();
    await render(<Picker label="Frequency" options={options} value="daily" onChange={onChange} />);

    fireEvent(screen.getByLabelText('Frequency'), 'valueChange', 'weekly');

    expect(onChange).toHaveBeenCalledWith('weekly');
  });

  it('exposes error guidance to assistive technology', async () => {
    await render(
      <Picker
        label="Frequency"
        options={options}
        value=""
        disabled
        error
        helperText="Choose a frequency."
      />,
    );

    expect(screen.getByLabelText('Frequency')).toHaveProp(
      'accessibilityHint',
      'Choose a frequency.',
    );
  });
});
