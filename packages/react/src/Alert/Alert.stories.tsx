import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';

type Story = StoryObj<typeof Alert>;

const meta: Meta<typeof Alert> = { title: 'Components/Alert', component: Alert };

export const Default: Story = {
  args: { title: 'Visual report canary', children: 'This intentional change must fail.' },
};

export const Success: Story = {
  args: { tone: 'success', title: 'Saved', children: 'Your changes were saved.' },
};

export const Warning: Story = {
  args: { tone: 'warning', title: 'Review required', children: 'Check this value before saving.' },
};

export const Danger: Story = {
  args: { tone: 'danger', title: 'Unable to save', children: 'Try again in a moment.' },
};

export default meta;
