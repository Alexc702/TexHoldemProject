import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { LeakCard } from "../components/LeakCard";
import { Page } from "../components/Page";
import { ReminderCard } from "../components/ReminderCard";
import { getLeakByTag, getPackSummary } from "../lib/engine";
import { useAppState } from "../state/AppState";

export function HomePage() {
  const navigate = useNavigate();
  const { state, startTraining } = useAppState();

  if (!state.trainingSession?.primary_leak_tag || !state.reminderCard) {
    return (
      <Page title="首页" subtitle="先完成第一组训练，再生成今天的提醒。">
        <div className="stack">
          <Card title="你还没有可用的训练结果">
            <p>先完成第一组训练，首页才会出现今天提醒、主问题和下一步动作。</p>
          </Card>
          <Button
            onClick={() => {
              startTraining("pack_cbet_basic");
              navigate("/training");
            }}
          >
            开始第一组训练
          </Button>
        </div>
      </Page>
    );
  }

  const leak = getLeakByTag(state.trainingSession.primary_leak_tag);
  const recommendedPack = getPackSummary(state.reviewResult?.recommended_pack_id ?? state.trainingSession.recommended_pack_id);

  if (!leak) {
    return <Navigate to="/welcome" replace />;
  }

  const hasReview = Boolean(state.reviewResult);
  const primaryAction = hasReview ? "复盘一手" : "继续训练";

  return (
    <Page title="首页" subtitle="今天只保留一个主动作。">
      <div className="stack">
        <ReminderCard card={state.reminderCard} />
        <Button
          onClick={() => {
            if (hasReview) {
              navigate("/review/input");
              return;
            }

            const nextPackId = state.trainingSession?.recommended_pack_id ?? "pack_cbet_basic";
            startTraining(nextPackId);
            navigate("/training");
          }}
        >
          {primaryAction}
        </Button>
        {recommendedPack ? (
          <Card eyebrow="推荐原因" title={recommendedPack.title}>
            <p>{recommendedPack.subtitle}</p>
          </Card>
        ) : null}
        <LeakCard leak={leak} />
        {!hasReview ? (
          <Button variant="secondary" onClick={() => navigate("/review/input")}>
            复盘一手
          </Button>
        ) : null}
      </div>
    </Page>
  );
}
