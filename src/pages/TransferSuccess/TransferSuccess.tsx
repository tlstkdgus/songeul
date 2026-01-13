import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './TransferSuccess.css';

/**
 * Transfer Success Screen - 송금 완료
 */
export const TransferSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const transferData = location.state || {};

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('ko-KR');
  };

  return (
    <div className="transfer-success">
      <div className="transfer-success__animation">
        <svg className="transfer-success__icon" viewBox="0 0 24 24">
          <circle
            className="transfer-success__circle"
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            className="transfer-success__check"
            d="M9 12l2 2 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <main className="transfer-success__content">
        <h1 className="transfer-success__title">
          송금 완료!
        </h1>
        <p className="transfer-success__message">
          안전하게 송금되었습니다
        </p>

        <div className="transfer-success__details">
          <div className="transfer-success__detail-item">
            <span className="transfer-success__detail-label">받는 분</span>
            <span className="transfer-success__detail-value">
              {transferData.recipientName || transferData.nickname}
            </span>
          </div>
          <div className="transfer-success__detail-item">
            <span className="transfer-success__detail-label">은행</span>
            <span className="transfer-success__detail-value">
              {transferData.bank}
            </span>
          </div>
          <div className="transfer-success__detail-item">
            <span className="transfer-success__detail-label">계좌번호</span>
            <span className="transfer-success__detail-value transfer-success__detail-value--number">
              {transferData.accountNumber}
            </span>
          </div>
          <div className="transfer-success__detail-item transfer-success__detail-item--amount">
            <span className="transfer-success__detail-label">보낸 금액</span>
            <span className="transfer-success__detail-value transfer-success__detail-value--amount">
              {formatAmount(transferData.amount)}원
            </span>
          </div>
        </div>
      </main>

      <div className="transfer-success__actions">
        <button
          className="transfer-success__btn"
          onClick={() => navigate('/')}
        >
          홈으로 가기
        </button>
      </div>
    </div>
  );
};
