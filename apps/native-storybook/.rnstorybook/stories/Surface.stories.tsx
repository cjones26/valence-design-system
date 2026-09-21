import type { Meta, StoryObj } from '@storybook/react-native';
import { Divider, ListRow, Surface, Typography } from '@valence/react-native';

type Story = StoryObj<typeof Surface>;

const meta: Meta<typeof Surface> = { title: 'Components/Surface', component: Surface };

const GroupedRowsExample = () => {
  return (
    <Surface>
      <ListRow grouped title="Cloud backup" subtitle="Back up your progress securely" />
      <Divider inset />
      <ListRow grouped title="Sync now" />
    </Surface>
  );
};

export const Default: Story = {
  render: () => (
    <Surface>
      <Typography variant="body">Cloud backup content</Typography>
    </Surface>
  ),
};

export const GroupedRows: Story = { render: () => <GroupedRowsExample /> };

export default meta;
