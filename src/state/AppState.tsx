import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { buildReminderCard, buildReviewResult, createTrainingSession } from "../lib/engine";
import { loadState, saveState } from "../lib/storage";
import type {
  AppState,
  PackId,
  ReviewSubmission,
  TrainingSession,
  UserGoal,
  UserLevel,
} from "../types";

type AppStateContextValue = {
  state: AppState;
  setLevel: (level: UserLevel) => void;
  setGoal: (goal: UserGoal) => void;
  startTraining: (packId: PackId) => void;
  setTrainingSession: (session: TrainingSession) => void;
  createReminderFromTraining: () => void;
  login: (phone: string) => void;
  skipLogin: () => void;
  submitReview: (submission: ReviewSubmission) => void;
  resetFlow: () => void;
};

const AppStateContext = createContext<AppStateContextValue | null>(null);

const initialState: AppState = {
  isLoggedIn: false,
};

export function AppStateProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<AppState>(() => loadState() ?? initialState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const value = useMemo<AppStateContextValue>(
    () => ({
      state,
      setLevel(level) {
        setState((current) => ({ ...current, level }));
      },
      setGoal(goal) {
        setState((current) => ({ ...current, goal }));
      },
      startTraining(packId) {
        setState((current) => ({
          ...current,
          trainingSession: createTrainingSession(packId),
        }));
      },
      setTrainingSession(session) {
        setState((current) => ({ ...current, trainingSession: session }));
      },
      createReminderFromTraining() {
        setState((current) => ({
          ...current,
          reminderCard: buildReminderCard(current.trainingSession),
        }));
      },
      login(phone) {
        setState((current) => ({
          ...current,
          isLoggedIn: true,
          phone,
        }));
      },
      skipLogin() {
        setState((current) => current);
      },
      submitReview(submission) {
        setState((current) => ({
          ...current,
          reviewSubmission: submission,
          reviewResult: buildReviewResult(submission),
        }));
      },
      resetFlow() {
        setState({
          ...initialState,
          isLoggedIn: state.isLoggedIn,
          phone: state.phone,
        });
      },
    }),
    [state],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }

  return context;
}
