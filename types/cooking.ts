export type TimerState = 'idle' | 'running' | 'paused' | 'completed';

export interface CookingState {
  currentStepIndex: number;
  isProgressBarVisible: boolean;
  timerState: TimerState;
  remainingSeconds: number;
}

export interface RecipeProgress {
  recipeId: string;
  currentStepIndex: number;
  timerRemainingSeconds?: number;
  savedAt: string;
}

export interface RecipeRating {
  recipeId: string;
  score: number;
  comment?: string;
  createdAt: string;
}

export type TutorialStep = 'navigation' | 'progress' | 'timer';
