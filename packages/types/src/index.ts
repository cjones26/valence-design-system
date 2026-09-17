import type { ReactNode } from 'react';

// Canonical interaction prop name across both platforms: React DOM has no
// `onPress`, React Native has no `onClick` — each platform implementation
// wires this to whatever's native there (click + Enter/Space activation on
// web, Pressable's onPress on native).
type Pressable = { onPress?: () => void };
type Disableable = { disabled?: boolean };
// Every input-like component requires an accessible name (WCAG 2.1 AA,
// 4.1.2 Name/Role/Value) — not optional, so a missing label fails to
// typecheck rather than shipping unlabeled.
type Labeled = { label: string };

export type ButtonKind = 'primary' | 'secondary' | 'ghost' | 'danger' | 'dangerConfirm' | 'pill';

export interface ButtonProps extends Pressable, Disableable {
  kind?: ButtonKind;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  children: ReactNode;
}

export interface StepButtonProps extends Pressable, Disableable {
  label: string;
  tone: 'positive' | 'negative';
}

export interface ChipProps extends Pressable, Disableable {
  selected?: boolean;
  icon?: IconSlot;
  children: ReactNode;
}

export interface DeltaPillProps {
  /** Rendered with neutral styling when 0, rather than positive/negative tone. */
  value: number;
  unit?: string;
}

export interface DurationPillProps {
  seconds: number;
  status?: 'paused' | 'completed' | 'live';
}

export interface StatusBadgeProps {
  status: 'success' | 'warning' | 'danger';
  children: ReactNode;
}

export interface TextFieldProps extends Disableable, Labeled {
  value: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
  inputMode?: 'text' | 'email' | 'numeric' | 'decimal' | 'tel' | 'url' | 'search' | 'none';
  autoComplete?:
    'off' | 'name' | 'email' | 'username' | 'current-password' | 'new-password' | 'tel' | 'url';
  secureTextEntry?: boolean;
  maxLength?: number;
  error?: boolean;
  helperText?: string;
}

export interface SearchFieldProps extends Disableable, Labeled {
  value: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
}

export interface PickerOption {
  value: string;
  label: string;
}

export interface PickerProps extends Disableable, Labeled {
  options: PickerOption[];
  value: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  helperText?: string;
}

export interface NumberFieldProps extends Disableable, Labeled {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  error?: boolean;
}

export interface ToggleProps extends Disableable, Labeled {
  checked: boolean;
  onChange?: (checked: boolean) => void;
}

export interface RadioProps extends Disableable, Labeled {
  checked: boolean;
  onChange?: () => void;
  /** Web-only: maps to the HTML radio input's `name` attribute for native
   * keyboard grouping. Native ignores this — grouping there comes from
   * controlled state instead. */
  name?: string;
}

export interface RadioOption {
  value: string;
  label: string;
}

// Grouping (mutual exclusivity) is composed here rather than left to the
// consumer wiring matching `name`s across independent Radios by hand — see
// SegmentedControlProps for the same pattern.
export interface RadioGroupProps extends Disableable, Labeled {
  options: RadioOption[];
  value: string;
  onChange?: (value: string) => void;
}

export interface CheckboxProps extends Disableable, Labeled {
  checked: boolean;
  onChange?: (checked: boolean) => void;
}

export interface SegmentedOption {
  value: string;
  label: string;
  icon?: IconSlot;
}

export interface SegmentedControlProps extends Disableable, Labeled {
  options: SegmentedOption[];
  value: string;
  onChange?: (value: string) => void;
}

export interface CardProps extends Pressable {
  status?: 'resting' | 'editing' | 'success' | 'skipped' | 'error';
  title: string;
  /** Non-text elements render directly on native — normal RN composition
   * rules apply, so raw text nested in an array/fragment still needs its
   * own Text/Typography wrapper; this isn't a Card-specific constraint. */
  children?: ReactNode;
  /** Accessible name for the Card's primary action. Defaults to title, plus
   * the children when they're plain text — the content is otherwise hidden
   * from assistive tech, so this is how that text stays reachable. */
  actionLabel?: string;
}

export interface SurfaceProps {
  children?: ReactNode;
}

export interface DividerProps {
  inset?: boolean;
}

export interface AccordionProps {
  title: string;
  expanded: boolean;
  onChange?: (expanded: boolean) => void;
  children?: ReactNode;
}

export interface BottomSheetProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children?: ReactNode;
}

export interface ListRowProps extends Pressable {
  icon?: IconSlot;
  title: string;
  subtitle?: string;
  /** Presentation-only icon displayed at the end of the row. */
  trailingIcon?: IconSlot;
  archived?: boolean;
  /** Removes standalone radius and elevation when rendered inside a Surface. */
  grouped?: boolean;
}

export interface SliderProps extends Disableable, Labeled {
  value: number;
  max: number;
  min?: number;
  /** Increment size. Defaults to 1 on both platforms. */
  step?: number;
  onChange?: (value: number) => void;
}

export interface ProgressBarProps extends Labeled {
  value: number;
  max?: number;
}

export interface SpinnerProps {
  size?: number;
  color?: string;
}

export type IconName =
  | 'back'
  | 'close'
  | 'menu'
  | 'chevron'
  | 'play'
  | 'pause'
  | 'check'
  | 'search'
  | 'reorder'
  | 'edit'
  | 'reset'
  | 'settings'
  | 'calendar'
  | 'activity'
  | 'timer'
  | 'counter'
  | 'stop';

export const ICON_NAMES: IconName[] = [
  'back',
  'close',
  'menu',
  'chevron',
  'play',
  'pause',
  'check',
  'search',
  'reorder',
  'edit',
  'reset',
  'settings',
  'calendar',
  'activity',
  'timer',
  'counter',
  'stop',
];

export interface IconGlyph {
  d: string;
  viewBox: string;
  filled?: boolean;
  strokeWidth?: number;
}

export const ICON_GLYPHS: Record<IconName, IconGlyph> = {
  back: { d: 'M12 5l-5 5 5 5', viewBox: '0 0 20 20', strokeWidth: 1.8 },
  close: { d: 'M5 5l10 10M15 5L5 15', viewBox: '0 0 20 20', strokeWidth: 1.8 },
  menu: { d: 'M3 6.5h14M3 10h14M3 13.5h14', viewBox: '0 0 20 20', strokeWidth: 1.6 },
  chevron: { d: 'M5 3l4 4-4 4', viewBox: '0 0 14 14', strokeWidth: 1.6 },
  play: { d: 'M4 3l7 4-7 4V3z', viewBox: '0 0 14 14', filled: true },
  pause: { d: 'M2.5 2h2.5v8H2.5zM7 2h2.5v8H7z', viewBox: '0 0 12 12', filled: true },
  check: { d: 'M3 7.5L5.8 10 11 4', viewBox: '0 0 14 14', strokeWidth: 2 },
  search: {
    d: 'M13 13l4 4M15 8.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z',
    viewBox: '0 0 20 20',
    strokeWidth: 1.7,
  },
  reorder: { d: 'M4 6h12M4 10h12M4 14h12', viewBox: '0 0 20 20', strokeWidth: 1.8 },
  edit: {
    d: 'M4 15.5l.8-3.5L13 3.8l3.2 3.2L8 15.2l-4 .3zM11.5 5.3l3.2 3.2',
    viewBox: '0 0 20 20',
    strokeWidth: 1.6,
  },
  reset: { d: 'M5 6H2.5V3.5M3 6a7 7 0 11-1 6', viewBox: '0 0 20 20', strokeWidth: 1.7 },
  settings: {
    d: 'M3 6h5M12 6h5M3 14h2M9 14h8M8 3.5v5M5 11.5v5',
    viewBox: '0 0 20 20',
    strokeWidth: 1.7,
  },
  calendar: {
    d: 'M4 4.5h12v12H4zM4 8h12M7 2.5v4M13 2.5v4',
    viewBox: '0 0 20 20',
    strokeWidth: 1.6,
  },
  activity: { d: 'M2.5 11h3l2-7 3.5 12 2-6h4.5', viewBox: '0 0 20 20', strokeWidth: 1.7 },
  timer: {
    d: 'M15 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0M9 7v3l2 1.5M7 2.5h4',
    viewBox: '0 0 18 18',
    strokeWidth: 1.6,
  },
  counter: {
    d: 'M3 9h12M3 9l3-3M3 9l3 3M15 9l-3-3M15 9l-3 3',
    viewBox: '0 0 18 18',
    strokeWidth: 1.6,
  },
  stop: {
    d: 'M4.5 3h7A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7A1.5 1.5 0 0 1 4.5 3z',
    viewBox: '0 0 16 16',
    strokeWidth: 1.6,
  },
};

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export type IconSlot = string | number | ((color: string) => ReactNode);

export type TypographyVariant =
  | 'display'
  | 'title'
  | 'titleSm'
  | 'body'
  | 'bodyLg'
  | 'meta'
  | 'eyebrow'
  | 'numeral'
  | 'label'
  | 'badge'
  | 'controlLabel';

export const TYPOGRAPHY_VARIANTS: TypographyVariant[] = [
  'display',
  'title',
  'titleSm',
  'body',
  'bodyLg',
  'meta',
  'eyebrow',
  'numeral',
  'label',
  'badge',
  'controlLabel',
];

export interface TypographyProps {
  variant: TypographyVariant;
  children: ReactNode;
}
