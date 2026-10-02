import { render, screen } from '@testing-library/react-native';
import { Alert } from './Alert';

describe('<Alert />', () => {
  it('uses alert semantics for danger messages', async () => {
    await render(<Alert tone="danger">Unable to save</Alert>);

    expect(screen.getByLabelText('Unable to save')).toBeOnTheScreen();
  });
});
