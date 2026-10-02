import { render, screen } from '@testing-library/react';
import { Alert } from './Alert';

describe('<Alert />', () => {
  it('uses assertive alert semantics for danger messages', () => {
    render(<Alert tone="danger">Unable to save</Alert>);

    expect(screen.getByRole('alert')).toHaveTextContent('Unable to save');
  });
});
