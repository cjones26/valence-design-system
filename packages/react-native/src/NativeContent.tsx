import { Children, Fragment, isValidElement, type ReactNode } from 'react';
import { Typography } from './Typography/Typography';

export function NativeContent({ children, color }: { children: ReactNode; color?: string }) {
  return Children.map(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return (
        <Typography variant="body" style={color ? { color } : undefined}>
          {child}
        </Typography>
      );
    }

    if (isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment) {
      return <NativeContent color={color}>{child.props.children}</NativeContent>;
    }

    return child;
  });
}
