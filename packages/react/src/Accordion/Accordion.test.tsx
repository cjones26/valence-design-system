import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from './Accordion';

function AccordionExample() {
  const [expanded, setExpanded] = useState(false);
  return <Accordion title="Cloud backup" expanded={expanded} onChange={setExpanded}>Backup details</Accordion>;
}

describe('<Accordion />', () => {
  it('exposes state and toggles its content', async () => {
    const user = userEvent.setup();
    render(<AccordionExample />);
    const trigger = screen.getByRole('button', { name: 'Cloud backup' });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Backup details')).not.toBeInTheDocument();
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Backup details')).toBeInTheDocument();
  });
});
