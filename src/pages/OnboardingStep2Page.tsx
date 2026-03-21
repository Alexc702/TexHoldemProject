import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { OptionCard } from "../components/OptionCard";
import { Page } from "../components/Page";
import { getInitialPackId } from "../lib/engine";
import { useAppState } from "../state/AppState";
import type { UserGoal } from "../types";

const options: Array<{ value: UserGoal; label: string; description: string }> = [
  { value: "cbet", label: "什么时候该下注", description: "先学会拿下最轻松的小池。" },
  { value: "bluff", label: "什么时候该诈唬", description: "减少无效 bluff 和机械补枪。" },
  { value: "exploit", label: "怎么针对对手调整", description: "少在错误对象面前讲故事。" },
  { value: "direct_start", label: "直接带我开始", description: "先跑完一轮，再看问题。" },
];

export function OnboardingStep2Page() {
  const navigate = useNavigate();
  const { setGoal, startTraining } = useAppState();
  const [selected, setSelected] = useState<UserGoal | undefined>();

  return (
    <Page title="2 / 2" subtitle="你现在最想先解决什么？">
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
            setGoal(selected);
            startTraining(getInitialPackId(selected));
            navigate("/training");
          }}
        >
          开始第一组训练
        </Button>
      </div>
    </Page>
  );
}
