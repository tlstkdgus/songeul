import React, { forwardRef } from 'react';
import { ButtonProps } from '../../types';
import './Button.css';

/**
 * Senior Banking App - Accessible Button Component
 *
 * Features:
 * - WCAG AAA compliant (minimum 48dp touch target)
 * - Haptic feedback simulation
 * - Loading states
 * - Clear visual feedback
 */

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'large',
      fullWidth = false,
      disabled = false,
      loading = false,
      icon,
      onClick,
      children,
      ariaLabel,
      ariaDescribedBy,
      className = '',
      testId,
      ...props
    },
    ref
  ) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;

      // Haptic feedback simulation
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }

      onClick?.(event);
    };

    const classNames = [
      'btn',
      `btn--${variant}`,
      `btn--${size}`,
      fullWidth && 'btn--full-width',
      loading && 'btn--loading',
      icon && 'btn--with-icon',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type="button"
        className={classNames}
        onClick={handleClick}
        disabled={disabled || loading}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        aria-describedby={ariaDescribedBy}
        aria-busy={loading}
        data-testid={testId}
        {...props}
      >
        {loading && (
          <span className="btn__spinner" role="status" aria-label="로딩 중">
            <span className="spinner" />
          </span>
        )}

        {icon && !loading && <span className="btn__icon">{icon}</span>}

        <span className="btn__text">{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
