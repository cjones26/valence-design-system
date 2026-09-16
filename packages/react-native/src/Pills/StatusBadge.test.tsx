import { render, screen } from '@testing-library/react-native';

import { StatusBadge } from './StatusBadge';

describe('<StatusBadge />', () => {
  it('renders its content', async () => {
    await render(<StatusBadge status="success">Active</StatusBadge>);

    expect(screen.getByText('Active')).toBeOnTheScreen();
  });
});
