import { render } from '@testing-library/react-native';
import { Divider } from './Divider';

describe('<Divider />', () => {
  it('renders without crashing', () => {
    expect(() => render(<Divider />)).not.toThrow();
  });
});
