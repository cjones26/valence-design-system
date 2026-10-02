import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './Link';

type Story = StoryObj<typeof Link>;

const meta: Meta<typeof Link> = { title: 'Components/Link', component: Link };

export const Default: Story = { args: { href: '#details', children: 'View details' } };

export const Disabled: Story = {
  args: { href: '#details', children: 'View details', disabled: true },
};

export default meta;
