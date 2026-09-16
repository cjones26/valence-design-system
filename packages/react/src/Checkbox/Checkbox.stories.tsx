import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

type Story = StoryObj<typeof Checkbox>;

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
};

function CheckboxPlayground() {
  const [checked, setChecked] = useState(false);
  return <Checkbox label="Cardio" checked={checked} onChange={setChecked} />;
}

export const Unchecked: Story = { args: { label: 'Cardio', checked: false } };
export const Checked: Story = { args: { label: 'Cardio', checked: true } };
export const Disabled: Story = { args: { label: 'Cardio', checked: false, disabled: true } };
export const DisabledChecked: Story = { args: { label: 'Cardio', checked: true, disabled: true } };
export const Playground: Story = { render: () => <CheckboxPlayground /> };

export default meta;
