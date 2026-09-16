import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberField } from './NumberField';

type Story = StoryObj<typeof NumberField>;

const meta: Meta<typeof NumberField> = {
  title: 'Components/NumberField',
  component: NumberField,
};

function NumberFieldPlayground() {
  const [value, setValue] = useState(40);
  return <NumberField label="Pushups" value={value} min={0} max={999} onChange={setValue} />;
}

export const Default: Story = { args: { label: 'Pushups', value: 40 } };
export const AtMin: Story = { args: { label: 'Pushups', value: 0, min: 0, max: 999 } };
export const AtMax: Story = { args: { label: 'Pushups', value: 999, min: 0, max: 999 } };
export const Error: Story = { args: { label: 'Pushups', value: 40, error: true } };
export const Disabled: Story = { args: { label: 'Pushups', value: 40, disabled: true } };
export const Playground: Story = { render: () => <NumberFieldPlayground /> };

export default meta;
