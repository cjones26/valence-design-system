import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentedControl } from './SegmentedControl';

type Story = StoryObj<typeof SegmentedControl>;

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
};

const options = [
  { value: 'checkbox', label: 'Checkbox', icon: '☑' },
  { value: 'time', label: 'Timer', icon: '⏱' },
  { value: 'count', label: 'Counter', icon: '＋' },
];

function SegmentedControlPlayground() {
  const [value, setValue] = useState('time');
  return <SegmentedControl options={options} value={value} onChange={setValue} label="Goal type" />;
}

export const Default: Story = { args: { options, value: 'time', label: 'Goal type' } };
export const Disabled: Story = {
  args: { options, value: 'count', label: 'Goal type', disabled: true },
};
export const Playground: Story = { render: () => <SegmentedControlPlayground /> };

export default meta;
