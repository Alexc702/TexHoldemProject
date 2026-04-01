import type { ThreeLinesState } from "../types";

const STORAGE_KEY = "texholding-three-lines-state-v2";

export function loadThreeLinesState(): ThreeLinesState | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ThreeLinesState) : undefined;
  } catch {
    return undefined;
  }
}

export function saveThreeLinesState(state: ThreeLinesState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
