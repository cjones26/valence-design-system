import { render } from '@testing-library/react';
import { ICON_NAMES } from '@valence/types';

import { Icon } from './Icon';

describe('<Icon />', () => {
  it.each(ICON_NAMES)('renders the %s icon without crashing', (name) => {
    const { container } = render(<Icon name={name} />);

    expect(container.querySelector('svg')).not.toBeNull();
  });
});
