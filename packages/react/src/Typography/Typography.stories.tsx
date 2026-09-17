import type { Meta, StoryObj } from '@storybook/react-vite';
import { TYPOGRAPHY_VARIANTS } from '@valence/types';
import { Typography } from './Typography';

type Story = StoryObj<typeof Typography>;

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  argTypes: { variant: { control: 'select', options: TYPOGRAPHY_VARIANTS } },
};

export const Default: Story = { args: { variant: 'body', children: 'The quick brown fox' } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {TYPOGRAPHY_VARIANTS.map((variant) => (
        <Typography key={variant} variant={variant}>
          {variant} — The quick brown fox
        </Typography>
      ))}
    </div>
  ),
};

export default meta;
