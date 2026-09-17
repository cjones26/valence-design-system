import { useEffect } from 'react';
import { View } from 'react-native';
import type { RadioGroupProps } from '@valence/types';
import { Radio } from '../Radio/Radio';
import { Typography } from '../Typography/Typography';
import { useTheme } from '../ThemeProvider/ThemeProvider';

export const RadioGroup = ({ options, value, onChange, disabled, label }: RadioGroupProps) => {
  const theme = useTheme();

  const hasDuplicateValues = new Set(options.map((opt) => opt.value)).size !== options.length;
  useEffect(() => {
    if (hasDuplicateValues) {
      console.error(
        'RadioGroup: "options" contains duplicate values, which makes selection ambiguous.',
      );
    }
  }, [hasDuplicateValues]);

  return (
    <View style={{ gap: 6 }}>
      <Typography variant="label" style={{ color: theme.color_text_secondary }}>
        {label}
      </Typography>
      <View accessibilityRole="radiogroup" accessibilityLabel={label}>
        {options.map((opt) => (
          <Radio
            key={opt.value}
            label={opt.label}
            checked={opt.value === value}
            disabled={disabled || !onChange}
            onChange={() => onChange?.(opt.value)}
          />
        ))}
      </View>
    </View>
  );
};
