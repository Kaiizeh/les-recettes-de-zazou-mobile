import { createAudioPlayer, setAudioModeAsync, AudioPlayer } from 'expo-audio';

let timerPlayer: AudioPlayer | null = null;

export const playTimerEndSound = async () => {
  try {
    // Clean up any existing player
    if (timerPlayer) {
      timerPlayer.remove();
      timerPlayer = null;
    }

    timerPlayer = createAudioPlayer({
      uri: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3',
    });

    timerPlayer.play();

    // Auto cleanup after playing (check periodically)
    const checkInterval = setInterval(() => {
      if (timerPlayer && !timerPlayer.playing && timerPlayer.currentTime > 0) {
        clearInterval(checkInterval);
        timerPlayer.remove();
        timerPlayer = null;
      }
    }, 500);

    // Safety cleanup after 10 seconds max
    setTimeout(() => {
      clearInterval(checkInterval);
      if (timerPlayer) {
        timerPlayer.remove();
        timerPlayer = null;
      }
    }, 10000);
  } catch (error) {
    console.warn('Could not play timer sound:', error);
  }
};

export const stopTimerEndSound = async () => {
  if (timerPlayer) {
    try {
      timerPlayer.pause();
      timerPlayer.remove();
    } catch (error) {
      console.warn('Could not stop timer sound:', error);
    }
    timerPlayer = null;
  }
};

export const configureAudio = async () => {
  try {
    await setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: false,
    });
  } catch (error) {
    console.warn('Could not configure audio:', error);
  }
};
