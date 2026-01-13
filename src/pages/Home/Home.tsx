import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BalanceCard } from '../../components/BalanceCard/BalanceCard';
import { ActionButton } from '../../components/ActionButton/ActionButton';
import { AIAssistant } from '../../components/AIAssistant/AIAssistant';
import { useHaptic, useAnnouncement } from '../../hooks/useAccessibility';
import './Home.css';

/**
 * Home Screen Component
 * 시니어 뱅킹 앱의 메인 화면
 */
export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { vibrate } = useHaptic();
  const { announce } = useAnnouncement();

  const handleTransfer = () => {
    vibrate(10);
    announce('송금 화면으로 이동합니다');
    navigate('/transfer');
  };

  const handlePhotoTransfer = () => {
    vibrate(10);
    announce('카메라를 엽니다');
    navigate('/camera');
  };

  const handleSafeAccounts = () => {
    vibrate(10);
    announce('안심 계좌 목록을 엽니다');
    navigate('/safe-accounts');
  };

  const handleAIAssistant = () => {
    announce('AI 비서가 활성화되었습니다');
    console.log('AI Assistant activated');
  };

  return (
    <div className="home">
      <header className="home__header">
        <h1 className="sr-only">시니어 뱅킹 홈</h1>
      </header>

      <main className="home__content">
        {/* Balance Card */}
        <section className="home__section" aria-labelledby="balance-heading">
          <h2 id="balance-heading" className="sr-only">
            계좌 잔액
          </h2>
          <BalanceCard userName="홍길동" balance={500000} />
        </section>

        {/* Main Actions */}
        <section className="home__section" aria-labelledby="actions-heading">
          <h2 id="actions-heading" className="sr-only">
            주요 기능
          </h2>
          <div className="home__actions">
            <ActionButton
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"
                    fill="currentColor"
                  />
                </svg>
              }
              label="송금하기"
              description="계좌번호로 돈 보내기"
              onClick={handleTransfer}
              variant="outline"
            />

            <ActionButton
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
                    fill="currentColor"
                  />
                  <circle cx="9" cy="9" r="1.5" fill="currentColor" />
                  <path
                    d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
                    fill="currentColor"
                  />
                </svg>
              }
              label="사진 찍어 보내기"
              description="계좌번호를 사진으로 인식"
              onClick={handlePhotoTransfer}
              variant="secondary"
            />

            <ActionButton
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                    fill="currentColor"
                  />
                </svg>
              }
              label="안심 계좌"
              description="자주 쓰는 계좌 관리"
              onClick={handleSafeAccounts}
              variant="outline"
            />
          </div>
        </section>
      </main>

      {/* AI Assistant Floating Button */}
      <AIAssistant onActivate={handleAIAssistant} />
    </div>
  );
};
