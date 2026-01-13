import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './OCRConfirm.css';

interface OCRData {
  bank: string;
  accountNumber: string;
  amount: number;
  recipientName?: string;
  nickname?: string;
}

/**
 * OCR Confirmation Screen - 스캔된 정보 확인 및 수정
 */
export const OCRConfirm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state as OCRData || {
    bank: '신한은행',
    accountNumber: '110-123-456789',
    amount: 100000
  };

  const [data, setData] = useState<OCRData>(initialData);
  const [editingField, setEditingField] = useState<string | null>(null);
  const recipientName = initialData.recipientName || initialData.nickname || '수취인';

  // TTS 음성 읽기
  const handleSpeak = () => {
    const text = `${data.bank} ${data.accountNumber}, ${formatAmount(data.amount)}원을 보낼까요?`;

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      alert(text);
    }
  };

  useEffect(() => {
    // 페이지 로드 시 자동으로 읽기
    const timer = setTimeout(handleSpeak, 500);
    return () => clearTimeout(timer);
  }, []);

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('ko-KR');
  };

  const handleEdit = (field: string) => {
    setEditingField(field);
  };

  const handleConfirm = () => {
    navigate('/security-check', { state: data });
  };

  return (
    <div className="ocr-confirm">
      <header className="ocr-confirm__header">
        <button
          className="ocr-confirm__back"
          onClick={() => navigate(-1)}
          aria-label="뒤로 가기"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
          </svg>
        </button>
        <h1 className="ocr-confirm__title">정보 확인</h1>
        <button
          className="ocr-confirm__speak"
          onClick={handleSpeak}
          aria-label="다시 듣기"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
              fill="currentColor"
            />
          </svg>
        </button>
      </header>

      <main className="ocr-confirm__content">
        <p className="ocr-confirm__instruction">
          스캔한 정보가 맞는지<br />
          확인해주세요
        </p>

        {/* 받는 분 카드 */}
        <div className="ocr-confirm__card ocr-confirm__card--recipient">
          <span className="ocr-confirm__label">받는 분</span>
          <p className="ocr-confirm__value ocr-confirm__value--recipient">
            {recipientName}
          </p>
        </div>

        <div className="ocr-confirm__cards">
          {/* 은행명 카드 */}
          <div className="ocr-confirm__card">
            <div className="ocr-confirm__card-header">
              <span className="ocr-confirm__label">은행</span>
              {editingField !== 'bank' && (
                <button
                  className="ocr-confirm__edit-btn"
                  onClick={() => handleEdit('bank')}
                  aria-label="은행 수정"
                >
                  수정
                </button>
              )}
            </div>
            {editingField === 'bank' ? (
              <input
                className="ocr-confirm__input"
                type="text"
                value={data.bank}
                onChange={(e) => setData({ ...data, bank: e.target.value })}
                onBlur={() => setEditingField(null)}
                autoFocus
                aria-label="은행명 입력"
              />
            ) : (
              <p className="ocr-confirm__value">{data.bank}</p>
            )}
          </div>

          {/* 계좌번호 카드 */}
          <div className="ocr-confirm__card">
            <div className="ocr-confirm__card-header">
              <span className="ocr-confirm__label">계좌번호</span>
              {editingField !== 'accountNumber' && (
                <button
                  className="ocr-confirm__edit-btn"
                  onClick={() => handleEdit('accountNumber')}
                  aria-label="계좌번호 수정"
                >
                  수정
                </button>
              )}
            </div>
            {editingField === 'accountNumber' ? (
              <input
                className="ocr-confirm__input"
                type="tel"
                value={data.accountNumber}
                onChange={(e) => setData({ ...data, accountNumber: e.target.value })}
                onBlur={() => setEditingField(null)}
                autoFocus
                aria-label="계좌번호 입력"
              />
            ) : (
              <p className="ocr-confirm__value ocr-confirm__value--number">
                {data.accountNumber}
              </p>
            )}
          </div>

          {/* 금액 카드 */}
          <div className="ocr-confirm__card">
            <div className="ocr-confirm__card-header">
              <span className="ocr-confirm__label">보낼 금액</span>
              {editingField !== 'amount' && (
                <button
                  className="ocr-confirm__edit-btn"
                  onClick={() => handleEdit('amount')}
                  aria-label="금액 수정"
                >
                  수정
                </button>
              )}
            </div>
            {editingField === 'amount' ? (
              <input
                className="ocr-confirm__input"
                type="number"
                value={data.amount}
                onChange={(e) => setData({ ...data, amount: Number(e.target.value) })}
                onBlur={() => setEditingField(null)}
                autoFocus
                aria-label="금액 입력"
              />
            ) : (
              <p className="ocr-confirm__value ocr-confirm__value--amount">
                {formatAmount(data.amount)}원
              </p>
            )}
          </div>
        </div>

        <div className="ocr-confirm__summary">
          <svg className="ocr-confirm__summary-icon" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              fill="currentColor"
            />
          </svg>
          <p className="ocr-confirm__summary-text">
            <strong>{data.bank}</strong> {data.accountNumber}로<br />
            <strong className="ocr-confirm__amount-highlight">
              {formatAmount(data.amount)}원
            </strong>을 보냅니다
          </p>
        </div>
      </main>

      <div className="ocr-confirm__actions">
        <button
          className="ocr-confirm__btn ocr-confirm__btn--secondary"
          onClick={() => navigate(-1)}
        >
          다시 찍기
        </button>
        <button
          className="ocr-confirm__btn ocr-confirm__btn--primary"
          onClick={handleConfirm}
        >
          확인했어요
        </button>
      </div>
    </div>
  );
};
