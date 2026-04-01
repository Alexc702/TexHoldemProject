import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Page } from "../../components/Page";
import { getPackMeta, getTrackMeta } from "../lib/engine";
import { getConfidenceLabel, localizePokerTerms } from "../lib/terminology";
import { useThreeLinesState } from "../state/ThreeLinesState";

export function ThreeLinesReviewResultPage() {
  const navigate = useNavigate();
  const { state, startTrack } = useThreeLinesState();
  const result = state.reviewResult;

  if (!result) {
    return <Navigate to="/three-lines/review/input" replace />;
  }

  const recommendedTrack = getTrackMeta(result.recommendedTrack);
  const recommendedPack = getPackMeta(result.recommendedPackId);

  return (
    <Page title={localizePokerTerms(result.title)} subtitle={localizePokerTerms(result.body)}>
      <div className="stack">
        <Card eyebrow={`置信度：${getConfidenceLabel(result.confidence)}`} title="这手更像哪里出了问题">
          <p>{localizePokerTerms(result.body)}</p>
        </Card>
        <Card eyebrow="下次先记住" title="三条可执行提醒">
          <ol className="ordered-list">
            {result.takeaways.map((item) => (
              <li key={item}>{localizePokerTerms(item)}</li>
            ))}
          </ol>
        </Card>
        <Card eyebrow="推荐回练" title={recommendedTrack.title}>
          <p>{localizePokerTerms(recommendedPack.title)}</p>
          <p className="muted">{localizePokerTerms(recommendedPack.subtitle)}</p>
        </Card>
      </div>
      <div className="stack">
        <Button
          onClick={() => {
            startTrack(result.recommendedTrack, result.recommendedPackId);
            navigate(`/three-lines/training/${result.recommendedTrack}`);
          }}
        >
          练这个
        </Button>
        <Button variant="secondary" onClick={() => navigate("/three-lines/home")}>
          返回首页
        </Button>
      </div>
    </Page>
  );
}
