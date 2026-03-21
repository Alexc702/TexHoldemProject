import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { OptionCard } from "../components/OptionCard";
import { Page } from "../components/Page";
import { Stepper } from "../components/Stepper";
import { useAppState } from "../state/AppState";
import type { ReviewSubmission } from "../types";

const preflopOptions = ["翻前加注后被跟", "翻前跟注后看翻牌", "3bet 底池", "记不清，继续"];
const handOptions = ["空气牌", "听牌", "一对类中等牌", "强成手", "记不清，继续"];
const boardOptions = ["高张干燥面", "低张连张面", "两同花湿润面", "转牌变化不大", "记不清，继续"];
const actionOptions = ["我持续下注了", "我补了第二枪", "我跟注了大注", "我打得太大了", "记不清，继续"];
const doubtOptions = ["我是不是诈唬过头了", "我是不是错过了简单下注", "我是不是把中等牌打过头了", "我是不是低估了对手强度", "记不清，继续"];

export function ReviewInputPage() {
  const navigate = useNavigate();
  const { state, submitReview } = useAppState();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ReviewSubmission>({
    preflop_type: "",
    hand_bucket: "",
    board_class: "",
    reached_street: "",
    key_action: "",
    self_doubt: "",
    opponent_type: "",
  });
  const [error, setError] = useState("");

  if (!state.trainingSession?.primary_leak_tag) {
    return <Navigate to="/welcome" replace />;
  }

  const updateField = (field: keyof ReviewSubmission, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  };

  return (
    <Page title="复盘一手你刚打过的牌" subtitle="记不清也能继续，先把最关键的感觉说出来。">
      <div className="stack">
        <Stepper current={step} total={4} />
        {step === 1 ? (
          <Card title="1. 这手怎么入池">
            <div className="stack">
              {preflopOptions.map((option) => (
                <OptionCard
                  key={option}
                  label={option}
                  selected={form.preflop_type === option}
                  onClick={() => updateField("preflop_type", option)}
                />
              ))}
            </div>
          </Card>
        ) : null}
        {step === 2 ? (
          <Card title="2. 你大概拿的是什么牌">
            <div className="stack">
              {handOptions.map((option) => (
                <OptionCard
                  key={option}
                  label={option}
                  selected={form.hand_bucket === option}
                  onClick={() => updateField("hand_bucket", option)}
                />
              ))}
            </div>
          </Card>
        ) : null}
        {step === 3 ? (
          <Card title="3. 翻牌面更像哪种">
            <div className="stack">
              {boardOptions.map((option) => (
                <OptionCard
                  key={option}
                  label={option}
                  selected={form.board_class === option}
                  onClick={() => updateField("board_class", option)}
                />
              ))}
            </div>
          </Card>
        ) : null}
        {step === 4 ? (
          <div className="stack">
            <Card title="4. 打到哪里 + 关键动作">
              <label className="field">
                <span>打到哪里</span>
                <select
                  value={form.reached_street}
                  onChange={(event) => updateField("reached_street", event.target.value)}
                >
                  <option value="">请选择</option>
                  <option value="flop">Flop</option>
                  <option value="turn">Turn</option>
                  <option value="river">River</option>
                  <option value="unknown">记不清，继续</option>
                </select>
              </label>
              <div className="stack">
                {actionOptions.map((option) => (
                  <OptionCard
                    key={option}
                    label={option}
                    selected={form.key_action === option}
                    onClick={() => updateField("key_action", option)}
                  />
                ))}
              </div>
            </Card>
            <Card title="我最担心哪里打错">
              <div className="stack">
                {doubtOptions.map((option) => (
                  <OptionCard
                    key={option}
                    label={option}
                    selected={form.self_doubt === option}
                    onClick={() => updateField("self_doubt", option)}
                  />
                ))}
              </div>
            </Card>
          </div>
        ) : null}
        {error ? <p className="error-text">{error}</p> : null}
        <div className="split-actions">
          {step > 1 ? (
            <Button variant="secondary" onClick={() => setStep((current) => current - 1)}>
              上一步
            </Button>
          ) : null}
          {step < 4 ? (
            <Button
              onClick={() => {
                setStep((current) => current + 1);
              }}
            >
              继续
            </Button>
          ) : (
            <Button
              onClick={() => {
                if (!form.reached_street || !form.key_action) {
                  setError("还需要至少补充打到哪里和关键动作，才能生成复盘结果。");
                  return;
                }
                submitReview(form);
                navigate("/review/result");
              }}
            >
              生成复盘结果
            </Button>
          )}
        </div>
      </div>
    </Page>
  );
}
