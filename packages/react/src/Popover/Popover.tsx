import {
  Button as AriaButton,
  Dialog,
  DialogTrigger,
  Popover as AriaPopover,
} from 'react-aria-components';
import type { PopoverProps } from '@valencesoftwareio/types';
import styles from './Popover.module.css';

export const Popover = ({ open, trigger, onOpenChange, children, label }: PopoverProps) => {
  return (
    <DialogTrigger isOpen={open} onOpenChange={onOpenChange}>
      <AriaButton className={styles.trigger} isDisabled={!onOpenChange} aria-label={label}>
        {trigger}
      </AriaButton>
      <AriaPopover className={styles.popover} placement="bottom start">
        <Dialog className={styles.dialog} aria-label={label}>
          {children}
        </Dialog>
      </AriaPopover>
    </DialogTrigger>
  );
};
