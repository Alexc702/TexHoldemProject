import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { OptionCard } from "../components/OptionCard";
import { Page } from "../components/Page";
import { useAppState } from "../state/AppState";
import type { UserLevel } from "../types";

const options: Array<{ value: UserLevel; label: string; description: string }> = [
  { value: "beginner", label: "刚会规则", description: "想先知道最容易犯的错。" },
  { value: "casual", label: "打过一些", description: "想打得更稳，少在小池出错。" },
  { value: "improving", label: "想系统提高", description: "想把判断逻辑练得更清楚。" },
  { value: "unknown", label: "跳过，直接开始", description: "先练起来，再看结果。" },
];

export function OnboardingStep1Page() {
  const navigate = useNavigate();
  const { setLevel } = useAppState();
  const [selected, setSelected] = useState<UserLevel | undefined>();

  return (
    <Page title="1 / 2" subtitle="你现在更像哪类玩家？">
      <div className="stack">
        {options.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            description={option.description}
            selected={selected === option.value}
            onClick={() => setSelected(option.value)}
          />
        ))}
        <Button
          disabled={!selected}
          onClick={() => {
            if (!selected) return;
            setLevel(selected);
            navigate("/onboarding/step-2");
          }}
        >
          继续
        </Button>
      </div>
    </Page>
  );
}
