import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';
import { SearchField } from './SearchField';

type Story = StoryObj<typeof SearchField>;

const meta: Meta<typeof SearchField> = { title: 'Components/SearchField', component: SearchField };

const SearchExample = () => {
  const [value, setValue] = useState('');

  return (
    <SearchField
      label="Search documentation"
      placeholder="Search the docs"
      value={value}
      onChangeText={setValue}
    />
  );
};

export const Default: Story = {
  render: () => <SearchExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('searchbox', { name: 'Search documentation' }));
  },
};

export const Disabled: Story = {
  args: {
    label: 'Search documentation',
    value: '',
    placeholder: 'Search the docs',
    disabled: true,
  },
};

export default meta;
