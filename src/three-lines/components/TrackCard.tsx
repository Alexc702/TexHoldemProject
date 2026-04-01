import { Button } from "../../components/Button";
import { threeLinesTracks } from "../data/runtime";
import { getPacksForTrack, getScenarioCountForTrack } from "../lib/engine";
import type { ThreeLinesTrackId } from "../types";

type TrackCardProps = {
  track: ThreeLinesTrackId;
  eyebrow?: string;
  onClick?: () => void;
  showCounts?: boolean;
  selectable?: boolean;
  selected?: boolean;
};

export function TrackCard({
  track,
  eyebrow,
  onClick,
  showCounts = false,
  selectable = false,
  selected = false,
}: TrackCardProps) {
  const meta = threeLinesTracks[track];
  const packCount = getPacksForTrack(track).length;
  const questionCount = getScenarioCountForTrack(track);

  const content = (
    <>
      {eyebrow ? <div className="card-eyebrow">{eyebrow}</div> : null}
      <div className="stack">
        <h2 className="card-title">{meta.title}</h2>
        <p>{meta.subtitle}</p>
        {showCounts ? <p className="muted">{packCount} 组 · {questionCount} 题</p> : null}
      </div>
    </>
  );

  if (selectable) {
    return (
      <button
        type="button"
        className={`card track-card track-card-selectable ${selected ? "track-card-selected" : "track-card-unselected"}`}
        onClick={onClick}
      >
        {content}
      </button>
    );
  }

  return (
    <section className="card track-card">
      {eyebrow ? <div className="card-eyebrow">{eyebrow}</div> : null}
      <div className="stack">
        <h2 className="card-title">{meta.title}</h2>
        <p>{meta.subtitle}</p>
        {showCounts ? <p className="muted">{packCount} 组 · {questionCount} 题</p> : null}
      </div>
      {onClick ? (
        <Button variant="secondary" fullWidth={false} onClick={onClick}>
          查看这条线
        </Button>
      ) : null}
    </section>
  );
}
