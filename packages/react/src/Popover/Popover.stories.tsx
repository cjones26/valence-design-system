import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from '../Icon/Icon';
import { Typography } from '../Typography/Typography';
import { Popover } from './Popover';

type Story = StoryObj<typeof Popover>;

const meta: Meta<typeof Popover> = { title: 'Components/Popover', component: Popover };

const PopoverExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      open={open}
      label="More information"
      trigger={<Icon name="settings" />}
      onOpenChange={setOpen}
    >
      <Typography variant="body">Additional contextual information.</Typography>
    </Popover>
  );
};

export const Default: Story = { render: () => <PopoverExample /> };

export default meta;
