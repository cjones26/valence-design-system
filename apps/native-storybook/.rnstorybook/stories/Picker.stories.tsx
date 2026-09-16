import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Picker } from '@valence/react-native';

const options = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

const meta: Meta<typeof Picker> = {
  title: 'Components/Picker',
  component: Picker,
};
export default meta;

type Story = StoryObj<typeof Picker>;

export const Default: Story = { args: { label: 'Frequency', options, value: 'weekly' } };
export const Placeholder: Story = { args: { label: 'Frequency', options, value: '', placeholder: 'Choose a frequency' } };
export const Error: Story = {
  args: { label: 'Frequency', options, value: '', placeholder: 'Choose a frequency', error: true, helperText: 'Choose a frequency.' },
};
export const Disabled: Story = { args: { label: 'Frequency', options, value: 'weekly', disabled: true } };

function PickerPlayground() {
  const [value, setValue] = useState('weekly');
  return <Picker label="Frequency" options={options} value={value} onChange={setValue} />;
}

export const Playground: Story = { render: () => <PickerPlayground /> };
