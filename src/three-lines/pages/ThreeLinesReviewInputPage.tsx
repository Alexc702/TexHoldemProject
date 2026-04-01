import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Page } from "../../components/Page";
import { Stepper } from "../../components/Stepper";
import { ReviewChoiceField } from "../components/ReviewChoiceField";
import { useThreeLinesState } from "../state/ThreeLinesState";
import type { ThreeLinesReviewSubmission } from "../types";

const unknown = "记不清，继续";

export function ThreeLinesReviewInputPage() {
  const navigate = useNavigate();
  const { submitReview } = useThreeLinesState();
  const [form, setForm] = useState<ThreeLinesReviewSubmission>({
    preflopType: "",
    handBucket: "",
    boardClass: "",
    reachedStreet: "",
    keyAction: "",
    selfDoubt: "",
    rangeRead: "",
  });

  const updateField = (field: keyof ThreeLinesReviewSubmission, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <Page
      title="用低精度信息也能复盘一手"
      subtitle="复盘不是记牌器。只要能回忆关键动作和担心点，就足够定位主问题线。"
    >
      <div className="stack">
        <Stepper current={5} total={5} />
        <ReviewChoiceField
          label="1. 这手怎么入池"
          value={form.preflopType}
          onSelect={(value) => updateField("preflopType", value)}
          options={["翻前主动加注", "翻前跟入", "3bet 底池", unknown]}
        />
        <ReviewChoiceField
          label="2. 你大概拿的是什么牌"
          value={form.handBucket}
          onSelect={(value) => updateField("handBucket", value)}
          options={["空气 / 高张", "听牌", "中等成手", "强成手", unknown]}
        />
        <ReviewChoiceField
          label="3. 翻牌面更像哪种"
          value={form.boardClass}
          onSelect={(value) => updateField("boardClass", value)}
          options={["高张干燥面", "低张连张面", "两同花动态面", "河牌极化面", unknown]}
        />
        <ReviewChoiceField
          label="4. 你做了什么关键动作"
          value={form.keyAction}
          onSelect={(value) => updateField("keyAction", value)}
          options={["我持续下注了", "我补了第二枪", "我 river 跟注了", "我 river bluff 了", unknown]}
        />
        <ReviewChoiceField
          label="5. 你最担心哪里打错"
          value={form.selfDoubt}
          onSelect={(value) => updateField("selfDoubt", value)}
          options={["我可能把对手类型看错了", "我可能把 bluff 密度看高了", "我可能默认线打错了", unknown]}
        />
        <ReviewChoiceField
          label="可选：你当时觉得对手更像还剩什么牌"
          value={form.rangeRead}
          onSelect={(value) => updateField("rangeRead", value)}
          options={["空气应该不多了", "中等成手很多", "value 密度更高", unknown]}
        />
      </div>
      <Button
        onClick={() => {
          submitReview(form);
          navigate("/three-lines/review/result");
        }}
        disabled={!form.keyAction || !form.selfDoubt}
      >
        生成复盘结果
      </Button>
    </Page>
  );
}
