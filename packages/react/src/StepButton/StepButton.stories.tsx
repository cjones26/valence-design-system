import type { Meta, StoryObj } from '@storybook/react-vite';
import { StepButton } from './StepButton';

const meta: Meta<typeof StepButton> = {
  title: 'Components/StepButton',
  component: StepButton,
  args: { onPress: () => undefined },
  argTypes: { tone: { control: 'select', options: ['positive', 'negative'] } },
};
export default meta;

type Story = StoryObj<typeof StepButton>;

export const Positive: Story = { args: { label: '+5', tone: 'positive' } };
export const Negative: Story = { args: { label: '−5', tone: 'negative' } };
export const Disabled: Story = { args: { label: '+5', tone: 'positive', disabled: true } };
