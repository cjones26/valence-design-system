import { render, screen } from '@testing-library/react-native';
import { Divider } from './Divider';

describe('<Divider />', () => {
  it('renders as presentation', async () => {
    await render(<Divider />);
    expect(screen.toJSON()).not.toBeNull();
  });
});
