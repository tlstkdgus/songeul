import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SecurityCheck.css';

interface CheckItem {
  id: string;
  label: string;
  checked: boolean;
}

/**
 * Security Check Loading Screen - 보안 검사 진행 화면
 */
export const SecurityCheck: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const transferData = location.state;

  const [checks, setChecks] = useState<CheckItem[]>([
    { id: 'account', label: '받는 분의 계좌가 정상인지 확인 중...', checked: false },
    { id: 'fraud', label: '보이스피싱 신고가 된 계좌인지 확인 중...', checked: false },
    { id: 'pattern', label: '평소와 다른 송금인지 분석 중...', checked: false },
  ]);

  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // 각 단계를 순차적으로 체크
    const timers: NodeJS.Timeout[] = [];

    checks.forEach((_, index) => {
      const timer = setTimeout(() => {
        setChecks(prev =>
          prev.map((item, i) =>
            i === index ? { ...item, checked: true } : item
          )
        );
        setCurrentStep(index + 1);

        // 마지막 체크 완료 후
        if (index === checks.length - 1) {
          setTimeout(() => {
            setIsComplete(true);
            // 위험 감지 시나리오 (테스트용: 50% 확률)
            const hasRisk = Math.random() > 0.5;
            setTimeout(() => {
              if (hasRisk) {
                navigate('/fraud-alert', { state: transferData });
              } else {
                navigate('/transfer-success', { state: transferData });
              }
            }, 1000);
          }, 500);
        }
      }, (index + 1) * 1500);

      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="security-check">
      <header className="security-check__header">
        <div className="security-check__logo">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h1 className="security-check__title">안전하게 보호하고 있어요</h1>
        <p className="security-check__subtitle">
          은행이 안전하게 확인하고 있습니다
        </p>
      </header>

      <main className="security-check__content">
        <div className="security-check__progress">
          <div
            className="security-check__progress-bar"
            style={{
              width: `${(currentStep / checks.length) * 100}%`
            }}
          />
        </div>

        <ul className="security-check__list">
          {checks.map((check, index) => (
            <li
              key={check.id}
              className={`security-check__item ${
                check.checked ? 'checked' : ''
              } ${currentStep === index ? 'active' : ''}`}
            >
              <div className="security-check__item-icon">
                {check.checked ? (
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <div className="security-check__spinner">
                    <div className="security-check__spinner-circle" />
                  </div>
                )}
              </div>
              <p className="security-check__item-label">{check.label}</p>
            </li>
          ))}
        </ul>

        {isComplete && (
          <div className="security-check__complete">
            <svg className="security-check__complete-icon" viewBox="0 0 24 24">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                fill="currentColor"
              />
            </svg>
            <p className="security-check__complete-text">
              검사 완료!
            </p>
          </div>
        )}
      </main>

      <div className="security-check__info">
        <svg className="security-check__info-icon" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
            fill="currentColor"
          />
        </svg>
        <p className="security-check__info-text">
          잠시만 기다려주세요<br />
          송금 전에 꼼꼼하게 확인하고 있어요
        </p>
      </div>
    </div>
  );
};
