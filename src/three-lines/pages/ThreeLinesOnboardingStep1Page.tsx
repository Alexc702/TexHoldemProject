import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { OptionCard } from "../../components/OptionCard";
import { Page } from "../../components/Page";
import { useThreeLinesState } from "../state/ThreeLinesState";
import type { ThreeLinesLevel } from "../types";

const levelOptions: Array<{
  value: ThreeLinesLevel;
  label: string;
  description: string;
}> = [
  {
    value: "casual",
    label: "朋友局常打，但翻后不稳定",
    description: "适合先把标准线和范围感知补齐。",
  },
  {
    value: "improving",
    label: "会一些概念，但常对错的人做错事",
    description: "适合从针对人和偏离纪律切入。",
  },
  {
    value: "beginner",
    label: "动作能看懂，但还不太会想范围",
    description: "适合先练行动线 / 范围的方向感。",
  },
];

export function ThreeLinesOnboardingStep1Page() {
  const navigate = useNavigate();
  const { state, setLevel } = useThreeLinesState();

  return (
    <Page title="你现在更像哪类玩家？" subtitle="先判断阶段，不追求精确。">
      <div className="stack">
        {levelOptions.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            description={option.description}
            selected={state.level === option.value}
            onClick={() => setLevel(option.value)}
          />
        ))}
      </div>
      <Button
        onClick={() => navigate("/three-lines/onboarding/step-2")}
        disabled={!state.level}
      >
        继续
      </Button>
    </Page>
  );
}
