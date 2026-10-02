import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { AlertDialog, Button } from '@valencesoftwareio/react-native';

type Story = StoryObj<typeof AlertDialog>;

const meta: Meta<typeof AlertDialog> = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
};

const AlertDialogExample = ({ danger = false }: { danger?: boolean }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button kind={danger ? 'danger' : 'primary'} onPress={() => setOpen(true)}>
        Open confirmation
      </Button>
      <AlertDialog
        open={open}
        title="Confirm change"
        description="This action cannot be undone."
        confirmLabel="Continue"
        cancelLabel="Cancel"
        danger={danger}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      />
    </>
  );
};

export const Default: Story = { render: () => <AlertDialogExample /> };

export const Danger: Story = { render: () => <AlertDialogExample danger /> };

export default meta;
