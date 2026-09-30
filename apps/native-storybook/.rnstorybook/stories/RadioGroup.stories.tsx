import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { RadioGroup } from '@valence/react-native';

type Story = StoryObj<typeof RadioGroup>;

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
};
const options = [
  { value: 'timer', label: 'Timer' },
  { value: 'checkbox', label: 'Checkbox' },
];

const RadioGroupPlayground = () => {
  const [value, setValue] = useState('timer');

  return <RadioGroup options={options} value={value} onChange={setValue} label="Goal type" />;
};

export const Default: Story = { args: { options, value: 'timer', label: 'Goal type' } };

export const Disabled: Story = {
  args: { options, value: 'timer', label: 'Goal type', disabled: true },
};

export const Playground: Story = { render: () => <RadioGroupPlayground /> };

export default meta;
