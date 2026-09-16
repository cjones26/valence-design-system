import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
};
export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = { args: { size: 14, color: '#0c0c0c' } };
export const Large: Story = { args: { size: 32, color: '#0c0c0c' } };
