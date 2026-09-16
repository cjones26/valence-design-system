import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusBadge } from './StatusBadge';

type Story = StoryObj<typeof StatusBadge>;

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  argTypes: { status: { control: 'select', options: ['success', 'warning', 'danger'] } },
};

export const Success: Story = { args: { status: 'success', children: 'All done' } };
export const Warning: Story = { args: { status: 'warning', children: 'Partial' } };
export const Danger: Story = { args: { status: 'danger', children: 'Missed' } };

export default meta;
