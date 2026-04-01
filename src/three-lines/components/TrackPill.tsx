import { threeLinesTracks } from "../data/runtime";
import type { ThreeLinesTrackId } from "../types";

type TrackPillProps = {
  track: ThreeLinesTrackId;
};

export function TrackPill({ track }: TrackPillProps) {
  const meta = threeLinesTracks[track];

  return <span className={`track-pill track-pill-${meta.accent}`}>{meta.shortLabel}</span>;
}
