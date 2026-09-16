import type { Meta, StoryObj } from '@storybook/react-vite';
import { DurationPill } from './DurationPill';

type Story = StoryObj<typeof DurationPill>;

const meta: Meta<typeof DurationPill> = {
  title: 'Components/DurationPill',
  component: DurationPill,
  argTypes: { status: { control: 'select', options: ['paused', 'completed', 'live'] } },
};

export const Paused: Story = { args: { seconds: 60, status: 'paused' } };
export const Completed: Story = { args: { seconds: 120, status: 'completed' } };
export const Live: Story = { args: { seconds: 42, status: 'live' } };

export default meta;
