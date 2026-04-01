import { localizePokerTerms } from "../lib/terminology";

type ReviewChoiceFieldProps = {
  label: string;
  value?: string;
  options: string[];
  onSelect: (value: string) => void;
};

export function ReviewChoiceField({
  label,
  value,
  options,
  onSelect,
}: ReviewChoiceFieldProps) {
  return (
    <section className="stack">
      <div>
        <span className="detail-label">{label}</span>
      </div>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`option-card ${value === option ? "selected" : ""}`}
          onClick={() => onSelect(option)}
        >
          <span className="option-card-label">{localizePokerTerms(option)}</span>
        </button>
      ))}
    </section>
  );
}
