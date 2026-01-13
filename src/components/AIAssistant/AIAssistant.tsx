import React, { useState } from 'react';
import { useHaptic, useTTS } from '../../hooks/useAccessibility';
import './AIAssistant.css';

interface AIAssistantProps {
  onActivate?: () => void;
}

/**
 * AIAssistant Component
 * AI 비서 플로팅 버튼 (음성 인터랙션)
 */
export const AIAssistant: React.FC<AIAssistantProps> = ({ onActivate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { vibrate } = useHaptic();
  const { speakText } = useTTS();

  const handleClick = () => {
    vibrate(20);
    setIsOpen(true);
    speakText('무엇을 도와드릴까요?');
    onActivate?.();
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsListening(false);
  };

  const handleQuickAction = (action: string, text: string) => {
    vibrate(10);
    speakText(text);
    setIsListening(true);
    setTimeout(() => {
      alert(`"${action}" 기능은 실제 앱에서 작동합니다`);
      setIsListening(false);
    }, 2000);
  };

  return (
    <>
      <button
        className={`ai-assistant ${isListening ? 'ai-assistant--listening' : ''}`}
        onClick={handleClick}
        aria-label="AI 비서 활성화"
        aria-pressed={isListening}
      >
        <div className="ai-assistant__icon">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"
              fill="currentColor"
            />
            <circle cx="9" cy="10" r="1.5" fill="currentColor" />
            <circle cx="15" cy="10" r="1.5" fill="currentColor" />
            <path
              d="M12 14.5c1.38 0 2.5-.84 2.5-2h-5c0 1.16 1.12 2 2.5 2z"
              fill="currentColor"
            />
          </svg>
        </div>
        <span className="ai-assistant__label">AI 비서</span>
      </button>

      {isOpen && (
        <div className="ai-assistant-modal" onClick={handleClose}>
          <div className="ai-assistant-modal__content" onClick={(e) => e.stopPropagation()}>
            <header className="ai-assistant-modal__header">
              <div className="ai-assistant-modal__avatar">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h2 className="ai-assistant-modal__title">AI 비서</h2>
              <p className="ai-assistant-modal__subtitle">무엇을 도와드릴까요?</p>
              <button className="ai-assistant-modal__close" onClick={handleClose} aria-label="닫기">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
                </svg>
              </button>
            </header>

            <div className="ai-assistant-modal__body">
              {isListening && (
                <div className="ai-assistant-modal__listening">
                  <div className="ai-assistant-modal__mic">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3z"
                        fill="currentColor"
                      />
                      <path
                        d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="ai-assistant-modal__waves">
                    <span className="ai-assistant-modal__wave"></span>
                    <span className="ai-assistant-modal__wave"></span>
                    <span className="ai-assistant-modal__wave"></span>
                  </div>
                  <p className="ai-assistant-modal__listening-text">듣고 있어요...</p>
                </div>
              )}

              {!isListening && (
                <div className="ai-assistant-modal__actions">
                  <p className="ai-assistant-modal__help-text">
                    이런 것들을 도와드릴 수 있어요
                  </p>

                  <button
                    className="ai-assistant-modal__action-btn"
                    onClick={() => handleQuickAction('잔액 확인', '지금 통장에 500,000원이 있어요')}
                  >
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" fill="currentColor"/>
                    </svg>
                    <div>
                      <span className="ai-assistant-modal__action-title">잔액 확인</span>
                      <span className="ai-assistant-modal__action-desc">통장에 얼마 있는지 알려줘</span>
                    </div>
                  </button>

                  <button
                    className="ai-assistant-modal__action-btn"
                    onClick={() => handleQuickAction('최근 거래 내역', '최근 거래 내역을 확인하고 있어요')}
                  >
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" fill="currentColor"/>
                    </svg>
                    <div>
                      <span className="ai-assistant-modal__action-title">최근 거래 내역</span>
                      <span className="ai-assistant-modal__action-desc">언제 돈을 썼는지 확인</span>
                    </div>
                  </button>

                  <button
                    className="ai-assistant-modal__action-btn"
                    onClick={() => handleQuickAction('송금 도움', '누구에게 보내실건가요?')}
                  >
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor"/>
                    </svg>
                    <div>
                      <span className="ai-assistant-modal__action-title">송금 도움</span>
                      <span className="ai-assistant-modal__action-desc">돈 보내는 방법 알려줘</span>
                    </div>
                  </button>

                  <button
                    className="ai-assistant-modal__action-btn"
                    onClick={() => handleQuickAction('사용법 설명', '어떤 기능이 궁금하신가요?')}
                  >
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" fill="currentColor"/>
                    </svg>
                    <div>
                      <span className="ai-assistant-modal__action-title">사용법 설명</span>
                      <span className="ai-assistant-modal__action-desc">이 앱 어떻게 쓰는지 알려줘</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <div className="ai-assistant-modal__footer">
              <button className="ai-assistant-modal__voice-btn" onClick={() => setIsListening(!isListening)}>
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3z"
                    fill="currentColor"
                  />
                  <path
                    d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"
                    fill="currentColor"
                  />
                </svg>
                음성으로 말하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
