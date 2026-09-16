import { render, screen } from '@testing-library/react-native';

import { Spinner } from './Spinner';

describe('<Spinner />', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders without crashing', async () => {
    await render(<Spinner />);

    expect(screen.toJSON()).not.toBeNull();
  });
});
