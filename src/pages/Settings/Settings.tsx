import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

/**
 * Settings Screen - 설정
 * 가족 관리, 송금 한도, 독거노인 보호 등 주요 설정에 접근
 */
export const Settings: React.FC = () => {
  const navigate = useNavigate();

  const settingsMenu = [
    {
      id: 'family',
      title: '👨‍👩‍👧 가족 관리',
      description: '보호자 등록 및 권한 설정',
      path: '/family-management',
    },
    {
      id: 'limit',
      title: '💰 송금 한도',
      description: '일일 송금 한도 및 관계별 한도 설정',
      path: '/transfer-limit',
    },
    {
      id: 'elderly',
      title: '👴 독거노인 보호',
      description: '긴급 연락처, 정기 확인, 의심 거래 감시',
      path: '/elderly-protection',
    },
  ];

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="settings">
      <header className="settings__header">
        <button
          className="settings__back"
          onClick={() => navigate('/')}
          aria-label="뒤로가기"
        >
          ←
        </button>
        <h1 className="settings__title">설정</h1>
      </header>

      <main className="settings__content">
        <section className="settings__section">
          <h2 className="settings__section-title">보안 및 보호</h2>
          <div className="settings__menu-grid">
            {settingsMenu.map((item) => (
              <button
                key={item.id}
                className="settings__menu-item"
                onClick={() => handleMenuClick(item.path)}
                aria-label={item.title}
              >
                <div className="settings__menu-content">
                  <h3 className="settings__menu-title">{item.title}</h3>
                  <p className="settings__menu-desc">{item.description}</p>
                </div>
                <span className="settings__menu-arrow">›</span>
              </button>
            ))}
          </div>
        </section>

        <section className="settings__section">
          <h2 className="settings__section-title">앱 정보</h2>
          <div className="settings__info-item">
            <span className="settings__info-label">버전</span>
            <span className="settings__info-value">1.1.0</span>
          </div>
          <div className="settings__info-item">
            <span className="settings__info-label">마지막 업데이트</span>
            <span className="settings__info-value">2026년 1월 13일</span>
          </div>
          <div className="settings__info-item">
            <span className="settings__info-label">접근성</span>
            <span className="settings__info-value">WCAG AAA 준수</span>
          </div>
        </section>

        <section className="settings__section">
          <h2 className="settings__section-title">도움말</h2>
          <div className="settings__help-box">
            <p className="settings__help-text">
              🔐 <strong>보안 및 보호</strong>
              <br />
              가족 관리, 송금 한도, 독거노인 보호 등 더 안전한 금융 거래를 위한 설정입니다.
              <br />
              <br />
              👨‍👩‍👧 <strong>가족 관리</strong>
              <br />
              여러 명의 보호자를 등록하고 각각에게 다른 권한을 부여할 수 있습니다.
              <br />
              <br />
              💰 <strong>송금 한도</strong>
              <br />
              기본 한도, 관계별 한도, 시간대별 한도를 설정하여 사기를 방지합니다.
              <br />
              <br />
              👴 <strong>독거노인 보호</strong>
              <br />
              일일 안전 확인, 주간 리포트, 의심 거래 감시 등으로 독거 상황을 보호합니다.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};
