import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Camera.css';

/**
 * Camera Screen - OCR 스캔을 위한 카메라 화면
 */
export const Camera: React.FC = () => {
  const navigate = useNavigate();
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = () => {
    setIsDetecting(true);
    // 시뮬레이션: 1초 후 OCR 확인 페이지로 이동
    setTimeout(() => {
      navigate('/ocr-confirm', {
        state: {
          bank: '신한은행',
          accountNumber: '110-123-456789',
          amount: 100000
        }
      });
    }, 1000);
  };

  const handleGallery = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // 파일 선택 시 OCR 확인 페이지로 이동
      navigate('/ocr-confirm', {
        state: {
          bank: '국민은행',
          accountNumber: '123-456-789012',
          amount: 50000
        }
      });
    }
  };

  return (
    <div className="camera">
      <header className="camera__header">
        <button
          className="camera__back"
          onClick={() => navigate(-1)}
          aria-label="뒤로 가기"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
              fill="currentColor"
            />
          </svg>
        </button>
        <h1 className="camera__title">고지서 촬영하기</h1>
        <button
          className={`camera__flash ${flashEnabled ? 'active' : ''}`}
          onClick={() => setFlashEnabled(!flashEnabled)}
          aria-label={flashEnabled ? '플래시 끄기' : '플래시 켜기'}
          aria-pressed={flashEnabled}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 2v11h3v9l7-12h-4l4-8z"
              fill="currentColor"
            />
          </svg>
        </button>
      </header>

      <div className="camera__viewfinder">
        <div className="camera__guide">
          <div className="camera__guide-frame">
            {isDetecting && (
              <div className="camera__detecting">
                <svg className="camera__check" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                    fill="currentColor"
                  />
                </svg>
                <p className="camera__detecting-text">번호를 찾았습니다!</p>
              </div>
            )}
          </div>
          <p className="camera__instruction">
            고지서의 계좌번호가<br />
            초록색 틀 안에 들어오도록<br />
            맞춰주세요
          </p>
        </div>
      </div>

      <div className="camera__controls">
        <button
          className="camera__control-btn"
          onClick={handleGallery}
          aria-label="앨범에서 가져오기"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
              fill="currentColor"
            />
          </svg>
          <span>앨범</span>
        </button>

        <button
          className="camera__capture"
          onClick={handleCapture}
          disabled={isDetecting}
          aria-label="사진 촬영하기"
        >
          <span className="camera__capture-ring">
            <span className="camera__capture-inner"></span>
          </span>
        </button>

        <div className="camera__control-placeholder"></div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        aria-hidden="true"
      />
    </div>
  );
};
