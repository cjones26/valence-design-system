import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BottomSheet } from './BottomSheet';
import { Button } from '../Button/Button';

type Story = StoryObj<typeof BottomSheet>;

const meta: Meta<typeof BottomSheet> = { title: 'Components/BottomSheet', component: BottomSheet };

function BottomSheetExample() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onPress={() => setOpen(true)}>Choose repeat schedule</Button>
      <BottomSheet open={open} title="Repeat" onClose={() => setOpen(false)}>
        Choose which days this goal repeats.
      </BottomSheet>
    </>
  );
}

export const Default: Story = { render: () => <BottomSheetExample /> };

export default meta;
