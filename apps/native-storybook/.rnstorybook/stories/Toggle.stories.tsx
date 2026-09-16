import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Toggle } from '@valence/react-native';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
};
export default meta;

type Story = StoryObj<typeof Toggle>;

export const Off: Story = { args: { label: 'Reminders', checked: false } };
export const On: Story = { args: { label: 'Reminders', checked: true } };
export const DisabledOff: Story = { args: { label: 'Reminders', checked: false, disabled: true } };
export const DisabledOn: Story = { args: { label: 'Reminders', checked: true, disabled: true } };

function TogglePlayground() {
  const [checked, setChecked] = useState(false);
  return <Toggle label="Reminders" checked={checked} onChange={setChecked} />;
}
export const Playground: Story = { render: () => <TogglePlayground /> };
