/**
 * Accessibility Custom Hooks
 * 접근성 기능을 쉽게 사용하기 위한 커스텀 훅
 */

import { useEffect, useRef, useCallback } from 'react';
import { speak, stopSpeaking, triggerHapticFeedback } from '../utils/accessibility';

/**
 * TTS (Text-to-Speech) 훅
 */
export const useTTS = () => {
  const isSpeaking = useRef(false);

  const speakText = useCallback((text: string, options?: Parameters<typeof speak>[1]) => {
    if (isSpeaking.current) {
      stopSpeaking();
    }
    isSpeaking.current = true;
    speak(text, options);
  }, []);

  const stop = useCallback(() => {
    stopSpeaking();
    isSpeaking.current = false;
  }, []);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  return { speakText, stop, isSpeaking: isSpeaking.current };
};

/**
 * 햅틱 피드백 훅
 */
export const useHaptic = () => {
  const vibrate = useCallback((pattern: number | number[] = 10) => {
    triggerHapticFeedback(pattern);
  }, []);

  const vibrateSuccess = useCallback(() => {
    triggerHapticFeedback([50, 50, 50]);
  }, []);

  const vibrateError = useCallback(() => {
    triggerHapticFeedback([100, 50, 100]);
  }, []);

  const vibrateWarning = useCallback(() => {
    triggerHapticFeedback([80]);
  }, []);

  return {
    vibrate,
    vibrateSuccess,
    vibrateError,
    vibrateWarning,
  };
};

/**
 * 포커스 관리 훅
 */
export const useFocusManagement = () => {
  const focusedElementRef = useRef<HTMLElement | null>(null);

  const saveFocus = useCallback(() => {
    focusedElementRef.current = document.activeElement as HTMLElement;
  }, []);

  const restoreFocus = useCallback(() => {
    if (focusedElementRef.current) {
      focusedElementRef.current.focus();
    }
  }, []);

  const focusElement = useCallback((selector: string) => {
    const element = document.querySelector<HTMLElement>(selector);
    if (element) {
      element.focus();
    }
  }, []);

  return {
    saveFocus,
    restoreFocus,
    focusElement,
  };
};

/**
 * 키보드 단축키 훅
 */
export const useKeyboardShortcut = (
  key: string,
  callback: () => void,
  options: {
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
  } = {}
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isCtrlMatch = options.ctrl ? event.ctrlKey || event.metaKey : true;
      const isShiftMatch = options.shift ? event.shiftKey : true;
      const isAltMatch = options.alt ? event.altKey : true;

      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        isCtrlMatch &&
        isShiftMatch &&
        isAltMatch
      ) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, callback, options]);
};

/**
 * Reduced Motion 감지 훅
 */
export const useReducedMotion = (): boolean => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  return prefersReducedMotion.matches;
};

/**
 * High Contrast 감지 훅
 */
export const useHighContrast = (): boolean => {
  const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
  return prefersHighContrast.matches;
};

/**
 * 스크린 리더 사용 감지 훅
 */
export const useScreenReader = (): boolean => {
  // 스크린 리더 사용 여부는 완벽하게 감지하기 어렵지만,
  // aria-live 영역이 있는지 확인하거나 다른 휴리스틱을 사용
  return false; // 실제 구현시 더 정교한 로직 필요
};

/**
 * Announcement 훅 (스크린 리더에게 알림)
 */
export const useAnnouncement = () => {
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
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
  }, []);

  return { announce };
};
