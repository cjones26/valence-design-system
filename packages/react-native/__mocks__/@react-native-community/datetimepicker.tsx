import { Pressable, Text } from 'react-native';

export const DateTimePickerAndroid = { open: jest.fn() };

const DateTimePicker = ({
  onChange,
}: {
  onChange?: (event: { type: string }, date?: Date) => void;
}) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Native date picker"
      onPress={() => onChange?.({ type: 'set' }, new Date(2026, 9, 15, 12))}
    >
      <Text>Native date picker</Text>
    </Pressable>
  );
};

export default DateTimePicker;
