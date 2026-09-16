import { useEffect, useRef } from 'react';
import { Animated, Easing, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import type { DurationPillProps } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { alpha } from '../colorMix';
import { GEIST } from '../fonts';
import { useReduceMotion } from '../useReduceMotion';

function formatDuration(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds)) return '—:—';
  const total = Math.max(0, Math.round(totalSeconds));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function DurationPill({ seconds, status = 'paused' }: DurationPillProps) {
  const theme = useTheme();
  const pulse = useRef(new Animated.Value(1)).current;
  const reduceMotion = useReduceMotion();
  const duration = formatDuration(seconds);

  useEffect(() => {
    if (status !== 'live' || reduceMotion) {
      pulse.setValue(1);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 0.7, duration: 700, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 700, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [status, reduceMotion, pulse]);

  const { bg, fg } =
    status === 'completed'
      ? { bg: alpha(theme.color_state_positive, 0.16), fg: theme.color_text_primary }
      : status === 'live'
        ? { bg: alpha(theme.color_state_yellow, 0.22), fg: theme.color_text_primary }
        : { bg: alpha(theme.color_text_primary, 0.06), fg: theme.color_text_secondary };

  return (
    <Animated.View
      accessible
      accessibilityLabel={`${status}, ${duration}`}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing_xs,
        paddingVertical: 2,
        paddingHorizontal: theme.spacing_sm,
        borderRadius: theme.radius_pill,
        backgroundColor: bg,
        opacity: status === 'live' ? pulse : 1,
      }}
    >
      <Svg width={8} height={8} viewBox="0 0 8 8">
        <Path d="M1.5 1l5 3-5 3z" fill={fg} />
      </Svg>
      <Text
        style={{
          fontSize: theme.type_eyebrow_size,
          ...GEIST.monoSemibold,
          color: fg,
        }}
      >
        {duration}
      </Text>
    </Animated.View>
  );
}
