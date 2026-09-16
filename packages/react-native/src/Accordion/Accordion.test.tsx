import { useState } from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { Accordion } from './Accordion';

function AccordionExample() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion title="Cloud backup" expanded={expanded} onChange={setExpanded}>
      Backup details
    </Accordion>
  );
}

describe('<Accordion />', () => {
  it('exposes state and toggles its content', async () => {
    const user = userEvent.setup();
    await render(<AccordionExample />);
    const trigger = screen.getByRole('button', { name: 'Cloud backup' });

    expect(trigger.props.accessibilityState).toEqual(
      expect.objectContaining({ expanded: false, disabled: false }),
    );
    expect(screen.queryByText('Backup details')).not.toBeOnTheScreen();
    await user.press(trigger);
    expect(trigger.props.accessibilityState).toEqual(
      expect.objectContaining({ expanded: true, disabled: false }),
    );
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
