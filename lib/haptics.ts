import * as Haptics from 'expo-haptics';

export const triggerTimerEndHaptic = async () => {
  await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};

export const triggerTapHaptic = async () => {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

export const triggerNavigationHaptic = async () => {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
};
