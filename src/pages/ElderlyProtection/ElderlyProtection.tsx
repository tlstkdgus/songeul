import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ElderlyProfile } from '../../types';
import './ElderlyProtection.css';

/**
 * Elderly Protection Screen - 독거노인 보호 설정
 * 긴급 연락처, 정기적 송금 모니터링 등
 */
export const ElderlyProtection: React.FC = () => {
  const navigate = useNavigate();
  const [elderlyProfile, setElderlyProfile] = useState<ElderlyProfile>({
    isElderlyAlone: true,
    emergencyContact: {
      id: '1',
      name: '김길동',
      relationship: 'child',
      phone: '010-1234-5678',
      registeredAt: new Date(),
      isActive: true,
      permissions: {
        canApproveTransfer: true,
        canSetLimit: true,
        canReceiveAlert: true,
        canViewBalance: true,
        approvalRequired: true,
      },
    },
    emergencyContactBackup: undefined,
    regularCheckInTime: '14:00',
    suspiciousActivityThreshold: 1000000,
    dailyCheckInEnabled: true,
    weeklyReportEnabled: true,
    notificationPreferences: {
      smsAlert: true,
      phoneCall: true,
      familyNotification: true,
    },
  });

  const [editMode, setEditMode] = useState(false);

  const handleToggleSetting = (setting: keyof Pick<ElderlyProfile, 'dailyCheckInEnabled' | 'weeklyReportEnabled'>) => {
    setElderlyProfile({
      ...elderlyProfile,
      [setting]: !elderlyProfile[setting],
    });
  };

  const handleNotificationToggle = (type: keyof typeof elderlyProfile.notificationPreferences) => {
    setElderlyProfile({
      ...elderlyProfile,
      notificationPreferences: {
        ...elderlyProfile.notificationPreferences,
        [type]: !elderlyProfile.notificationPreferences[type],
      },
    });
  };

  return (
    <div className="elderly-protection">
      <header className="elderly-protection__header">
        <button
          className="elderly-protection__back"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
        >
          ←
        </button>
        <h1 className="elderly-protection__title">독거노인 보호</h1>
      </header>

      <main className="elderly-protection__content">
        {/* 프로필 상태 */}
        <section className="elderly-protection__status">
          <div className="elderly-protection__status-badge">
            {elderlyProfile.isElderlyAlone ? '🏠 독거 상태' : '함께 생활'}
          </div>
          <p className="elderly-protection__status-desc">
            {elderlyProfile.isElderlyAlone
              ? '독거노인 보호 기능이 활성화되어 있습니다'
              : '가족과 함께 생활 중입니다'}
          </p>
        </section>

        {/* 긴급 연락처 */}
        <section className="elderly-protection__card">
          <h2 className="elderly-protection__card-title">긴급 연락처</h2>

          <div className="elderly-protection__contact">
            <div className="elderly-protection__contact-header">
              <h3 className="elderly-protection__contact-name">
                {elderlyProfile.emergencyContact.name}
              </h3>
              <span className="elderly-protection__contact-relationship">
                {elderlyProfile.emergencyContact.relationship === 'child' ? '자녀' : '보호자'}
              </span>
            </div>
            <p className="elderly-protection__contact-phone">
              ☎ {elderlyProfile.emergencyContact.phone}
            </p>
            <p className="elderly-protection__contact-role">
              주요 보호자 (필수 승인)
            </p>
            <button
              className="elderly-protection__edit-btn"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? '완료' : '수정'}
            </button>
          </div>

          {elderlyProfile.emergencyContactBackup && (
            <div className="elderly-protection__contact elderly-protection__contact--backup">
              <div className="elderly-protection__contact-header">
                <h3 className="elderly-protection__contact-name">
                  {elderlyProfile.emergencyContactBackup.name}
                </h3>
                <span className="elderly-protection__contact-relationship">
                  보조 연락처
                </span>
              </div>
              <p className="elderly-protection__contact-phone">
                ☎ {elderlyProfile.emergencyContactBackup.phone}
              </p>
              <p className="elderly-protection__contact-role">
                주요 보호자 불가능 시 연락
              </p>
            </div>
          )}
        </section>

        {/* 정기적 모니터링 */}
        <section className="elderly-protection__card">
          <h2 className="elderly-protection__card-title">정기적 모니터링</h2>

          <div className="elderly-protection__setting-item">
            <div className="elderly-protection__setting-header">
              <h3 className="elderly-protection__setting-title">일일 확인</h3>
              <label className="elderly-protection__toggle">
                <input
                  type="checkbox"
                  checked={elderlyProfile.dailyCheckInEnabled}
                  onChange={() => handleToggleSetting('dailyCheckInEnabled')}
                  aria-label="일일 확인 활성화"
                />
                <span className="elderly-protection__toggle-slider"></span>
              </label>
            </div>
            {elderlyProfile.dailyCheckInEnabled && (
              <div className="elderly-protection__time-setting">
                <label htmlFor="check-in-time" className="elderly-protection__label">
                  확인 시간
                </label>
                <input
                  id="check-in-time"
                  type="time"
                  value={elderlyProfile.regularCheckInTime || '14:00'}
                  onChange={(e) =>
                    setElderlyProfile({
                      ...elderlyProfile,
                      regularCheckInTime: e.target.value,
                    })
                  }
                  className="elderly-protection__time-input"
                />
                <p className="elderly-protection__setting-desc">
                  매일 이 시간에 안내 전화나 메시지가 발송됩니다
                </p>
              </div>
            )}
          </div>

          <div className="elderly-protection__setting-item">
            <div className="elderly-protection__setting-header">
              <h3 className="elderly-protection__setting-title">주간 통계 리포트</h3>
              <label className="elderly-protection__toggle">
                <input
                  type="checkbox"
                  checked={elderlyProfile.weeklyReportEnabled}
                  onChange={() => handleToggleSetting('weeklyReportEnabled')}
                  aria-label="주간 리포트 활성화"
                />
                <span className="elderly-protection__toggle-slider"></span>
              </label>
            </div>
            {elderlyProfile.weeklyReportEnabled && (
              <p className="elderly-protection__setting-desc">
                매주 월요일에 송금 내역과 건강 팁을 보호자에게 전송합니다
              </p>
            )}
          </div>
        </section>

        {/* 의심 거래 모니터링 */}
        <section className="elderly-protection__card">
          <h2 className="elderly-protection__card-title">의심 거래 감시</h2>

          <div className="elderly-protection__setting-item">
            <label htmlFor="threshold" className="elderly-protection__label">
              의심 거래 기준액
            </label>
            <div className="elderly-protection__threshold-input">
              <input
                id="threshold"
                type="number"
                value={elderlyProfile.suspiciousActivityThreshold}
                onChange={(e) =>
                  setElderlyProfile({
                    ...elderlyProfile,
                    suspiciousActivityThreshold: Number(e.target.value),
                  })
                }
                className="elderly-protection__input-number"
                min="100000"
                step="100000"
              />
              <span className="elderly-protection__currency">원</span>
            </div>
            <p className="elderly-protection__setting-desc">
              이 금액 이상 송금 시 심화된 보안 검사를 수행합니다
            </p>
          </div>
        </section>

        {/* 알림 설정 */}
        <section className="elderly-protection__card">
          <h2 className="elderly-protection__card-title">알림 설정</h2>

          <div className="elderly-protection__notification-item">
            <label className="elderly-protection__notification-label">
              <input
                type="checkbox"
                checked={elderlyProfile.notificationPreferences.smsAlert}
                onChange={() => handleNotificationToggle('smsAlert')}
                aria-label="SMS 알림"
              />
              <span>SMS 알림</span>
            </label>
            <p className="elderly-protection__setting-desc">
              송금 시 휴대폰으로 확인 메시지를 받습니다
            </p>
          </div>

          <div className="elderly-protection__notification-item">
            <label className="elderly-protection__notification-label">
              <input
                type="checkbox"
                checked={elderlyProfile.notificationPreferences.phoneCall}
                onChange={() => handleNotificationToggle('phoneCall')}
                aria-label="전화 알림"
              />
              <span>전화 알림</span>
            </label>
            <p className="elderly-protection__setting-desc">
              의심 거래 감지 시 자동 전화로 확인합니다
            </p>
          </div>

          <div className="elderly-protection__notification-item">
            <label className="elderly-protection__notification-label">
              <input
                type="checkbox"
                checked={elderlyProfile.notificationPreferences.familyNotification}
                onChange={() => handleNotificationToggle('familyNotification')}
                aria-label="가족 알림"
              />
              <span>가족 알림</span>
            </label>
            <p className="elderly-protection__setting-desc">
              모든 송금 내역을 보호자에게 실시간 알립니다
            </p>
          </div>
        </section>

        {/* 도움말 */}
        <section className="elderly-protection__help-section">
          <h2 className="elderly-protection__help-title">보호 기능 안내</h2>
          <ul className="elderly-protection__help-list">
            <li>🛡️ <strong>24시간 모니터링</strong> - 의심 거래를 실시간으로 감시합니다</li>
            <li>👨‍👩‍👧 <strong>가족 공동 관리</strong> - 여러 보호자가 함께 관리할 수 있습니다</li>
            <li>📞 <strong>긴급 연락</strong> - 문제 발생 시 즉시 보호자에게 알립니다</li>
            <li>💳 <strong>스마트 한도</strong> - 시간대와 관계에 따라 자동으로 조정됩니다</li>
            <li>✍️ <strong>정기 리포트</strong> - 주간 통계로 패턴을 파악할 수 있습니다</li>
          </ul>
        </section>
      </main>

      <footer className="elderly-protection__footer">
        <button
          className="elderly-protection__save-btn"
          onClick={() => {
            alert('설정이 저장되었습니다');
          }}
        >
          설정 저장
        </button>
      </footer>
    </div>
  );
};
