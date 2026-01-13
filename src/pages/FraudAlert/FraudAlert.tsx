import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './FraudAlert.css';

/**
 * Fraud Alert Warning Screen - 사기 위험 감지 경고 화면
 */
export const FraudAlert: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const transferData = location.state;

  const [countdown, setCountdown] = useState(5);
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanProceed(true);
    }
  }, [countdown]);

  const handleCallFamily = () => {
    // 실제로는 전화 걸기 기능
    if (confirm('가족에게 전화를 걸까요?')) {
      // tel: 링크 사용 가능
      alert('전화 기능은 실제 앱에서 작동합니다');
    }
  };

  const handleRequestApproval = () => {
    alert('가족에게 승인 요청을 보냈습니다');
    navigate('/');
  };

  const handleProceed = () => {
    if (canProceed) {
      if (confirm('정말로 송금하시겠습니까?\n가족에게 먼저 확인해보시는 것이 좋습니다.')) {
        navigate('/transfer-success', { state: transferData });
      }
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="fraud-alert">
      <div className="fraud-alert__warning-bg">
        <svg className="fraud-alert__warning-icon" viewBox="0 0 24 24" fill="none">
          <path
            d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
            fill="currentColor"
          />
        </svg>
      </div>

      <main className="fraud-alert__content">
        <h1 className="fraud-alert__title">
          ⚠️ 잠깐!<br />
          의심스러운 송금입니다
        </h1>

        <div className="fraud-alert__reasons">
          <p className="fraud-alert__reason-title">
            이런 점이 의심스러워요
          </p>
          <ul className="fraud-alert__reason-list">
            <li className="fraud-alert__reason-item">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                  fill="currentColor"
                />
              </svg>
              <span>처음 보내는 계좌입니다</span>
            </li>
            <li className="fraud-alert__reason-item">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                  fill="currentColor"
                />
              </svg>
              <span>평소보다 큰 금액입니다</span>
            </li>
            <li className="fraud-alert__reason-item">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                  fill="currentColor"
                />
              </svg>
              <span>사기 신고가 많은 패턴입니다</span>
            </li>
          </ul>
        </div>

        <div className="fraud-alert__warning-box">
          <p className="fraud-alert__warning-text">
            보이스피싱일 가능성이 있습니다<br />
            <strong>가족에게 먼저 확인해보세요</strong>
          </p>
        </div>

        <div className="fraud-alert__actions">
          <button
            className="fraud-alert__btn fraud-alert__btn--primary"
            onClick={handleCallFamily}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                fill="currentColor"
              />
            </svg>
            가족에게 전화하기
          </button>

          <button
            className="fraud-alert__btn fraud-alert__btn--secondary"
            onClick={handleRequestApproval}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                fill="currentColor"
              />
            </svg>
            가족에게 승인 요청하기
          </button>

          <button
            className="fraud-alert__btn fraud-alert__btn--cancel"
            onClick={handleCancel}
          >
            송금 취소하기
          </button>
        </div>

        <div className="fraud-alert__dangerous">
          {!canProceed && (
            <p className="fraud-alert__countdown">
              {countdown}초 후에 버튼이 활성화됩니다<br />
              <strong>잠시만 생각해보세요</strong>
            </p>
          )}
          <button
            className={`fraud-alert__proceed ${canProceed ? 'enabled' : 'disabled'}`}
            onClick={handleProceed}
            disabled={!canProceed}
          >
            그래도 보낼래요
          </button>
        </div>
      </main>
    </div>
  );
};
