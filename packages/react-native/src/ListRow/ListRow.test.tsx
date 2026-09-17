import { useState } from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { Text, View } from 'react-native';

import { ListRow } from './ListRow';

function PressableListRow() {
  const [pressed, setPressed] = useState(false);

  return (
    <>
      <ListRow title="Groceries" onPress={() => setPressed(true)} />
      {pressed && <Text>pressed</Text>}
    </>
  );
}

describe('<ListRow />', () => {
  const user = userEvent.setup();

  it('renders the title', async () => {
    await render(<ListRow title="Groceries" />);

    expect(screen.getByText('Groceries')).toBeOnTheScreen();
  });

  it('renders primitive icon content', async () => {
    await render(<ListRow title="Workout" icon="💪" />);

    expect(screen.getByText('💪')).toBeOnTheScreen();
  });

  it('renders the subtitle when provided', async () => {
    await render(<ListRow title="Groceries" subtitle="Due Friday" />);

    expect(screen.getByText('Due Friday')).toBeOnTheScreen();
  });

  it('is not a button when onPress is not provided', async () => {
    await render(<ListRow title="Groceries" />);

    expect(screen.queryByRole('button')).not.toBeOnTheScreen();
  });

  it('becomes a pressable button when onPress is provided', async () => {
    await render(<ListRow title="Groceries" onPress={() => {}} />);

    expect(screen.getByRole('button')).toBeOnTheScreen();
  });

  it('invokes onPress when pressed', async () => {
    await render(<PressableListRow />);

    await user.press(screen.getByRole('button'));

    expect(screen.getByText('pressed')).toBeOnTheScreen();
  });

  it('shows the title with strikethrough when archived', async () => {
    await render(<ListRow title="Groceries" archived />);

    expect(screen.getByText('Groceries')).toHaveStyle({ textDecorationLine: 'line-through' });
  });

  it('includes archived state in the accessible name when pressable', async () => {
    await render(<ListRow title="Groceries" subtitle="Due Friday" archived onPress={() => {}} />);

    expect(
      screen.getByRole('button', { name: 'Groceries, archived, Due Friday' }),
    ).toBeOnTheScreen();
  });

  it('does not strike through the title when not archived', async () => {
    await render(<ListRow title="Groceries" />);

    expect(screen.getByText('Groceries')).toHaveStyle({ textDecorationLine: 'none' });
  });

  it('renders a presentation-only trailing icon', async () => {
    await render(
      <ListRow
        title="Groceries"
        trailingIcon={() => <View accessibilityLabel="Decorative icon" />}
      />,
    );

    const iconSlot = screen.getByLabelText('Decorative icon', {
      includeHiddenElements: true,
    }).parent;
    expect(iconSlot?.props).toEqual(
      expect.objectContaining({
        pointerEvents: 'none',
        accessibilityElementsHidden: true,
        importantForAccessibility: 'no-hide-descendants',
      }),
    );
  });

  it('removes standalone elevation when grouped inside a Surface', async () => {
    await render(<ListRow grouped title="Cloud backup" />);

    expect(screen.getByText('Cloud backup').parent?.parent).toHaveStyle({ borderRadius: 0 });
    expect(screen.getByText('Cloud backup').parent?.parent).not.toHaveStyle({
      boxShadow: expect.any(String),
    });
  });
});
