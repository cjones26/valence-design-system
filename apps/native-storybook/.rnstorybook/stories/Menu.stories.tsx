import type { Meta, StoryObj } from '@storybook/react-native';
import { Icon, Menu } from '@valencesoftwareio/react-native';

type Story = StoryObj<typeof Menu>;

const meta: Meta<typeof Menu> = { title: 'Components/Menu', component: Menu };
const items = [
  { value: 'edit', label: 'Edit', icon: (color: string) => <Icon name="edit" color={color} /> },
  { value: 'archive', label: 'Archive' },
  { value: 'delete', label: 'Delete', danger: true },
];

export const Default: Story = { args: { label: 'Actions', items, onAction: () => undefined } };

export const Disabled: Story = {
  args: { label: 'Actions', items, disabled: true, onAction: () => undefined },
};

export default meta;
