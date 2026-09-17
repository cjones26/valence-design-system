import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Icon, SegmentedControl } from '@valence/react-native';

type Story = StoryObj<typeof SegmentedControl>;

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
};
const options = [
  {
    value: 'checkbox',
    label: 'Checkbox',
    icon: (color: string) => <Icon name="check" color={color} />,
  },
  { value: 'time', label: 'Timer', icon: (color: string) => <Icon name="timer" color={color} /> },
  {
    value: 'count',
    label: 'Counter',
    icon: (color: string) => <Icon name="counter" color={color} />,
  },
];

const SegmentedControlPlayground = () => {
  const [value, setValue] = useState('time');

  return <SegmentedControl options={options} value={value} onChange={setValue} label="Goal type" />;
};

export const Default: Story = { args: { options, value: 'time', label: 'Goal type' } };

export const Disabled: Story = {
  args: { options, value: 'count', label: 'Goal type', disabled: true },
};

export const Playground: Story = { render: () => <SegmentedControlPlayground /> };

export default meta;
