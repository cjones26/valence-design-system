import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { Divider, ListRow, Surface, Typography } from '@valencesoftwareio/react-native';

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
      <View style={{ padding: 14 }}>
        <Typography variant="body">Cloud backup content</Typography>
      </View>
    </Surface>
  ),
};

export const GroupedRows: Story = { render: () => <GroupedRowsExample /> };

export default meta;
