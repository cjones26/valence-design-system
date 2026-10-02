import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from '../Icon/Icon';
import { IconButton } from './IconButton';

type Story = StoryObj<typeof IconButton>;

const meta: Meta<typeof IconButton> = { title: 'Components/IconButton', component: IconButton };

export const Default: Story = {
  args: {
    label: 'Settings',
    icon: (color) => <Icon name="settings" color={color} />,
    onPress: () => undefined,
  },
};

export const Danger: Story = {
  args: {
    ...Default.args,
    label: 'Delete',
    tone: 'danger',
    icon: (color) => <Icon name="close" color={color} />,
  },
};

export const Disabled: Story = { args: { ...Default.args, disabled: true } };

export default meta;
