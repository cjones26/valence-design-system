import { useState } from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { Text } from 'react-native';

import { Button } from './Button';

function PressableButton({ disabled, loading }: { disabled?: boolean; loading?: boolean }) {
  const [pressed, setPressed] = useState(false);

  return (
    <>
      <Button onPress={() => setPressed(true)} disabled={disabled} loading={loading}>
        Save
      </Button>
      {pressed && <Text>pressed</Text>}
    </>
  );
}

describe('<Button />', () => {
  const user = userEvent.setup();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders with an accessible name', async () => {
    await render(<Button>Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).toBeOnTheScreen();
  });

  it('invokes onPress when pressed', async () => {
    await render(<PressableButton />);

    await user.press(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByText('pressed')).toBeOnTheScreen();
  });

  it('does not invoke onPress when disabled', async () => {
    await render(<PressableButton disabled />);

    await user.press(screen.getByRole('button', { name: 'Save' }));

    expect(screen.queryByText('pressed')).not.toBeOnTheScreen();
  });

  it('does not invoke onPress while loading', async () => {
    await render(<PressableButton loading />);

    await user.press(screen.getByRole('button', { name: 'Save' }));

    expect(screen.queryByText('pressed')).not.toBeOnTheScreen();
  });

  it('marks the button as disabled when explicitly disabled', async () => {
    await render(<Button disabled>Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  });

  it('keeps a visible border on disabled secondary and danger buttons', async () => {
    await render(
      <>
        <Button kind="secondary" disabled>
          Cancel
        </Button>
        <Button kind="danger" disabled>
          Stop tracking
        </Button>
      </>,
    );

    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveStyle({ borderWidth: 1 });
    expect(screen.getByRole('button', { name: 'Stop tracking' })).toHaveStyle({ borderWidth: 1 });
  });

  it('marks the button as disabled while loading', async () => {
    await render(<Button loading>Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  });

  it('marks the button as busy while loading', async () => {
    await render(<Button loading>Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).toBeBusy();
  });

  it('does not mark the button as busy when not loading', async () => {
    await render(<Button>Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).not.toBeBusy();
  });

  it('uses a 48pt button height without hitSlop', async () => {
    await render(<Button>Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).toHaveStyle({ minHeight: 48 });
  });
});
