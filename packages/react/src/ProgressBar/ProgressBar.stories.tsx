import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar';

type Story = StoryObj<typeof ProgressBar>;

const meta: Meta<typeof ProgressBar> = { title: 'Components/ProgressBar', component: ProgressBar };

export const Default: Story = { args: { label: 'Daily goal progress', value: 45, max: 100 } };
export const Complete: Story = { args: { label: 'Daily goal progress', value: 100, max: 100 } };

export default meta;
