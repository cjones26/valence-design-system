import type { ElementType, HTMLAttributes } from 'react';
import type { TypographyProps as SharedTypographyProps, TypographyVariant } from '@valence/types';
import styles from './Typography.module.css';

export interface TypographyProps
  extends SharedTypographyProps, Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Overrides the element rendered for a heading-shaped variant (display/title/titleSm default to h1/h2/h3). */
  as?: ElementType;
}

const DEFAULT_ELEMENT: Partial<Record<TypographyVariant, ElementType>> = {
  display: 'h1',
  title: 'h2',
  titleSm: 'h3',
};

export function Typography({ variant, children, className, as, ...rest }: TypographyProps) {
  const Element = as ?? DEFAULT_ELEMENT[variant] ?? 'span';

  return (
    <Element className={`${styles[variant]} ${className ?? ''}`} {...rest}>
      {children}
    </Element>
  );
}
