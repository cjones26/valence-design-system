import type { Preview } from '@storybook/react-native';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Picker, ThemeProvider } from '@valence/react-native';
import { useValenceFonts } from '@valence/react-native/useValenceFonts';
import { themes, type ThemeMode, type ThemePreset } from '@valence/tokens';

const PRESETS: ThemePreset[] = [
  'hi-vis',
  'sea-glass',
  'bauhaus',
  'earthy',
  'tropical',
  'sunset-berry',
  'bodega',
  'indigo-pop',
];

const PRESET_OPTIONS = PRESETS.map((value) => ({ value, label: value }));

const ValenceDecorator = ({ children }: { children: React.ReactNode }) => {
  const fontsLoaded = useValenceFonts();
  const [preset, setPreset] = useState<ThemePreset>('hi-vis');
  const [mode, setMode] = useState<ThemeMode>('light');
  const theme = themes[preset][mode];

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider preset={preset} mode={mode}>
          <View style={{ flex: 1, backgroundColor: theme.color_background_primary }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                gap: 8,
                padding: 8,
                backgroundColor: theme.color_background_raised,
                borderBottomWidth: 1,
                borderBottomColor: theme.color_border_primary,
              }}
            >
              <View style={{ flex: 1 }}>
                <Picker
                  label="Theme"
                  options={PRESET_OPTIONS}
                  value={preset}
                  onChange={(value) => {
                    const nextPreset = PRESETS.find((option) => option === value);
                    if (nextPreset) {
                      setPreset(nextPreset);
                    }
                  }}
                />
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Color mode: ${mode}. Switch to ${mode === 'light' ? 'dark' : 'light'} mode.`}
                onPress={() => setMode(mode === 'light' ? 'dark' : 'light')}
                style={{
                  width: theme.control_field_height,
                  height: theme.control_field_height,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: theme.color_border_control,
                  borderRadius: theme.radius_control,
                }}
              >
                <Text style={{ color: theme.color_text_primary, fontSize: 22 }}>
                  {mode === 'light' ? '☀' : '☾'}
                </Text>
              </Pressable>
            </View>
            <View style={{ flex: 1, padding: 16 }}>{children}</View>
          </View>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default {
  decorators: [
    (Story) => (
      <ValenceDecorator>
        <Story />
      </ValenceDecorator>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
} satisfies Preview;
