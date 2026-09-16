import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { SearchField } from '@valence/react-native';

const meta: Meta<typeof SearchField> = { title: 'Components/SearchField', component: SearchField };
export default meta;
type Story = StoryObj<typeof SearchField>;

function SearchExample() {
  const [value, setValue] = useState('');
  return <SearchField label="Search documentation" placeholder="Search the docs" value={value} onChangeText={setValue} />;
}

export const Default: Story = { render: () => <SearchExample /> };
export const Disabled: Story = { args: { label: 'Search documentation', value: '', placeholder: 'Search the docs', disabled: true } };
