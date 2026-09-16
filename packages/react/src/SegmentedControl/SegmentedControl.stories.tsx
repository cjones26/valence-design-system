import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentedControl } from './SegmentedControl';

const options = [
  { value: 'checkbox', label: 'Checkbox', icon: '☑' },
  { value: 'time', label: 'Timer', icon: '⏱' },
  { value: 'count', label: 'Counter', icon: '＋' },
];

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
};
export default meta;

type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = { args: { options, value: 'time', label: 'Goal type' } };
export const Disabled: Story = { args: { options, value: 'count', label: 'Goal type', disabled: true } };

function SegmentedControlPlayground() {
  const [value, setValue] = useState('time');
  return <SegmentedControl options={options} value={value} onChange={setValue} label="Goal type" />;
}
export const Playground: Story = { render: () => <SegmentedControlPlayground /> };
