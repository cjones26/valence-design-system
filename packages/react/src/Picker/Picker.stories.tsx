import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';
import { Picker } from './Picker';

type Story = StoryObj<typeof Picker>;

const meta: Meta<typeof Picker> = {
  title: 'Components/Picker',
  component: Picker,
};
const options = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

const PickerPlayground = () => {
  const [value, setValue] = useState('weekly');

  return <Picker label="Frequency" options={options} value={value} onChange={setValue} />;
};

export const Default: Story = { args: { label: 'Frequency', options, value: 'weekly' } };

export const Placeholder: Story = {
  args: { label: 'Frequency', options, value: '', placeholder: 'Choose a frequency' },
};

export const Error: Story = {
  args: {
    label: 'Frequency',
    options,
    value: '',
    placeholder: 'Choose a frequency',
    error: true,
    helperText: 'Choose a frequency.',
  },
};

export const Disabled: Story = {
  args: { label: 'Frequency', options, value: 'weekly', disabled: true },
};

export const Playground: Story = {
  render: () => <PickerPlayground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('combobox', { name: 'Frequency' }));
  },
};

export default meta;
