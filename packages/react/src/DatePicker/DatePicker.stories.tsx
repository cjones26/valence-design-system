import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';
import type { DatePickerValue } from '@valencesoftwareio/types';
import { DatePicker } from './DatePicker';

type Story = StoryObj<typeof DatePicker>;

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
};

const DatePickerPlayground = () => {
  const [value, setValue] = useState<DatePickerValue | null>('2026-09-30');

  return <DatePicker label="Due date" value={value} onChange={setValue} />;
};

export const Default: Story = { args: { label: 'Due date', value: '2026-09-30' } };

export const Empty: Story = { args: { label: 'Due date', value: null } };

export const Constrained: Story = {
  args: {
    label: 'Due date',
    value: '2026-09-30',
    min: '2026-09-15',
    max: '2026-10-15',
  },
};

export const Error: Story = {
  args: {
    label: 'Due date',
    value: null,
    error: true,
    helperText: 'Choose a due date.',
  },
};

export const Disabled: Story = {
  args: { label: 'Due date', value: '2026-09-30', disabled: true },
};

export const Playground: Story = {
  render: () => <DatePickerPlayground />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: /Open Due date calendar/ }));
  },
};

export default meta;
