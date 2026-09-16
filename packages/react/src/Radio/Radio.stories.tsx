import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';

// Mutual exclusivity across multiple Radios is RadioGroup's job (see
// Components/RadioGroup) — these stories cover Radio's own states in
// isolation.
const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
};
export default meta;

type Story = StoryObj<typeof Radio>;

export const Off: Story = { args: { label: 'Timer', checked: false } };
export const On: Story = { args: { label: 'Timer', checked: true } };
export const DisabledOff: Story = { args: { label: 'Timer', checked: false, disabled: true } };
export const DisabledOn: Story = { args: { label: 'Timer', checked: true, disabled: true } };
