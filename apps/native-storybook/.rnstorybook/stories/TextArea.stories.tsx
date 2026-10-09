import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { TextArea } from '@valencesoftwareio/react-native';

type Story = StoryObj<typeof TextArea>;

const meta: Meta<typeof TextArea> = { title: 'Components/TextArea', component: TextArea };

const TextAreaExample = ({
  error = false,
  disabled = false,
}: {
  error?: boolean;
  disabled?: boolean;
}) => {
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

export const Default: Story = { render: () => <TextAreaExample /> };

export const Error: Story = { render: () => <TextAreaExample error /> };

export const Disabled: Story = { render: () => <TextAreaExample disabled /> };

export const Playground: Story = { render: () => <TextAreaExample /> };

export default meta;
