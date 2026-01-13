import React from 'react';
import { Card } from '../Card/Card';
import { Text } from '../Text/Text';
import { useTTS } from '../../hooks/useAccessibility';
import './BalanceCard.css';

interface BalanceCardProps {
  userName: string;
  balance: number;
}

/**
 * BalanceCard Component
 * 잔액을 표시하는 대화형 카드
 */
export const BalanceCard: React.FC<BalanceCardProps> = ({ userName, balance }) => {
  const { speakText } = useTTS();

  const formattedBalance = balance.toLocaleString('ko-KR');
  const greetingText = `안녕하세요 ${userName}님, 현재 ${formattedBalance}원이 있습니다.`;

  const handleSpeak = () => {
    speakText(greetingText);
  };

  return (
    <Card
      variant="elevated"
      padding="large"
      className="balance-card"
      ariaLabel={greetingText}
    >
      <div className="balance-card__content">
        <div className="balance-card__greeting">
          <Text variant="heading3" weight="medium" color="secondary">
            안녕하세요
          </Text>
          <Text variant="heading2" weight="bold">
            {userName}님
          </Text>
        </div>

        <div className="balance-card__balance">
          <Text variant="caption" color="secondary">
            현재 잔액
          </Text>
          <div className="balance-card__amount">
            <Text variant="heading1" weight="bold">
              {formattedBalance}
            </Text>
            <Text variant="heading1" weight="bold">
              원
            </Text>
          </div>
        </div>

        <button
          className="balance-card__tts-button"
          onClick={handleSpeak}
          aria-label="잔액 음성으로 듣기"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
              fill="currentColor"
            />
          </svg>
          <span className="balance-card__tts-text">듣기</span>
        </button>
      </div>
    </Card>
  );
};
