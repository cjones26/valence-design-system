import type { Meta, StoryObj } from '@storybook/react-native';
import { Divider, ListRow, Surface } from '@valence/react-native';

const meta: Meta<typeof Surface> = { title: 'Components/Surface', component: Surface };
export default meta;
type Story = StoryObj<typeof Surface>;

export const Default: Story = {
  render: () => <Surface>Cloud backup content</Surface>,
};

function GroupedRowsExample() {
  return (
    <Surface>
      <ListRow grouped title="Cloud backup" subtitle="Back up your progress securely" />
      <Divider inset />
      <ListRow grouped title="Sync now" />
    </Surface>
  );
}

export const GroupedRows: Story = { render: () => <GroupedRowsExample /> };
