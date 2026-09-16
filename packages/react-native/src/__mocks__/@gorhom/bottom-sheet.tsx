import {
  forwardRef,
  useImperativeHandle,
  useState,
  type ComponentType,
  type ReactNode,
} from 'react';
import {
  Pressable,
  View,
  type AccessibilityRole,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

interface BackdropProps {
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
  onPress?: () => void;
}

interface ModalProps {
  children?: ReactNode;
  backdropComponent?: ComponentType<BackdropProps>;
  enableDynamicSizing?: boolean;
  enablePanDownToClose?: boolean;
  topInset?: number;
  maxDynamicContentSize?: number;
  keyboardBehavior?: string;
  keyboardBlurBehavior?: string;
  android_keyboardInputMode?: string;
  onDismiss?: () => void;
  index?: number;
  snapPoints?: Array<string | number>;
  onChange?: (index: number) => void;
}

interface ModalHandle {
  present: () => void;
  dismiss: () => void;
}

export const BottomSheetModal = forwardRef<ModalHandle, ModalProps>(function MockBottomSheetModal(
  { children, backdropComponent: Backdrop, ...props },
  ref,
) {
  const [visible, setVisible] = useState(false);
  useImperativeHandle(ref, () => ({
    present: () => setVisible(true),
    dismiss: () => setVisible(false),
  }));
  if (!visible) return null;
  return (
    <View testID="bottom-sheet" {...props}>
      {Backdrop && <Backdrop />}
      {children}
    </View>
  );
});

export const BottomSheet = forwardRef<ModalHandle, ModalProps>(function MockBottomSheet(
  { children, index = -1, backdropComponent: Backdrop, ...props },
  _ref,
) {
  const visible = index >= 0;
  return visible ? (
    <View testID="bottom-sheet" {...props}>
      {Backdrop && <Backdrop onPress={() => props.onChange?.(-1)} />}
      {children}
    </View>
  ) : null;
});

export default BottomSheet;

export function BottomSheetBackdrop({
  onPress,
  accessibilityLabel,
  accessibilityRole,
}: BackdropProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
    />
  );
}

export function BottomSheetScrollView({
  children,
  contentContainerStyle,
}: {
  children?: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
}) {
  return <View style={contentContainerStyle}>{children}</View>;
}
