import { useState } from 'react';
import DateTimePicker, {
  DateTimePickerAndroid,
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Modal, Platform, Pressable, View } from 'react-native';
import type { DatePickerProps, DatePickerValue } from '@valencesoftwareio/types';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { Typography } from '../Typography/Typography';

const DATE_VALUE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

const isDatePickerValue = (value: string): value is DatePickerValue => {
  return DATE_VALUE_PATTERN.test(value);
};

const parseValue = (value: DatePickerValue): Date => {
  const match = DATE_VALUE_PATTERN.exec(value);

  if (!match) {
    throw new RangeError(`Unsupported date value: ${value}`);
  }

  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12);

  if (
    date.getFullYear() !== Number(match[1]) ||
    date.getMonth() !== Number(match[2]) - 1 ||
    date.getDate() !== Number(match[3])
  ) {
    throw new RangeError(`Unsupported date value: ${value}`);
  }

  return date;
};

const serializeValue = (date: Date): DatePickerValue => {
  const year = String(date.getFullYear()).padStart(4, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const value = `${year}-${month}-${day}`;

  if (!isDatePickerValue(value)) {
    throw new RangeError(`Unsupported date value: ${value}`);
  }

  return value;
};

const initialDate = (
  value: DatePickerValue | null,
  min?: DatePickerValue,
  max?: DatePickerValue,
) => {
  let date = value ? parseValue(value) : new Date();

  if (min && date < parseValue(min)) {
    date = parseValue(min);
  }

  if (max && date > parseValue(max)) {
    date = parseValue(max);
  }

  return date;
};

const formatValue = (value: DatePickerValue) => {
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(parseValue(value));
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
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [draftDate, setDraftDate] = useState(() => initialDate(value, min, max));
  const isDisabled = Boolean(disabled || !onChange);
  const canClear = Boolean(value && onChange && !required && !disabled);
  const displayedValue = value ? formatValue(value) : 'Select date';
  const accessibilityHint = error ? `Invalid. ${helperText ?? ''}`.trim() : helperText;
  let borderColor = theme.colorBorderControl;

  if (focused || open) {
    borderColor = theme.colorBorderFocus;
  }

  if (error) {
    borderColor = theme.colorActionDangerText;
  }

  if (isDisabled) {
    borderColor = theme.colorBorderPrimary;
  }

  const handleNativeChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setDraftDate(date);
    }
  };

  const openPicker = () => {
    const nextDate = initialDate(value, min, max);

    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: nextDate,
        minimumDate: min ? parseValue(min) : undefined,
        maximumDate: max ? parseValue(max) : undefined,
        mode: 'date',
        onChange: (event, date) => {
          if (event.type === 'set' && date) {
            onChange?.(serializeValue(date));
          }
        },
      });

      return;
    }

    setDraftDate(nextDate);
    setOpen(true);
  };

  const commitDate = () => {
    onChange?.(serializeValue(draftDate));
    setOpen(false);
  };

  return (
    <View style={{ gap: 6 }}>
      <Typography variant="label" style={{ color: theme.colorTextPrimary }}>
        {label}
        {required ? ' *' : ''}
      </Typography>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <Pressable
          disabled={isDisabled}
          onPress={openPicker}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          accessibilityRole="button"
          accessibilityLabel={label}
          accessibilityHint={accessibilityHint}
          accessibilityValue={{ text: displayedValue }}
          accessibilityState={{ disabled: isDisabled }}
          style={{
            minHeight: theme.controlFieldHeight,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: theme.spacingMd,
            backgroundColor: isDisabled
              ? theme.colorBackgroundSubtle
              : theme.colorBackgroundPrimary,
            borderWidth: 1.5,
            borderColor,
            borderRadius: theme.radiusControl,
          }}
        >
          <Typography
            variant="bodyLg"
            style={{ color: value && !isDisabled ? theme.colorTextPrimary : theme.colorTextMuted }}
          >
            {displayedValue}
          </Typography>
          <Icon name="calendar" size={18} color={isDisabled ? theme.colorTextMuted : undefined} />
        </Pressable>
        {canClear && (
          <Pressable
            onPress={() => onChange?.(null)}
            accessibilityRole="button"
            accessibilityLabel={`Clear ${label}`}
            style={{
              width: theme.controlMinimumTarget,
              height: theme.controlMinimumTarget,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: theme.radiusControl,
            }}
          >
            <Icon name="close" size={16} color={theme.colorTextSecondary} />
          </Pressable>
        )}
      </View>
      {helperText && (
        <Typography
          variant="meta"
          style={{ color: error ? theme.colorActionDangerText : theme.colorTextReadable }}
        >
          {helperText}
        </Typography>
      )}
      {Platform.OS === 'ios' && (
        <Modal
          transparent
          animationType="fade"
          visible={open}
          onRequestClose={() => setOpen(false)}
        >
          <Pressable
            accessible={false}
            onPress={() => setOpen(false)}
            style={{
              flex: 1,
              justifyContent: 'center',
              padding: theme.spacingLg,
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
            }}
          >
            <Pressable
              accessible={false}
              accessibilityViewIsModal
              onPress={(event) => event.stopPropagation()}
              style={{
                padding: theme.spacingLg,
                gap: theme.spacingMd,
                backgroundColor: theme.colorBackgroundRaised,
                borderWidth: 1,
                borderColor: theme.colorBorderPrimary,
                borderRadius: theme.radiusControl,
              }}
            >
              <Typography variant="titleSm">{label}</Typography>
              <DateTimePicker
                value={draftDate}
                minimumDate={min ? parseValue(min) : undefined}
                maximumDate={max ? parseValue(max) : undefined}
                mode="date"
                display="inline"
                onChange={handleNativeChange}
              />
              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: theme.spacingSm }}
              >
                <Button kind="ghost" onPress={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onPress={commitDate}>Done</Button>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      )}
    </View>
  );
};
