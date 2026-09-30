import type { Meta, StoryObj } from '@storybook/react-native';
import { Radio } from '@valence/react-native';

type Story = StoryObj<typeof Radio>;

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
};

export const Off: Story = { args: { label: 'Timer', checked: false } };

export const On: Story = { args: { label: 'Timer', checked: true } };

export const DisabledOff: Story = { args: { label: 'Timer', checked: false, disabled: true } };

export const DisabledOn: Story = { args: { label: 'Timer', checked: true, disabled: true } };

export default meta;
