import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { LeakCard } from "../components/LeakCard";
import { Page } from "../components/Page";
import { RecommendationCard } from "../components/RecommendationCard";
import { getLeakByTag } from "../lib/engine";
import { useAppState } from "../state/AppState";

export function ReviewResultPage() {
  const navigate = useNavigate();
  const { state, startTraining } = useAppState();
  const result = state.reviewResult;

  if (!result) {
    return <Navigate to="/review/input" replace />;
  }

  const leak = getLeakByTag(result.primary_leak_tag);
  if (!leak) {
    return <Navigate to="/review/input" replace />;
  }

  return (
    <Page title="这手更像什么问题" subtitle="系统先给你一个桌边可执行的版本。">
      <div className="stack">
        {result.confidence === "low" ? <div className="badge">低置信度建议</div> : null}
        <Card title={result.narrative_title}>
          <p>{result.narrative_text}</p>
        </Card>
        <LeakCard leak={leak} />
        <Card eyebrow="下次先记住" title="这 3 条先放桌边">
          <ol className="ordered-list">
            {result.next_time_rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ol>
        </Card>
        <RecommendationCard packId={result.recommended_pack_id} />
        <Button
          onClick={() => {
            startTraining(result.recommended_pack_id);
            navigate("/training");
          }}
        >
          练这个
        </Button>
        <Button variant="secondary" onClick={() => navigate("/home")}>
          返回首页
        </Button>
      </div>
    </Page>
  );
}
