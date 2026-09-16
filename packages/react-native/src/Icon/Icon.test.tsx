import { render, screen } from '@testing-library/react-native';
import { ICON_NAMES } from '@valence/types';

import { Icon } from './Icon';

describe('<Icon />', () => {
  it.each(ICON_NAMES)('renders the %s icon without crashing', async (name) => {
    await render(<Icon name={name} />);

    expect(screen.toJSON()).not.toBeNull();
  });
});
