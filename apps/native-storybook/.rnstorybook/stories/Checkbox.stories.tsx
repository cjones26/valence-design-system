import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Checkbox } from '@valence/react-native';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = { args: { label: 'Cardio', checked: false } };
export const Checked: Story = { args: { label: 'Cardio', checked: true } };
export const Disabled: Story = { args: { label: 'Cardio', checked: false, disabled: true } };
export const DisabledChecked: Story = { args: { label: 'Cardio', checked: true, disabled: true } };

function CheckboxPlayground() {
  const [checked, setChecked] = useState(false);
  return <Checkbox label="Cardio" checked={checked} onChange={setChecked} />;
}
export const Playground: Story = { render: () => <CheckboxPlayground /> };
