import { useState, useCallback, useRef, useEffect } from 'react';

const AUTO_HIDE_DELAY = 3000; // 3 seconds

export function useAutoHide(initialVisible = true) {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHideTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const scheduleHide = useCallback(() => {
    clearHideTimeout();
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, AUTO_HIDE_DELAY);
  }, [clearHideTimeout]);

  const show = useCallback(() => {
    setIsVisible(true);
    scheduleHide();
  }, [scheduleHide]);

  const hide = useCallback(() => {
    clearHideTimeout();
    setIsVisible(false);
  }, [clearHideTimeout]);

  const toggle = useCallback(() => {
    if (isVisible) {
      hide();
    } else {
      show();
    }
  }, [isVisible, show, hide]);

  // Schedule initial hide if visible
  useEffect(() => {
    if (initialVisible) {
      scheduleHide();
    }
    return () => {
      clearHideTimeout();
    };
  }, []);

  return { isVisible, show, hide, toggle };
}
