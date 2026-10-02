import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Toast } from './Toast';

type Story = StoryObj<typeof Toast>;

const meta: Meta<typeof Toast> = { title: 'Components/Toast', component: Toast };

const ToastExample = ({ danger = false }: { danger?: boolean }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setOpen(true)}>Show toast</Button>
      <Toast
        open={open}
        tone={danger ? 'danger' : 'success'}
        message={danger ? 'Unable to save changes.' : 'Changes saved.'}
        duration={0}
        onDismiss={() => setOpen(false)}
      />
    </>
  );
};

export const Default: Story = { render: () => <ToastExample /> };

export const Danger: Story = { render: () => <ToastExample danger /> };

export default meta;
