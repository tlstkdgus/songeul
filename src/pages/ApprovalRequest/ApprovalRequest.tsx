import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ApprovalRequest.css';

/**
 * Approval Request Screen - 가족 승인 요청 완료
 */
export const ApprovalRequest: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const transferData = location.state || {};
  const [timeLeft, setTimeLeft] = useState(300); // 5분

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('ko-KR');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleCheckStatus = () => {
    // 승인 상태 확인 (실제로는 서버에서 확인)
    alert('승인이 아직 완료되지 않았습니다.\n잠시 후 다시 확인해주세요.');
  };

  return (
    <div className="approval-request">
      <div className="approval-request__animation">
        <svg className="approval-request__icon" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path
            d="M12 6v6l4 2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <main className="approval-request__content">
        <h1 className="approval-request__title">
          승인 대기 중이에요
        </h1>
        <p className="approval-request__message">
          가족에게 승인 요청을 보냈습니다
        </p>

        <div className="approval-request__details">
          <div className="approval-request__detail-item">
            <span className="approval-request__detail-label">받는 분</span>
            <span className="approval-request__detail-value">
              {transferData?.recipientName || transferData?.nickname || '수취인'}
            </span>
          </div>
          <div className="approval-request__detail-item">
            <span className="approval-request__detail-label">보낼 금액</span>
            <span className="approval-request__detail-value approval-request__detail-value--amount">
              {formatAmount(transferData.amount)}원
            </span>
          </div>
          <div className="approval-request__detail-item">
            <span className="approval-request__detail-label">은행</span>
            <span className="approval-request__detail-value">
              {transferData.bank}
            </span>
          </div>
        </div>

        <div className="approval-request__waiting">
          <div className="approval-request__waiting-info">
            <p className="approval-request__waiting-label">
              승인 대기 시간
            </p>
            <p className="approval-request__timer">
              {formatTime(timeLeft)}
            </p>
            <p className="approval-request__waiting-description">
              5분 이내에 가족의 승인을 받아야 합니다
            </p>
          </div>

          <div className="approval-request__family-list">
            <h2 className="approval-request__family-title">승인 대기 중인 가족</h2>
            <div className="approval-request__family-item">
              <div className="approval-request__family-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="approval-request__family-info">
                <p className="approval-request__family-name">김길동 (아들)</p>
                <p className="approval-request__family-status">대기 중...</p>
              </div>
              <div className="approval-request__family-status-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path
                    d="M12 6v6l4 2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="approval-request__actions">
        <button
          className="approval-request__btn approval-request__btn--secondary"
          onClick={handleCheckStatus}
        >
          상태 확인
        </button>
        <button
          className="approval-request__btn approval-request__btn--primary"
          onClick={handleGoHome}
        >
          홈으로 가기
        </button>
      </div>
    </div>
  );
};
