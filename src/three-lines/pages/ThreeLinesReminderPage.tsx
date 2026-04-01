import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Page } from "../../components/Page";
import { ThreeLinesReminderCard } from "../components/ThreeLinesReminderCard";
import { useThreeLinesState } from "../state/ThreeLinesState";

export function ThreeLinesReminderPage() {
  const navigate = useNavigate();
  const { state, saveReminderResult } = useThreeLinesState();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!state.reminderCard) {
    return <Navigate to="/three-lines/home" replace />;
  }

  return (
    <Page title="今晚先把这 3 条带上桌" subtitle="提醒不是复习知识点，而是赛前可扫描动作。">
      <div className="stack">
        <ThreeLinesReminderCard card={state.reminderCard} />
        <div className="card card-muted">
          <div className="stack">
            <span className="detail-label">自动保存方式</span>
            <p>点击后系统会自动生成用户名，并保存这轮训练结果与提醒。</p>
            {error ? <p className="error-text">{error}</p> : null}
          </div>
        </div>
      </div>
      <Button
        disabled={saving}
        onClick={async () => {
          setSaving(true);
          setError("");
          try {
            await saveReminderResult();
            navigate("/three-lines/home");
          } catch {
            setError("保存没有完成，请稍后再试。");
          } finally {
            setSaving(false);
          }
        }}
      >
        {saving ? "正在保存..." : "保存并进入首页"}
      </Button>
    </Page>
  );
}
