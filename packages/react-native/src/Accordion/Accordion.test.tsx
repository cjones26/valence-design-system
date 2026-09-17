import { useState } from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
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

  it('starts collapsed with its content hidden', async () => {
    await render(<AccordionExample />);

    expect(
      screen.getByRole('button', { name: 'Cloud backup', expanded: false, disabled: false }),
    ).toBeOnTheScreen();
    expect(screen.queryByText('Backup details')).not.toBeOnTheScreen();
  });

  it('expands and reveals its content when pressed', async () => {
    await render(<AccordionExample />);

    const trigger = screen.getByRole('button', { name: 'Cloud backup' });

    await user.press(trigger);

    expect(
      screen.getByRole('button', { name: 'Cloud backup', expanded: true, disabled: false }),
    ).toBeOnTheScreen();
    expect(screen.getByText('Backup details')).toBeOnTheScreen();
  });

  it('renders primitive content nested in fragments and arrays', async () => {
    await render(
      <Accordion title="Cloud backup" expanded onChange={() => undefined}>
        <>{['Backup', ' details']}</>
      </Accordion>,
    );

    expect(screen.getByText('Backup')).toBeOnTheScreen();
    expect(screen.getByText(' details')).toBeOnTheScreen();
  });
});
