import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { LeakCard } from "../components/LeakCard";
import { Page } from "../components/Page";
import { RecommendationCard } from "../components/RecommendationCard";
import { buildReminderCard, getLeakByTag } from "../lib/engine";
import { useAppState } from "../state/AppState";

export function TrainingResultPage() {
  const navigate = useNavigate();
  const { state, createReminderFromTraining } = useAppState();
  const session = state.trainingSession;

  if (!session?.is_complete || !session.primary_leak_tag) {
    return <Navigate to="/training" replace />;
  }

  const leak = getLeakByTag(session.primary_leak_tag);
  const reminderPreview = buildReminderCard(session);

  if (!leak || !reminderPreview) {
    return <Navigate to="/training" replace />;
  }

  return (
    <Page title="这轮先记住一个问题" subtitle="分数不是重点，重点是今晚先别怎么亏。">
      <div className="stack">
        <LeakCard leak={leak} />
        <Card eyebrow="今晚提醒预览" title="先记住这 3 条">
          <ol className="ordered-list">
            {reminderPreview.remember.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </Card>
        <RecommendationCard packId={session.recommended_pack_id} />
        <Button
          onClick={() => {
            createReminderFromTraining();
            navigate("/reminder");
          }}
        >
          生成今晚上桌提醒
        </Button>
      </div>
    </Page>
  );
}
