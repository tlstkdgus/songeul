import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useHaptic, useAnnouncement } from '../../hooks/useAccessibility';
import { AIAssistant } from '../../components/AIAssistant/AIAssistant';
import './HomeNew.css';
import { BalanceCard } from '@/components/BalanceCard/BalanceCard';

/**
 * Home Screen Component - 고령자 친화 디자인
 */
export const HomeNew: React.FC = () => {
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

  const handleHome = () => {
    vibrate(10);
    announce('홈 화면입니다');
  };

  const handleHistory = () => {
    vibrate(10);
    announce('거래 내역을 확인합니다');
    alert('거래 내역 기능은 준비 중입니다');
  };

  const handleSettings = () => {
    vibrate(10);
    announce('설정 화면으로 이동합니다');
    alert('설정 기능은 준비 중입니다');
  };

  return (
    <div className="home">
      <main className="home__content">
        {/* 잔액 카드 */}
        <section className="home__section">
          <section className="home__section" aria-labelledby="balance-heading">
                    <h2 id="balance-heading" className="sr-only">
                      계좌 잔액
                    </h2>
                    <BalanceCard userName="홍길동" balance={500000} />
                  </section>
          
       
        </section>

        {/* 액션 버튼들 */}
        <section className="home__section">
          <div className="home__actions">
            {/* 돈 보내기 - 노란색 */}
            <button
              className="home__action-btn home__action-btn--primary"
              onClick={handleTransfer}
              aria-label="돈 보내기"
            >
              <div className="home__action-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2l9 4.5v3c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12v-3l9-4.5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V13H5V6.3l7-3.11v9.8z"
                    fill="currentColor"
                  />
                  <circle cx="12" cy="9" r="2" fill="currentColor" />
                </svg>
              </div>
              돈 보내기
            </button>

            {/* 사진 찍어 보내기 - 초록색 */}
            <button
              className="home__action-btn home__action-btn--camera"
              onClick={handlePhotoTransfer}
              aria-label="사진 찍어 보내기"
            >
              <span className="home__badge">추천</span>
              <div className="home__action-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 15.5c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"
                    fill="currentColor"
                  />
                  <path
                    d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              사진 찍어 보내기
            </button>

            {/* 안심 계좌 - 흰색 */}
            <button
              className="home__action-btn home__action-btn--safe"
              onClick={handleSafeAccounts}
              aria-label="안심 계좌"
            >
              <div className="home__action-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"
                    fill="currentColor"
                  />
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
              안심 계좌
            </button>
          </div>
        </section>
      </main>

      {/* 하단 네비게이션 */}
      <nav className="home__nav">
        <button className="home__nav-btn" onClick={handleHome} aria-label="홈" >
          <div className="home__nav-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
                fill="currentColor"
              />
            </svg>
          </div>
          <span className="home__nav-label">홈</span>
        </button>

        <button className="home__nav-btn" onClick={handleHistory} aria-label="거래내역">
          <div className="home__nav-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"
                fill="currentColor"
              />
            </svg>
          </div>
          <span className="home__nav-label">거래내역</span>
        </button>

        <button className="home__nav-btn" onClick={handleSettings} aria-label="설정">
          <div className="home__nav-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"
                fill="currentColor"
              />
            </svg>
          </div>
          <span className="home__nav-label">설정</span>
        </button>
      </nav>

      {/* AI 비서는 플로팅 버튼으로 유지 */}
      <AIAssistant />
    </div>
  );
};
