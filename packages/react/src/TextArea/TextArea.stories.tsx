import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';
import { TextArea } from './TextArea';

type Story = StoryObj<typeof TextArea>;

const meta: Meta<typeof TextArea> = { title: 'Components/TextArea', component: TextArea };

interface TextAreaExampleProps {
  error?: boolean;
  disabled?: boolean;
}

const TextAreaExample = ({ error = false, disabled = false }: TextAreaExampleProps) => {
  const [value, setValue] = useState('');

  return (
    <TextArea
      label="Notes"
      value={value}
      placeholder="Add a note"
      helperText={error ? 'Enter at least ten characters.' : 'Optional'}
      error={error}
      disabled={disabled}
      onChangeText={setValue}
    />
  );
};

export const Default: Story = {
  render: () => <TextAreaExample />,
};

export const Playground: Story = {
  render: () => <TextAreaExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('textbox', { name: 'Notes' }));
  },
};

export const Error: Story = { render: () => <TextAreaExample error /> };

export const Disabled: Story = { render: () => <TextAreaExample disabled /> };

export default meta;
