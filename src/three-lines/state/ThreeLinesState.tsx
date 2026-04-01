import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  advanceSession,
  answerScenario,
  buildReminderCard,
  buildReviewResult,
  createSession,
  getCurrentScenario,
} from "../lib/engine";
import { saveTrainingResult } from "../lib/resultApi";
import { loadThreeLinesState, saveThreeLinesState } from "../lib/storage";
import type {
  ThreeLinesFocus,
  ThreeLinesLevel,
  ThreeLinesPackId,
  ThreeLinesReviewSubmission,
  ThreeLinesSession,
  ThreeLinesState,
  ThreeLinesTrackId,
} from "../types";

type ThreeLinesStateContextValue = {
  state: ThreeLinesState;
  setLevel: (level: ThreeLinesLevel) => void;
  setFocus: (focus: ThreeLinesFocus) => void;
  startTrack: (track: ThreeLinesTrackId, packId?: ThreeLinesPackId) => void;
  answerCurrent: (selectedOptionId: string) => void;
  continueSession: () => void;
  createReminder: () => void;
  saveReminderResult: () => Promise<{ username: string; savedAt: string; mode: "server" | "local" }>;
  submitReview: (submission: ThreeLinesReviewSubmission) => void;
  clearCurrentSession: () => void;
};

const initialState: ThreeLinesState = {};

const ThreeLinesStateContext = createContext<ThreeLinesStateContextValue | null>(null);

export function ThreeLinesStateProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<ThreeLinesState>(
    () => loadThreeLinesState() ?? initialState,
  );

  useEffect(() => {
    saveThreeLinesState(state);
  }, [state]);

  const value = useMemo<ThreeLinesStateContextValue>(
    () => ({
      state,
      setLevel(level) {
        setState((current) => ({ ...current, level }));
      },
      setFocus(focus) {
        setState((current) => ({ ...current, focus }));
      },
      startTrack(track, packId) {
        setState((current) => ({
          ...current,
          currentTrack: track,
          currentSession: createSession(track, packId),
        }));
      },
      answerCurrent(selectedOptionId) {
        setState((current) => {
          const session = current.currentSession;
          const scenario = getCurrentScenario(session);

          if (!session || !scenario) {
            return current;
          }

          const nextSession = answerScenario(session, scenario, selectedOptionId);
          return {
            ...current,
            currentSession: nextSession,
          };
        });
      },
      continueSession() {
        setState((current) => {
          const session = current.currentSession;

          if (!session) {
            return current;
          }

          const nextSession = advanceSession(session);
          return {
            ...current,
            currentSession: nextSession,
            latestResult: nextSession.result ?? current.latestResult,
          };
        });
      },
      createReminder() {
        setState((current) => ({
          ...current,
          reminderCard: buildReminderCard(current.latestResult),
        }));
      },
      async saveReminderResult() {
        if (!state.latestResult || !state.reminderCard) {
          throw new Error("No reminder result to save.");
        }

        const saved = await saveTrainingResult({
          level: state.level,
          focus: state.focus,
          result: state.latestResult,
          reminderCard: state.reminderCard,
        });

        setState((current) => ({
          ...current,
          username: saved.username,
          lastSavedAt: saved.savedAt,
          saveMode: saved.mode,
        }));

        return saved;
      },
      submitReview(submission) {
        setState((current) => ({
          ...current,
          reviewSubmission: submission,
          reviewResult: buildReviewResult(submission),
        }));
      },
      clearCurrentSession() {
        setState((current) => ({
          ...current,
          currentSession: undefined,
        }));
      },
    }),
    [state],
  );

  return (
    <ThreeLinesStateContext.Provider value={value}>
      {children}
    </ThreeLinesStateContext.Provider>
  );
}

export function useThreeLinesState() {
  const context = useContext(ThreeLinesStateContext);
  if (!context) {
    throw new Error("useThreeLinesState must be used within ThreeLinesStateProvider");
  }

  return context;
}
