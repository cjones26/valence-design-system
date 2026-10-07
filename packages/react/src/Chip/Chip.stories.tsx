import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from '../Icon/Icon';
import { Chip } from './Chip';

type Story = StoryObj<typeof Chip>;

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  args: { onPress: () => undefined },
};

const icon = (color: string) => <Icon name="activity" color={color} />;

export const Default: Story = { args: { children: 'Pushups', icon } };

export const Selected: Story = { args: { children: 'Pushups', icon, selected: true } };

export const Disabled: Story = { args: { children: 'Pushups', icon, disabled: true } };

export default meta;
