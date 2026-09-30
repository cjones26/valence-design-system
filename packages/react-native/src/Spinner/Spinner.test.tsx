import { render } from '@testing-library/react-native';

import { Spinner } from './Spinner';

describe('<Spinner />', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders without crashing', () => {
    expect(() => render(<Spinner />)).not.toThrow();
  });
});
