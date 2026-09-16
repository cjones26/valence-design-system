import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: { onPress: () => undefined },
  argTypes: {
    kind: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'dangerConfirm', 'pill'],
    },
  },
};

export const Primary: Story = { args: { kind: 'primary', children: 'Save' } };
export const Secondary: Story = { args: { kind: 'secondary', children: 'Cancel' } };
export const Ghost: Story = { args: { kind: 'ghost', children: 'Skip' } };
export const Danger: Story = { args: { kind: 'danger', children: 'Stop tracking' } };
export const DangerConfirm: Story = {
  args: { kind: 'dangerConfirm', children: 'Tap again to confirm' },
};
export const Pill: Story = { args: { kind: 'pill', children: 'Pause' } };
export const Loading: Story = { args: { kind: 'primary', loading: true, children: 'Save' } };
export const Disabled: Story = { args: { kind: 'primary', disabled: true, children: 'Save' } };

export default meta;
