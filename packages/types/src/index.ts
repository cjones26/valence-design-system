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
  | 'activity';

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
];

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
