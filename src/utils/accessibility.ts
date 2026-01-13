/**
 * Accessibility Utilities
 * WCAG AAA 준수를 위한 유틸리티 함수들
 */

/**
 * 색상 대비율 계산 (WCAG 기준)
 * @param color1 - 첫 번째 색상 (hex)
 * @param color2 - 두 번째 색상 (hex)
 * @returns 대비율 (1-21)
 */
export const calculateContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (hex: string): number => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    const [rs, gs, bs] = [r, g, b].map((c) => {
      const sRGB = c / 255;
      return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
};

/**
 * WCAG 기준 충족 여부 확인
 * @param contrastRatio - 대비율
 * @param level - WCAG 레벨 ('AA' | 'AAA')
 * @param size - 텍스트 크기 ('normal' | 'large')
 * @returns 충족 여부
 */
export const meetsWCAGStandard = (
  contrastRatio: number,
  level: 'AA' | 'AAA' = 'AAA',
  size: 'normal' | 'large' = 'normal'
): boolean => {
  if (level === 'AAA') {
    return size === 'large' ? contrastRatio >= 4.5 : contrastRatio >= 7;
  }
  return size === 'large' ? contrastRatio >= 3 : contrastRatio >= 4.5;
};

/**
 * 화면 리더를 위한 텍스트 생성
 * @param text - 원본 텍스트
 * @returns 화면 리더 친화적 텍스트
 */
export const getScreenReaderText = (text: string): string => {
  return text
    .replace(/\$/g, '달러 ')
    .replace(/₩/g, '원 ')
    .replace(/\d{1,3}(,\d{3})*/g, (match) => {
      const number = match.replace(/,/g, '');
      return `${number} `;
    });
};

/**
 * 금액을 음성 친화적 텍스트로 변환
 * @param amount - 금액
 * @returns 음성 친화적 텍스트
 */
export const formatAmountForSpeech = (amount: number): string => {
  const formatted = amount.toLocaleString('ko-KR');
  return `${formatted}원`;
};

/**
 * 날짜를 음성 친화적 텍스트로 변환
 * @param date - Date 객체
 * @returns 음성 친화적 텍스트
 */
export const formatDateForSpeech = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
};

/**
 * 계좌번호를 음성 친화적 텍스트로 변환
 * @param accountNumber - 계좌번호
 * @returns 음성 친화적 텍스트
 */
export const formatAccountNumberForSpeech = (accountNumber: string): string => {
  return accountNumber
    .split('')
    .map((digit) => {
      if (digit === '-') return '하이픈';
      return digit;
    })
    .join(' ');
};

/**
 * TTS (Text-to-Speech) 실행
 * @param text - 읽을 텍스트
 * @param options - Speech Synthesis 옵션
 */
export const speak = (
  text: string,
  options: {
    rate?: number;
    pitch?: number;
    volume?: number;
    lang?: string;
  } = {}
): void => {
  if (!('speechSynthesis' in window)) {
    console.warn('TTS not supported in this browser');
    return;
  }

  // 기존 음성 중단
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = options.lang || 'ko-KR';
  utterance.rate = options.rate || 0.9; // 느리게 읽기
  utterance.pitch = options.pitch || 1.0;
  utterance.volume = options.volume || 1.0;

  window.speechSynthesis.speak(utterance);
};

/**
 * TTS 중단
 */
export const stopSpeaking = (): void => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

/**
 * 햅틱 피드백 실행
 * @param pattern - 진동 패턴 (밀리초)
 */
export const triggerHapticFeedback = (pattern: number | number[] = 10): void => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};

/**
 * 포커스 트랩 설정 (모달 등에서 사용)
 * @param element - 포커스를 트랩할 요소
 * @returns cleanup 함수
 */
export const setupFocusTrap = (element: HTMLElement): (() => void) => {
  const focusableElements = element.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  };

  element.addEventListener('keydown', handleKeyDown);

  // 초기 포커스
  firstFocusable?.focus();

  // Cleanup function
  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
};

/**
 * 스크린 리더에게 메시지 알림
 * @param message - 알릴 메시지
 * @param priority - 우선순위 ('polite' | 'assertive')
 */
export const announceToScreenReader = (
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * 키보드 네비게이션 헬퍼
 * @param event - 키보드 이벤트
 * @param callbacks - 키별 콜백 함수
 */
export const handleKeyboardNavigation = (
  event: React.KeyboardEvent,
  callbacks: {
    onEnter?: () => void;
    onSpace?: () => void;
    onEscape?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
  }
): void => {
  switch (event.key) {
    case 'Enter':
      callbacks.onEnter?.();
      break;
    case ' ':
      event.preventDefault();
      callbacks.onSpace?.();
      break;
    case 'Escape':
      callbacks.onEscape?.();
      break;
    case 'ArrowUp':
      event.preventDefault();
      callbacks.onArrowUp?.();
      break;
    case 'ArrowDown':
      event.preventDefault();
      callbacks.onArrowDown?.();
      break;
    case 'ArrowLeft':
      callbacks.onArrowLeft?.();
      break;
    case 'ArrowRight':
      callbacks.onArrowRight?.();
      break;
  }
};
