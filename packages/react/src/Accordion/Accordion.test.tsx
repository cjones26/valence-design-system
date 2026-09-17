import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from './Accordion';

const AccordionExample = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion title="Cloud backup" expanded={expanded} onChange={setExpanded}>
      Backup details
    </Accordion>
  );
};

describe('<Accordion />', () => {
  const user = userEvent.setup();

  it('starts collapsed with its content hidden', () => {
    render(<AccordionExample />);

    const trigger = screen.getByRole('button', { name: 'Cloud backup' });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Backup details')).not.toBeInTheDocument();
  });

  it('expands and reveals its content when clicked', async () => {
    render(<AccordionExample />);

    const trigger = screen.getByRole('button', { name: 'Cloud backup' });

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Backup details')).toBeInTheDocument();
  });
});
