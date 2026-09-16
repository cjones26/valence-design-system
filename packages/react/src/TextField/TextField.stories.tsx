import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './TextField';

type Story = StoryObj<typeof TextField>;

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
};

function TextFieldPlayground() {
  const [value, setValue] = useState('');

  return (
    <TextField
      label="Goal name"
      placeholder="What do you want to track?"
      value={value}
      onChangeText={setValue}
    />
  );
}

export const Empty: Story = {
  args: { label: 'Goal name', placeholder: 'What do you want to track?' },
};

export const Filled: Story = { args: { label: 'Goal name', value: 'Pushups' } };

export const Error: Story = {
  args: {
    label: 'Goal name',
    value: '',
    placeholder: 'What do you want to track?',
    error: true,
    helperText: "Goal name can't be empty.",
  },
};

export const Disabled: Story = { args: { label: 'Goal name', value: 'Pushups', disabled: true } };

export const WithHelper: Story = {
  args: {
    label: 'Goal name',
    value: 'Pushups',
    helperText: 'Shown under the field as supportive text.',
  },
};

export const Playground: Story = { render: () => <TextFieldPlayground /> };

export default meta;
