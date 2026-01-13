import React, { forwardRef } from 'react';
import { CardProps } from '../../types';
import './Card.css';

/**
 * Senior Banking App - Accessible Card Component
 *
 * Features:
 * - Material Design 3 elevation
 * - Clickable with haptic feedback
 * - Clear visual hierarchy
 * - WCAG AAA compliant
 */

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'elevated',
      padding = 'medium',
      onClick,
      clickable = false,
      children,
      ariaLabel,
      ariaDescribedBy,
      role,
      className = '',
      testId,
      ...props
    },
    ref
  ) => {
    const isClickable = clickable || !!onClick;

    const handleClick = () => {
      if (!isClickable || !onClick) return;

      // Haptic feedback simulation
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }

      onClick();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isClickable || !onClick) return;

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick();
      }
    };

    const classNames = [
      'card',
      `card--${variant}`,
      `card--padding-${padding}`,
      isClickable && 'card--clickable',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const cardProps = {
      ref,
      className: classNames,
      onClick: isClickable ? handleClick : undefined,
      onKeyDown: isClickable ? handleKeyDown : undefined,
      tabIndex: isClickable ? 0 : undefined,
      role: role || (isClickable ? 'button' : undefined),
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'data-testid': testId,
      ...props,
    };

    return <div {...cardProps}>{children}</div>;
  }
);

Card.displayName = 'Card';
