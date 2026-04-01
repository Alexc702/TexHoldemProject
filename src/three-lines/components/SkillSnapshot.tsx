import type { ThreeLinesTrackId } from "../types";

type SkillSnapshotProps = {
  snapshot: Record<ThreeLinesTrackId, string>;
};

export function SkillSnapshot({ snapshot }: SkillSnapshotProps) {
  const items: Array<{ label: string; key: ThreeLinesTrackId }> = [
    { label: "标准线", key: "gto" },
    { label: "针对人", key: "exploit" },
    { label: "范围", key: "line_range" },
  ];

  return (
    <div className="three-lines-snapshot">
      {items.map((item) => (
        <div key={item.key} className="three-lines-snapshot-item">
          <span className="detail-label">{item.label}</span>
          <strong>{snapshot[item.key]}</strong>
        </div>
      ))}
    </div>
  );
}
