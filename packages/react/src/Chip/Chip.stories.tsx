import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  args: { onPress: () => undefined },
};
export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = { args: { children: 'Pushups', icon: '💪' } };
export const Selected: Story = { args: { children: 'Pushups', icon: '💪', selected: true } };
export const Disabled: Story = { args: { children: 'Pushups', icon: '💪', disabled: true } };
