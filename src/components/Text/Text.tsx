import React, { forwardRef } from 'react';
import { TextProps } from '../../types';
import './Text.css';

/**
 * Senior Banking App - Accessible Text Component
 *
 * Features:
 * - Large, readable font sizes
 * - WCAG AAA compliant contrast
 * - Semantic HTML elements
 * - Line height optimization for readability
 */

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      variant = 'body1',
      weight = 'regular',
      color,
      align = 'left',
      as,
      children,
      ariaLabel,
      ariaDescribedBy,
      className = '',
      testId,
      ...props
    },
    ref
  ) => {
    // Determine the HTML element to render
    const getElement = (): keyof JSX.IntrinsicElements => {
      if (as) return as;

      switch (variant) {
        case 'heading1':
          return 'h1';
        case 'heading2':
          return 'h2';
        case 'heading3':
          return 'h3';
        case 'body1':
        case 'body2':
          return 'p';
        case 'caption':
          return 'span';
        default:
          return 'p';
      }
    };

    const Element = getElement();

    const classNames = [
      'text',
      `text--${variant}`,
      `text--weight-${weight}`,
      color && `text--color-${color}`,
      `text--align-${align}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return React.createElement(
      Element,
      {
        ref,
        className: classNames,
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedBy,
        'data-testid': testId,
        ...props,
      },
      children
    );
  }
);

Text.displayName = 'Text';
