import React from 'react';
import { Button } from '../Button/Button';
import './ActionButton.css';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
}

/**
 * ActionButton Component
 * 홈 화면의 메인 액션 버튼 (송금, OCR, 안심계좌)
 */
export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  description,
  onClick,
  variant = 'primary',
}) => {
  return (
    <Button
      variant={variant}
      size="large"
      fullWidth
      onClick={onClick}
      ariaLabel={`${label}: ${description}`}
      className="action-button"
    >
      <div className="action-button__content">
        <div className="action-button__icon">{icon}</div>
        <div className="action-button__text">
          <div className="action-button__label">{label}</div>
          <div className="action-button__description">{description}</div>
        </div>
      </div>
    </Button>
  );
};
