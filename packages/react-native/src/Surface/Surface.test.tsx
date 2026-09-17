import { render, screen } from '@testing-library/react-native';
import { Surface } from './Surface';

describe('<Surface />', () => {
  it('renders arbitrary content without adding interaction semantics', async () => {
    await render(<Surface>Cloud backup</Surface>);

    expect(screen.getByText('Cloud backup')).toBeOnTheScreen();
    expect(screen.queryByRole('button')).not.toBeOnTheScreen();
  });

  it('renders primitive content nested in fragments and arrays', async () => {
    await render(
      <Surface>
        <>{['Cloud', ' backup']}</>
      </Surface>,
    );

    expect(screen.getByText('Cloud')).toBeOnTheScreen();
    expect(screen.getByText(' backup')).toBeOnTheScreen();
  });
});
