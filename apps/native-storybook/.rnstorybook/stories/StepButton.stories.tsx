import type { Meta, StoryObj } from '@storybook/react-native';
import { StepButton } from '@valence/react-native';

type Story = StoryObj<typeof StepButton>;

const meta: Meta<typeof StepButton> = {
  title: 'Components/StepButton',
  component: StepButton,
  args: { onPress: () => undefined },
  argTypes: { tone: { control: 'select', options: ['positive', 'negative'] } },
};

export const Positive: Story = { args: { label: '+5', tone: 'positive' } };
export const Negative: Story = { args: { label: '−5', tone: 'negative' } };
export const Disabled: Story = { args: { label: '+5', tone: 'positive', disabled: true } };

export default meta;
