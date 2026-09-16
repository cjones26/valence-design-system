import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Card } from '@valence/react-native';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  argTypes: { status: { control: 'select', options: ['resting', 'editing', 'success', 'skipped', 'error'] } },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Resting: Story = { args: { status: 'resting', title: 'Pushups', children: 'Default appearance.' } };
export const Editing: Story = {
  args: { status: 'editing', title: 'Pushups', children: 'Ringed while being edited inline.' },
};
export const Success: Story = {
  args: { status: 'success', title: 'Pushups', children: 'Filled green when all criteria are met.' },
};
export const Skipped: Story = {
  args: { status: 'skipped', title: 'Pushups', children: 'Faded — does not apply today.' },
};
export const Error: Story = { args: { status: 'error', title: 'Pushups', children: 'Outlined red when a sync fails.' } };

function TappableCardExample() {
  const [count, setCount] = useState(0);
  return (
    <Card title="Pushups" onPress={() => setCount((n) => n + 1)}>
      {`Tap anywhere on the card. Pressed ${count} times.`}
    </Card>
  );
}
export const TappableCard: Story = { render: () => <TappableCardExample /> };
