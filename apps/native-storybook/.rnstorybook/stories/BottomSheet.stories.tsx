import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { BottomSheet, Button, Typography } from '@valence/react-native';

type Story = StoryObj<typeof BottomSheet>;

const meta: Meta<typeof BottomSheet> = { title: 'Components/BottomSheet', component: BottomSheet };

const BottomSheetExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setOpen(true)}>Choose repeat schedule</Button>
      <BottomSheet open={open} title="Repeat" onClose={() => setOpen(false)}>
        <Typography variant="body">Choose which days this goal repeats.</Typography>
      </BottomSheet>
    </>
  );
};

export const Default: Story = { render: () => <BottomSheetExample /> };

export default meta;
