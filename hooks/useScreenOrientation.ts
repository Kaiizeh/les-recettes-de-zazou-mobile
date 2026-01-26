import { useCallback, useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

export function useScreenOrientation() {
  const lockToLandscape = useCallback(async () => {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );
    } catch (error) {
      console.warn('Could not lock to landscape:', error);
    }
  }, []);

  const lockToPortrait = useCallback(async () => {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    } catch (error) {
      console.warn('Could not lock to portrait:', error);
    }
  }, []);

  const unlock = useCallback(async () => {
    try {
      await ScreenOrientation.unlockAsync();
    } catch (error) {
      console.warn('Could not unlock orientation:', error);
    }
  }, []);

  return { lockToLandscape, lockToPortrait, unlock };
}

export function useLandscapeOrientation() {
  const { lockToLandscape, unlock } = useScreenOrientation();

  useEffect(() => {
    lockToLandscape();
    return () => {
      unlock();
    };
  }, [lockToLandscape, unlock]);
}

export function usePortraitOrientation() {
  const { lockToPortrait, unlock } = useScreenOrientation();

  useEffect(() => {
    lockToPortrait();
    return () => {
      unlock();
    };
  }, [lockToPortrait, unlock]);
}
