import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SafeAccounts.css';

interface SafeAccount {
  id: string;
  emoji: string;
  nickname: string;
  bank: string;
  accountNumber: string;
  realName: string;
}

/**
 * Safe Account List Screen - 안심 계좌 목록
 */
export const SafeAccounts: React.FC = () => {
  const navigate = useNavigate();

  const [accounts] = useState<SafeAccount[]>([
    {
      id: '1',
      emoji: '👨',
      nickname: '우리 아들',
      bank: '신한은행',
      accountNumber: '110-123-456789',
      realName: '김철수'
    },
    {
      id: '2',
      emoji: '👩',
      nickname: '우리 딸',
      bank: '국민은행',
      accountNumber: '123-456-789012',
      realName: '김영희'
    },
    {
      id: '3',
      emoji: '🏠',
      nickname: '매달 내는 월세',
      bank: '우리은행',
      accountNumber: '987-654-321098',
      realName: '박지주'
    }
  ]);

  const handleSelectAccount = (account: SafeAccount) => {
    navigate('/transfer', {
      state: {
        bank: account.bank,
        accountNumber: account.accountNumber,
        recipientName: account.realName,
        nickname: account.nickname
      }
    });
  };

  const handleAddAccount = () => {
    navigate('/add-safe-account');
  };

  return (
    <div className="safe-accounts">
      <header className="safe-accounts__header">
        <button
          className="safe-accounts__back"
          onClick={() => navigate(-1)}
          aria-label="뒤로 가기"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
          </svg>
        </button>
        <h1 className="safe-accounts__title">안심 계좌</h1>
        <div className="safe-accounts__spacer"></div>
      </header>

      <main className="safe-accounts__content">
        <p className="safe-accounts__instruction">
          자주 보내는 분들을<br />
          등록해두면 편리해요
        </p>

        <ul className="safe-accounts__list">
          {accounts.map((account) => (
            <li key={account.id} className="safe-accounts__item">
              <button
                className="safe-accounts__card"
                onClick={() => handleSelectAccount(account)}
                aria-label={`${account.nickname}에게 송금하기`}
              >
                <div className="safe-accounts__card-emoji">
                  {account.emoji}
                </div>
                <div className="safe-accounts__card-content">
                  <h3 className="safe-accounts__card-nickname">
                    {account.nickname}
                  </h3>
                  <p className="safe-accounts__card-info">
                    {account.realName} • {account.bank}
                  </p>
                  <p className="safe-accounts__card-number">
                    {account.accountNumber}
                  </p>
                </div>
                <svg className="safe-accounts__card-arrow" viewBox="0 0 24 24" fill="none">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" fill="currentColor"/>
                </svg>
              </button>
            </li>
          ))}
        </ul>

        <button
          className="safe-accounts__add-btn"
          onClick={handleAddAccount}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
              fill="currentColor"
            />
          </svg>
          새로운 안심 계좌 등록
        </button>
      </main>
    </div>
  );
};
