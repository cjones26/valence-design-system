import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

type Story = StoryObj<typeof Spinner>;

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
};

export const Default: Story = { args: { size: 14, color: '#0c0c0c' } };

export const Large: Story = { args: { size: 32, color: '#0c0c0c' } };

export default meta;
