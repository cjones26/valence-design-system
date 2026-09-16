import type { Meta, StoryObj } from '@storybook/react-vite';
import { DeltaPill } from './DeltaPill';

const meta: Meta<typeof DeltaPill> = {
  title: 'Components/DeltaPill',
  component: DeltaPill,
};
export default meta;

type Story = StoryObj<typeof DeltaPill>;

export const Positive: Story = { args: { value: 10 } };
export const Negative: Story = { args: { value: -3 } };
export const PositiveWithUnit: Story = { args: { value: 30, unit: 's' } };
export const NegativeWithUnit: Story = { args: { value: -30, unit: 's' } };
export const Zero: Story = { args: { value: 0 } };
