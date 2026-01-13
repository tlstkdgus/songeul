import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransferLimitConfig, FamilyRelationship } from '../../types';
import './TransferLimit.css';

/**
 * Transfer Limit Configuration Screen
 * 관계별, 시간대별 송금 한도 설정
 */
export const TransferLimit: React.FC = () => {
  const navigate = useNavigate();
  const [limitConfig, setLimitConfig] = useState<TransferLimitConfig>({
    id: '1',
    type: 'daily',
    baseLimit: 5000000,
    byRelationship: {
      child: 10000000,
      spouse: 20000000,
      parent: 5000000,
      sibling: 3000000,
      grandchild: 2000000,
      extended: 1000000,
      caregiver: 500000,
      legal_guardian: 20000000,
    },
    byTimeOfDay: {
      morning: 5000000,
      afternoon: 5000000,
      evening: 3000000,
      night: 1000000,
    },
    lastUpdated: new Date(),
  });

  const [selectedTab, setSelectedTab] = useState<'base' | 'relationship' | 'time'>('base');
  const [showHelp, setShowHelp] = useState(false);

  const relationshipLabels: Record<FamilyRelationship, string> = {
    child: '자녀',
    spouse: '배우자',
    parent: '부모',
    sibling: '형제자매',
    grandchild: '손주',
    extended: '친척',
    caregiver: '요양보호사',
    legal_guardian: '법정후견인',
  };

  const handleBaseLimitChange = (value: number) => {
    setLimitConfig({
      ...limitConfig,
      baseLimit: value,
      lastUpdated: new Date(),
    });
  };

  const handleRelationshipLimitChange = (relationship: FamilyRelationship, value: number) => {
    setLimitConfig({
      ...limitConfig,
      byRelationship: {
        ...limitConfig.byRelationship,
        [relationship]: value,
      },
      lastUpdated: new Date(),
    });
  };

  const handleTimeOfDayChange = (period: 'morning' | 'afternoon' | 'evening' | 'night', value: number) => {
    setLimitConfig({
      ...limitConfig,
      byTimeOfDay: {
        ...limitConfig.byTimeOfDay,
        [period]: value,
      },
      lastUpdated: new Date(),
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="transfer-limit">
      <header className="transfer-limit__header">
        <button
          className="transfer-limit__back"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
        >
          ←
        </button>
        <h1 className="transfer-limit__title">송금 한도 설정</h1>
        <button
          className="transfer-limit__help"
          onClick={() => setShowHelp(!showHelp)}
          aria-label="도움말"
        >
          ?
        </button>
      </header>

      {showHelp && (
        <div className="transfer-limit__help-box">
          <p className="transfer-limit__help-text">
            송금 한도는 사기와 부정 거래를 방지하기 위해 설정합니다. 
            <br />
            기본 한도보다 높은 금액 송금 시 보호자 승인이 필요합니다.
          </p>
        </div>
      )}

      <main className="transfer-limit__content">
        {/* 탭 */}
        <div className="transfer-limit__tabs">
          <button
            className={`transfer-limit__tab ${selectedTab === 'base' ? 'transfer-limit__tab--active' : ''}`}
            onClick={() => setSelectedTab('base')}
          >
            기본 한도
          </button>
          <button
            className={`transfer-limit__tab ${selectedTab === 'relationship' ? 'transfer-limit__tab--active' : ''}`}
            onClick={() => setSelectedTab('relationship')}
          >
            관계별
          </button>
          <button
            className={`transfer-limit__tab ${selectedTab === 'time' ? 'transfer-limit__tab--active' : ''}`}
            onClick={() => setSelectedTab('time')}
          >
            시간대별
          </button>
        </div>

        {/* 기본 한도 */}
        {selectedTab === 'base' && (
          <section className="transfer-limit__section">
            <h2 className="transfer-limit__section-title">일일 기본 송금 한도</h2>
            <p className="transfer-limit__section-desc">
              이 금액 이상 송금 시 보호자 승인이 필요합니다
            </p>

            <div className="transfer-limit__input-group">
              <div className="transfer-limit__display-value">
                {formatCurrency(limitConfig.baseLimit)}
              </div>
              <input
                type="range"
                min="100000"
                max="50000000"
                step="100000"
                value={limitConfig.baseLimit}
                onChange={(e) => handleBaseLimitChange(Number(e.target.value))}
                className="transfer-limit__slider"
              />
              <div className="transfer-limit__slider-labels">
                <span>100만원</span>
                <span>5천만원</span>
              </div>
            </div>

            <div className="transfer-limit__quick-buttons">
              {[1000000, 3000000, 5000000, 10000000].map((amount) => (
                <button
                  key={amount}
                  className={`transfer-limit__quick-btn ${
                    limitConfig.baseLimit === amount ? 'transfer-limit__quick-btn--selected' : ''
                  }`}
                  onClick={() => handleBaseLimitChange(amount)}
                >
                  {formatCurrency(amount)}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* 관계별 한도 */}
        {selectedTab === 'relationship' && (
          <section className="transfer-limit__section">
            <h2 className="transfer-limit__section-title">관계별 송금 한도</h2>
            <p className="transfer-limit__section-desc">
              상대방과의 관계에 따라 다른 한도를 설정합니다
            </p>

            {Object.entries(relationshipLabels).map(([relationship, label]) => (
              <div key={relationship} className="transfer-limit__relationship-item">
                <label className="transfer-limit__relationship-label">{label}</label>
                <div className="transfer-limit__input-group-small">
                  <input
                    type="number"
                    value={limitConfig.byRelationship[relationship as FamilyRelationship]}
                    onChange={(e) =>
                      handleRelationshipLimitChange(
                        relationship as FamilyRelationship,
                        Number(e.target.value)
                      )
                    }
                    className="transfer-limit__input-number"
                    min="0"
                    step="100000"
                  />
                  <span className="transfer-limit__currency">원</span>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* 시간대별 한도 */}
        {selectedTab === 'time' && (
          <section className="transfer-limit__section">
            <h2 className="transfer-limit__section-title">시간대별 송금 한도</h2>
            <p className="transfer-limit__section-desc">
              시간대에 따라 송금 한도를 제한합니다 (야간 사기 방지)
            </p>

            <div className="transfer-limit__time-periods">
              <div className="transfer-limit__time-item">
                <div className="transfer-limit__time-header">
                  <span className="transfer-limit__time-name">아침</span>
                  <span className="transfer-limit__time-range">06:00 - 12:00</span>
                </div>
                <div className="transfer-limit__input-group-small">
                  <input
                    type="number"
                    value={limitConfig.byTimeOfDay?.morning || 0}
                    onChange={(e) => handleTimeOfDayChange('morning', Number(e.target.value))}
                    className="transfer-limit__input-number"
                    min="0"
                    step="100000"
                  />
                  <span className="transfer-limit__currency">원</span>
                </div>
              </div>

              <div className="transfer-limit__time-item">
                <div className="transfer-limit__time-header">
                  <span className="transfer-limit__time-name">오후</span>
                  <span className="transfer-limit__time-range">12:00 - 18:00</span>
                </div>
                <div className="transfer-limit__input-group-small">
                  <input
                    type="number"
                    value={limitConfig.byTimeOfDay?.afternoon || 0}
                    onChange={(e) => handleTimeOfDayChange('afternoon', Number(e.target.value))}
                    className="transfer-limit__input-number"
                    min="0"
                    step="100000"
                  />
                  <span className="transfer-limit__currency">원</span>
                </div>
              </div>

              <div className="transfer-limit__time-item">
                <div className="transfer-limit__time-header">
                  <span className="transfer-limit__time-name">저녁</span>
                  <span className="transfer-limit__time-range">18:00 - 24:00</span>
                </div>
                <div className="transfer-limit__input-group-small">
                  <input
                    type="number"
                    value={limitConfig.byTimeOfDay?.evening || 0}
                    onChange={(e) => handleTimeOfDayChange('evening', Number(e.target.value))}
                    className="transfer-limit__input-number"
                    min="0"
                    step="100000"
                  />
                  <span className="transfer-limit__currency">원</span>
                </div>
              </div>

              <div className="transfer-limit__time-item">
                <div className="transfer-limit__time-header">
                  <span className="transfer-limit__time-name">야간</span>
                  <span className="transfer-limit__time-range">00:00 - 06:00</span>
                </div>
                <div className="transfer-limit__input-group-small">
                  <input
                    type="number"
                    value={limitConfig.byTimeOfDay?.night || 0}
                    onChange={(e) => handleTimeOfDayChange('night', Number(e.target.value))}
                    className="transfer-limit__input-number"
                    min="0"
                    step="100000"
                  />
                  <span className="transfer-limit__currency">원</span>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="transfer-limit__footer">
        <p className="transfer-limit__last-updated">
          마지막 수정: {limitConfig.lastUpdated.toLocaleString('ko-KR')}
        </p>
        <button
          className="transfer-limit__save-btn"
          onClick={() => {
            alert('설정이 저장되었습니다');
            navigate(-1);
          }}
        >
          저장
        </button>
      </footer>
    </div>
  );
};
