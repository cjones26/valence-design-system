import type { Meta, StoryObj } from '@storybook/react-native';
import { Divider } from '@valence/react-native';

const meta: Meta<typeof Divider> = { title: 'Components/Divider', component: Divider };
export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {};
export const Inset: Story = { args: { inset: true } };
