import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddSafeAccount.css';

const EMOJI_OPTIONS = ['👨', '👩', '👦', '👧', '👴', '👵', '🏠', '💼', '🏥', '🏫', '⚡', '💰'];
const BANK_OPTIONS = ['신한은행', '국민은행', '우리은행', '하나은행', 'NH농협', '카카오뱅크'];

/**
 * Add Safe Account Screen - 안심 계좌 등록
 */
export const AddSafeAccount: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nickname: '',
    bank: '',
    accountNumber: '',
    emoji: ''
  });
  const [verifiedName, setVerifiedName] = useState('');

  const handleNext = () => {
    if (step === 1 && !formData.nickname) {
      alert('별명을 입력해주세요');
      return;
    }
    if (step === 2 && !formData.bank) {
      alert('은행을 선택해주세요');
      return;
    }
    if (step === 3 && !formData.accountNumber) {
      alert('계좌번호를 입력해주세요');
      return;
    }

    if (step === 3) {
      // 계좌번호 검증 시뮬레이션
      setTimeout(() => {
        setVerifiedName('김철수');
        setStep(4);
      }, 1000);
    } else if (step === 4) {
      setStep(5);
    } else {
      setStep(step + 1);
    }
  };

  const handleComplete = () => {
    alert('안심 계좌가 등록되었습니다!');
    navigate('/safe-accounts');
  };

  return (
    <div className="add-safe-account">
      <header className="add-safe-account__header">
        <button
          className="add-safe-account__back"
          onClick={() => navigate(-1)}
          aria-label="뒤로 가기"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
          </svg>
        </button>
        <h1 className="add-safe-account__title">안심 계좌 등록</h1>
        <div className="add-safe-account__spacer"></div>
      </header>

      <div className="add-safe-account__progress">
        <div
          className="add-safe-account__progress-bar"
          style={{ width: `${(step / 5) * 100}%` }}
        />
      </div>

      <main className="add-safe-account__content">
        {step === 1 && (
          <div className="add-safe-account__step">
            <h2 className="add-safe-account__question">
              누구에게<br />보낼 계좌인가요?
            </h2>
            <p className="add-safe-account__description">
              나중에 쉽게 찾을 수 있도록<br />
              별명을 지어주세요
            </p>
            <input
              type="text"
              className="add-safe-account__input"
              placeholder="예: 우리 아들, 월세"
              value={formData.nickname}
              onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
              autoFocus
              aria-label="별명 입력"
            />
          </div>
        )}

        {step === 2 && (
          <div className="add-safe-account__step">
            <h2 className="add-safe-account__question">
              어느 은행<br />계좌인가요?
            </h2>
            <div className="add-safe-account__grid">
              {BANK_OPTIONS.map((bank) => (
                <button
                  key={bank}
                  className={`add-safe-account__option ${
                    formData.bank === bank ? 'selected' : ''
                  }`}
                  onClick={() => setFormData({ ...formData, bank })}
                >
                  {bank}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="add-safe-account__step">
            <h2 className="add-safe-account__question">
              계좌번호를<br />입력해주세요
            </h2>
            <p className="add-safe-account__description">
              {formData.bank}
            </p>
            <input
              type="tel"
              className="add-safe-account__input add-safe-account__input--number"
              placeholder="000-0000-0000"
              value={formData.accountNumber}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
              autoFocus
              aria-label="계좌번호 입력"
            />
          </div>
        )}

        {step === 4 && (
          <div className="add-safe-account__step">
            <h2 className="add-safe-account__question">
              이 분이<br />맞으신가요?
            </h2>
            <div className="add-safe-account__verification">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  fill="currentColor"
                />
              </svg>
              <p className="add-safe-account__verified-name">{verifiedName}</p>
              <p className="add-safe-account__verified-info">
                {formData.bank}<br />
                {formData.accountNumber}
              </p>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="add-safe-account__step">
            <h2 className="add-safe-account__question">
              아이콘을<br />선택해주세요
            </h2>
            <p className="add-safe-account__description">
              목록에서 쉽게 찾을 수 있어요
            </p>
            <div className="add-safe-account__emoji-grid">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  className={`add-safe-account__emoji ${
                    formData.emoji === emoji ? 'selected' : ''
                  }`}
                  onClick={() => setFormData({ ...formData, emoji })}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      <div className="add-safe-account__actions">
        <button
          className="add-safe-account__btn"
          onClick={step === 5 ? handleComplete : handleNext}
        >
          {step === 5 ? '완료' : '다음'}
        </button>
      </div>
    </div>
  );
};
