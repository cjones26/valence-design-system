import { Pressable, View } from 'react-native';
import type { AccordionProps } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { Icon } from '../Icon/Icon';
import { Typography } from '../Typography/Typography';
import { GEIST } from '../fonts';
import { NativeContent } from '../NativeContent';

export const Accordion = ({ title, expanded, onChange, children }: AccordionProps) => {
  const theme = useTheme();

  return (
    <View>
      <Pressable
        disabled={!onChange}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        accessibilityLabel={title}
        onPress={() => onChange?.(!expanded)}
        style={{
          minHeight: theme.control_minimum_target,
          paddingVertical: theme.spacing_md,
          paddingHorizontal: 14,
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: 10,
        }}
      >
        <Typography variant="body" style={{ flex: 1, ...GEIST.semibold }}>
          {title}
        </Typography>
        <View style={{ marginTop: 3, transform: [{ rotate: expanded ? '-90deg' : '90deg' }] }}>
          <Icon name="chevron" size={14} color={theme.color_text_secondary} />
        </View>
      </Pressable>
      {expanded && (
        <View style={{ paddingStart: 14, paddingEnd: 46, paddingBottom: theme.spacing_md }}>
          <NativeContent color={theme.color_text_secondary}>{children}</NativeContent>
        </View>
      )}
    </View>
  );
};
