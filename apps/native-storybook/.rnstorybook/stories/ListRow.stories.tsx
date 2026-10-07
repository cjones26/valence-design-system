import type { Meta, StoryObj } from '@storybook/react-native';
import { Icon, ListRow } from '@valencesoftwareio/react-native';

type Story = StoryObj<typeof ListRow>;

const meta: Meta<typeof ListRow> = {
  title: 'Components/ListRow',
  component: ListRow,
};

export const Default: Story = {
  args: {
    icon: (color) => <Icon name="activity" color={color} />,
    title: 'Pushups',
    subtitle: '40 / day · reminder 07:00',
    trailingIcon: (color) => <Icon name="chevron" size={14} color={color} />,
  },
};

export const Reordering: Story = {
  args: {
    icon: (color) => <Icon name="activity" color={color} />,
    title: 'Pushups',
    subtitle: '40 / day · reminder 07:00',
    trailingIcon: (color) => <Icon name="menu" size={20} color={color} />,
  },
};

export const Archived: Story = {
  args: {
    icon: (color) => <Icon name="activity" color={color} />,
    title: 'Pushups',
    subtitle: 'Stopped May 9',
    archived: true,
  },
};

export default meta;
