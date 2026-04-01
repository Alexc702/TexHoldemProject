import type {
  ThreeLinesFocus,
  ThreeLinesLevel,
  ThreeLinesReminderCard,
  ThreeLinesTrainingResult,
} from "../types";

const PENDING_SAVE_KEY = "texholding-three-lines-pending-saves";

type SavePayload = {
  level?: ThreeLinesLevel;
  focus?: ThreeLinesFocus;
  result: ThreeLinesTrainingResult;
  reminderCard: ThreeLinesReminderCard;
};

export type SaveResponse = {
  username: string;
  savedAt: string;
  mode: "server" | "local";
};

function localTrackSlug(track: ThreeLinesTrainingResult["track"]) {
  if (track === "line_range") return "lr";
  if (track === "exploit") return "ex";
  return "gto";
}

export function generateLocalUsername(track: ThreeLinesTrainingResult["track"]) {
  const now = new Date();
  const dateCode = `${now.getFullYear().toString().slice(2)}${String(now.getMonth() + 1).padStart(
    2,
    "0",
  )}${String(now.getDate()).padStart(2, "0")}`;
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `tex-${localTrackSlug(track)}-${dateCode}-${suffix}`;
}

function savePendingRecordLocally(record: SavePayload & SaveResponse) {
  if (typeof window === "undefined") {
    return;
  }

  const existing = window.localStorage.getItem(PENDING_SAVE_KEY);
  const queue = existing ? (JSON.parse(existing) as Array<SavePayload & SaveResponse>) : [];
  queue.push(record);
  window.localStorage.setItem(PENDING_SAVE_KEY, JSON.stringify(queue));
}

export async function saveTrainingResult(payload: SavePayload): Promise<SaveResponse> {
  try {
    const response = await fetch("/api/three-lines/save-result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`save failed: ${response.status}`);
    }

    const data = (await response.json()) as SaveResponse;
    return {
      username: data.username,
      savedAt: data.savedAt,
      mode: "server",
    };
  } catch {
    const fallback: SaveResponse = {
      username: generateLocalUsername(payload.result.track),
      savedAt: new Date().toISOString(),
      mode: "local",
    };
    savePendingRecordLocally({
      ...payload,
      ...fallback,
    });
    return fallback;
  }
}
