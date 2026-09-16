import { View, Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { ICON_NAMES } from '@valence/types';
import { Icon } from '@valence/react-native';

type Story = StoryObj<typeof Icon>;

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  argTypes: { name: { control: 'select', options: ICON_NAMES } },
};

export const Default: Story = { args: { name: 'check', size: 48, color: '#0c0c0c' } };

export const AllGlyphs: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 24 }}>
      {ICON_NAMES.map((name) => (
        <View key={name} style={{ alignItems: 'center' }}>
          <Icon name={name} size={32} color="#0c0c0c" />
          <Text style={{ fontSize: 11, marginTop: 6 }}>{name}</Text>
        </View>
      ))}
    </View>
  ),
};

export default meta;
