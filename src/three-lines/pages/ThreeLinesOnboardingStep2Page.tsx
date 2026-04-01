import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { OptionCard } from "../../components/OptionCard";
import { Page } from "../../components/Page";
import { useThreeLinesState } from "../state/ThreeLinesState";
import type { ThreeLinesFocus } from "../types";

const focusOptions: Array<{
  value: ThreeLinesFocus;
  label: string;
  description: string;
}> = [
  {
    value: "gto",
    label: "我想先把标准线打稳",
    description: "少做自动持续下注（c-bet）、尺度失衡和错误延续。",
  },
  {
    value: "exploit",
    label: "我更想学针对人调整",
    description: "别再把爱跟玩家（station）、被动玩家和过度弃牌者混成一类。",
  },
  {
    value: "line_range",
    label: "我更想看懂行动线和范围",
    description: "学会每条街之后还剩什么牌，以及自己又在代表什么。",
  },
  {
    value: "direct_start",
    label: "直接带我开始",
    description: "先默认从标准线进入，再根据结果推荐下一条。",
  },
];

export function ThreeLinesOnboardingStep2Page() {
  const navigate = useNavigate();
  const { state, setFocus } = useThreeLinesState();

  return (
    <Page title="你现在最想优先解决哪类问题？" subtitle="三条线都重要，但一次只练一条主线。">
      <div className="stack">
        {focusOptions.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            description={option.description}
            selected={state.focus === option.value}
            onClick={() => setFocus(option.value)}
          />
        ))}
      </div>
      <Button onClick={() => navigate("/three-lines/home")} disabled={!state.focus}>
        进入首页
      </Button>
    </Page>
  );
}
