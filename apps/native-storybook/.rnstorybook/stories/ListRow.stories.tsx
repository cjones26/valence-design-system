import type { Meta, StoryObj } from '@storybook/react-native';
import { Icon, ListRow } from '@valence/react-native';

const meta: Meta<typeof ListRow> = {
  title: 'Components/ListRow',
  component: ListRow,
};
export default meta;

type Story = StoryObj<typeof ListRow>;

export const Default: Story = {
  args: { icon: '💪', title: 'Pushups', subtitle: '40 / day · reminder 07:00', trailingIcon: (color) => <Icon name="chevron" size={14} color={color} /> },
};
export const Reordering: Story = {
  args: { icon: '💪', title: 'Pushups', subtitle: '40 / day · reminder 07:00', trailingIcon: (color) => <Icon name="menu" size={20} color={color} /> },
};
export const Archived: Story = {
  args: { icon: '💪', title: 'Pushups', subtitle: 'Stopped May 9', archived: true },
};
