import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { TYPOGRAPHY_VARIANTS } from '@valence/types';
import { Typography } from '@valence/react-native';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
};
export default meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = { args: { variant: 'body', children: 'The quick brown fox' } };

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      {TYPOGRAPHY_VARIANTS.map((variant) => (
        <Typography key={variant} variant={variant}>
          {variant} — The quick brown fox
        </Typography>
      ))}
    </View>
  ),
};
