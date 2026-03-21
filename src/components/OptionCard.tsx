type OptionCardProps = {
  label: string;
  description?: string;
  selected?: boolean;
  onClick: () => void;
};

export function OptionCard({ label, description, selected, onClick }: OptionCardProps) {
  return (
    <button type="button" className={`option-card ${selected ? "selected" : ""}`} onClick={onClick}>
      <span className="option-card-label">{label}</span>
      {description ? <span className="option-card-description">{description}</span> : null}
    </button>
  );
}
