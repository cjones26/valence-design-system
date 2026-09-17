import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './Slider';

type Story = StoryObj<typeof Slider>;

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
};

const SliderPlayground = () => {
  const [value, setValue] = useState(54);

  return <Slider label="Squat hold progress" value={value} max={120} onChange={setValue} />;
};

export const Rest: Story = { args: { label: 'Squat hold progress', value: 0, max: 120 } };

export const Mid: Story = { args: { label: 'Squat hold progress', value: 54, max: 120 } };

export const Complete: Story = { args: { label: 'Squat hold progress', value: 120, max: 120 } };

export const Disabled: Story = {
  args: { label: 'Squat hold progress', value: 54, max: 120, disabled: true },
};

export const Playground: Story = { render: () => <SliderPlayground /> };

export default meta;
