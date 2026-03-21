type ProgressBarProps = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = total === 0 ? 0 : Math.min(100, Math.round((current / total) * 100));
  return (
    <div className="progress-card">
      <div className="progress-row">
        <span>首轮训练</span>
        <span>
          {current} / {total}
        </span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
