import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Accordion, Surface, Typography } from '@valencesoftwareio/react-native';

type Story = StoryObj<typeof Accordion>;

const meta: Meta<typeof Accordion> = { title: 'Components/Accordion', component: Accordion };

const AccordionExample = ({ initiallyExpanded = false }: { initiallyExpanded?: boolean }) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);

  return (
    <Surface>
      <Accordion title="How does cloud backup work?" expanded={expanded} onChange={setExpanded}>
        <Typography variant="body">
          Your progress is encrypted and synchronized automatically.
        </Typography>
      </Accordion>
    </Surface>
  );
};

export const Default: Story = { render: () => <AccordionExample /> };

export const Expanded: Story = { render: () => <AccordionExample initiallyExpanded /> };

export default meta;
