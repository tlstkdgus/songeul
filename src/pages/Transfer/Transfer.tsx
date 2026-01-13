import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Transfer.css';

/**
 * Transfer Screen - 송금 금액 입력
 */
export const Transfer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const recipientData = location.state || {};

  const [amount, setAmount] = useState('');

  const quickAmounts = [10000, 30000, 50000, 100000, 500000, 1000000];

  const handleAmountClick = (value: number) => {
    setAmount(value.toString());
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value);
  };

  const formatAmount = (value: string) => {
    if (!value) return '';
    return Number(value).toLocaleString('ko-KR');
  };

  const handleNext = () => {
    if (!amount || Number(amount) === 0) {
      alert('금액을 입력해주세요');
      return;
    }

    navigate('/security-check', {
      state: {
        ...recipientData,
        amount: Number(amount)
      }
    });
  };

  return (
    <div className="transfer">
      <header className="transfer__header">
        <button
          className="transfer__back"
          onClick={() => navigate(-1)}
          aria-label="뒤로 가기"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
          </svg>
        </button>
        <h1 className="transfer__title">송금하기</h1>
        <div className="transfer__spacer"></div>
      </header>

      <main className="transfer__content">
        <div className="transfer__recipient">
          <p className="transfer__recipient-label">받는 분</p>
          <h2 className="transfer__recipient-name">
            {recipientData.recipientName || recipientData.nickname || '수취인'}
          </h2>
          <p className="transfer__recipient-info">
            {recipientData.bank} {recipientData.accountNumber}
          </p>
        </div>

        <div className="transfer__amount-section">
          <label htmlFor="amount-input" className="transfer__label">
            얼마를 보낼까요?
          </label>
          <div className="transfer__amount-input-wrapper">
            <input
              id="amount-input"
              type="text"
              inputMode="numeric"
              className="transfer__amount-input"
              placeholder="0"
              value={formatAmount(amount)}
              onChange={handleAmountChange}
              aria-label="송금 금액 입력"
            />
            <span className="transfer__currency">원</span>
          </div>

          <div className="transfer__quick-amounts">
            <p className="transfer__quick-label">자주 쓰는 금액</p>
            <div className="transfer__quick-grid">
              {quickAmounts.map((value) => (
                <button
                  key={value}
                  className="transfer__quick-btn"
                  onClick={() => handleAmountClick(value)}
                >
                  {(value / 10000).toLocaleString()}만원
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <div className="transfer__actions">
        <button
          className="transfer__submit"
          onClick={handleNext}
          disabled={!amount || Number(amount) === 0}
        >
          다음
        </button>
      </div>
    </div>
  );
};
