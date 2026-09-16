import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import type { SpinnerProps } from '@valence/types';
import { useTheme } from '../ThemeProvider/ThemeProvider';
import { useReduceMotion } from '../useReduceMotion';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export function Spinner({ size = 14, color }: SpinnerProps) {
  const theme = useTheme();
  const strokeColor = color ?? theme.color_text_primary;
  const spin = useRef(new Animated.Value(0)).current;
  const reduceMotion = useReduceMotion();

  useEffect(() => {
    if (reduceMotion) {
      spin.stopAnimation();
      spin.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [reduceMotion, spin]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <AnimatedSvg width={size} height={size} viewBox="0 0 24 24" style={{ transform: [{ rotate }] }}>
      <Circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke={strokeColor}
        strokeOpacity={0.35}
        strokeWidth={3}
      />
      <Path
        d="M21 12a9 9 0 0 0-9-9"
        fill="none"
        stroke={strokeColor}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </AnimatedSvg>
  );
}
