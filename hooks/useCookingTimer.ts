import { useState, useCallback, useRef, useEffect } from 'react';
import type { TimerState } from '@/types/cooking';
import { triggerTimerEndHaptic } from '@/lib/haptics';
import { playTimerEndSound, configureAudio } from '@/lib/audio';

interface UseCookingTimerOptions {
  onComplete?: () => void;
}

export function useCookingTimer(
  initialMinutes: number = 0,
  options: UseCookingTimerOptions = {}
) {
  const [remainingSeconds, setRemainingSeconds] = useState(initialMinutes * 60);
  const [state, setState] = useState<TimerState>('idle');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleComplete = useCallback(async () => {
    clearTimerInterval();
    setState('completed');
    await triggerTimerEndHaptic();
    await playTimerEndSound();
    options.onComplete?.();
  }, [clearTimerInterval, options.onComplete]);

  const start = useCallback(async () => {
    if (state === 'running' || remainingSeconds <= 0) return;

    await configureAudio();
    setState('running');

    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [state, remainingSeconds, handleComplete]);

  const pause = useCallback(() => {
    if (state !== 'running') return;
    clearTimerInterval();
    setState('paused');
  }, [state, clearTimerInterval]);

  const resume = useCallback(() => {
    if (state !== 'paused') return;
    start();
  }, [state, start]);

  const reset = useCallback(
    (minutes: number) => {
      clearTimerInterval();
      setRemainingSeconds(minutes * 60);
      setState('idle');
    },
    [clearTimerInterval]
  );

  const togglePlayPause = useCallback(() => {
    if (state === 'idle' || state === 'paused') {
      start();
    } else if (state === 'running') {
      pause();
    }
  }, [state, start, pause]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimerInterval();
    };
  }, [clearTimerInterval]);

  // Update timer when initialMinutes changes and timer is idle
  useEffect(() => {
    if (state === 'idle') {
      setRemainingSeconds(initialMinutes * 60);
    }
  }, [initialMinutes, state]);

  return {
    remainingSeconds,
    state,
    start,
    pause,
    resume,
    reset,
    togglePlayPause,
    formattedTime: formatTime(remainingSeconds),
  };
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
