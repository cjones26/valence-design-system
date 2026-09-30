import { parseDate } from '@internationalized/date';
import type { DateValue } from '@internationalized/date';
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DatePicker as AriaDatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
  Text,
} from 'react-aria-components';
import type { DatePickerProps, DatePickerValue } from '@valencesoftwareio/types';
import { Icon } from '../Icon/Icon';
import { Typography } from '../Typography/Typography';
import styles from './DatePicker.module.css';

const DATE_VALUE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const isDatePickerValue = (value: string): value is DatePickerValue => {
  return DATE_VALUE_PATTERN.test(value);
};

const toDatePickerValue = (date: DateValue): DatePickerValue => {
  const value = date.toString();

  if (!isDatePickerValue(value)) {
    throw new RangeError(`Unsupported date value: ${value}`);
  }

  return value;
};

export const DatePicker = ({
  value,
  onChange,
  min,
  max,
  required,
  error,
  disabled,
  helperText,
  label,
}: DatePickerProps) => {
  const isDisabled = Boolean(disabled || !onChange);
  const canClear = Boolean(value && onChange && !required && !disabled);

  return (
    <AriaDatePicker
      className={styles.wrap}
      value={value ? parseDate(value) : null}
      minValue={min ? parseDate(min) : undefined}
      maxValue={max ? parseDate(max) : undefined}
      isDisabled={isDisabled}
      isRequired={required}
      isInvalid={error}
      onChange={(date) => onChange?.(date ? toDatePickerValue(date) : null)}
    >
      <Label className={styles.label}>
        <Typography variant="label">
          {label}
          {required ? ' *' : ''}
        </Typography>
      </Label>
      <div className={styles.controlRow}>
        <Group className={styles.group}>
          <DateInput className={styles.input}>
            {(segment) => <DateSegment className={styles.segment} segment={segment} />}
          </DateInput>
          <Button className={styles.trigger} aria-label={`Open ${label} calendar`}>
            <Icon name="calendar" size={18} />
          </Button>
        </Group>
        {canClear && (
          <button
            type="button"
            className={styles.clear}
            aria-label={`Clear ${label}`}
            onClick={() => onChange?.(null)}
          >
            <Icon name="close" size={16} />
          </button>
        )}
      </div>
      {helperText && (
        <Text slot="description" className={`${styles.helper} ${error ? styles.helperError : ''}`}>
          {helperText}
        </Text>
      )}
      <Popover className={styles.popover} placement="bottom start">
        <Dialog className={styles.dialog}>
          <Calendar>
            <header className={styles.calendarHeader}>
              <Button slot="previous" className={styles.navigation} aria-label="Previous month">
                <Icon name="chevron" size={16} />
              </Button>
              <Heading className={styles.heading} />
              <Button
                slot="next"
                className={`${styles.navigation} ${styles.next}`}
                aria-label="Next month"
              >
                <Icon name="chevron" size={16} />
              </Button>
            </header>
            <CalendarGrid className={styles.grid}>
              <CalendarGridHeader>
                {(day) => <CalendarHeaderCell className={styles.weekday}>{day}</CalendarHeaderCell>}
              </CalendarGridHeader>
              <CalendarGridBody>
                {(date) => <CalendarCell className={styles.cell} date={date} />}
              </CalendarGridBody>
            </CalendarGrid>
          </Calendar>
        </Dialog>
      </Popover>
    </AriaDatePicker>
  );
};
