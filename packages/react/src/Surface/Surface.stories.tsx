import type { Meta, StoryObj } from '@storybook/react-vite';
import { Surface } from './Surface';
import { ListRow } from '../ListRow/ListRow';
import { Divider } from '../Divider/Divider';

const meta: Meta<typeof Surface> = { title: 'Components/Surface', component: Surface };
export default meta;
type Story = StoryObj<typeof Surface>;

export const Default: Story = {
  render: () => (
    <Surface>
      <div style={{ padding: 14 }}>Cloud backup content</div>
    </Surface>
  ),
};

export const GroupedRows: Story = {
  render: () => (
    <Surface>
      <ListRow grouped title="Cloud backup" subtitle="Back up your progress securely" />
      <Divider inset />
      <ListRow grouped title="Sync now" />
    </Surface>
  ),
};
