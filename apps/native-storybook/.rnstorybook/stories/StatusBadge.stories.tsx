import type { Meta, StoryObj } from '@storybook/react-native';
import { StatusBadge } from '@valence/react-native';

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  argTypes: { status: { control: 'select', options: ['success', 'warning', 'danger'] } },
};
export default meta;

type Story = StoryObj<typeof StatusBadge>;

export const Success: Story = { args: { status: 'success', children: 'All done' } };
export const Warning: Story = { args: { status: 'warning', children: 'Partial' } };
export const Danger: Story = { args: { status: 'danger', children: 'Missed' } };
