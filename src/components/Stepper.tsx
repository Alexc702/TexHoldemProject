type StepperProps = {
  current: number;
  total: number;
};

export function Stepper({ current, total }: StepperProps) {
  return (
    <div className="stepper">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`stepper-item ${index + 1 <= current ? "active" : ""}`}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
}
