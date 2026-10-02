import type { Meta, StoryObj } from '@storybook/react-native';
import { Link } from '@valencesoftwareio/react-native';

type Story = StoryObj<typeof Link>;

const meta: Meta<typeof Link> = { title: 'Components/Link', component: Link };

export const Default: Story = { args: { href: 'https://example.com', children: 'View details' } };

export const Disabled: Story = {
  args: { href: 'https://example.com', children: 'View details', disabled: true },
};

export default meta;
