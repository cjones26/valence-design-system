import type { Meta, StoryObj } from '@storybook/react-vite';
import { ICON_NAMES } from '@valence/types';
import { Icon } from './Icon';

type Story = StoryObj<typeof Icon>;

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  argTypes: { name: { control: 'select', options: ICON_NAMES } },
};

export const Default: Story = { args: { name: 'check', size: 64, color: '#0c0c0c' } };

export const AllGlyphs: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32 }}>
      {ICON_NAMES.map((name) => (
        <div key={name} style={{ textAlign: 'center' }}>
          <Icon name={name} size={48} color="#0c0c0c" />
          <div style={{ fontSize: 12, marginTop: 8 }}>{name}</div>
        </div>
      ))}
    </div>
  ),
};

export default meta;
