import type { Meta, StoryObj } from '@storybook/react-native';
import { Divider } from '@valence/react-native';

type Story = StoryObj<typeof Divider>;

const meta: Meta<typeof Divider> = { title: 'Components/Divider', component: Divider };

export const Default: Story = {};

export const Inset: Story = { args: { inset: true } };

export default meta;
