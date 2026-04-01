import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Page } from "../../components/Page";
import { getPackMeta, getSkillMeta, getTrackMeta } from "../lib/engine";
import { getSkillIssueLabel, localizePokerTerms } from "../lib/terminology";
import { useThreeLinesState } from "../state/ThreeLinesState";
import type { ThreeLinesTrackId } from "../types";

function isTrack(value: string | undefined): value is ThreeLinesTrackId {
  return value === "gto" || value === "exploit" || value === "line_range";
}

export function ThreeLinesTrainingResultPage() {
  const navigate = useNavigate();
  const { trackId } = useParams();
  const { state, createReminder, clearCurrentSession, startTrack } = useThreeLinesState();

  if (!isTrack(trackId)) {
    return <Navigate to="/three-lines/home" replace />;
  }

  const result = state.latestResult;

  if (!result || result.track !== trackId) {
    return <Navigate to={`/three-lines/tracks/${trackId}`} replace />;
  }

  const recommendedTrack = getTrackMeta(result.recommendedTrack);
  const recommendedPack = getPackMeta(result.recommendedPackId);
  const completedPack = getPackMeta(result.completedPackId);
  const primarySkill = getSkillMeta(result.primarySkillIssue);
  const primarySkillLabel = getSkillIssueLabel(result.primarySkillIssue);

  return (
    <Page
      title={`你这轮的主问题是 ${getTrackMeta(result.primaryTrackIssue).label}`}
      subtitle={localizePokerTerms(result.diagnosis)}
    >
      <div className="stack">
        <Card eyebrow={`主能力问题 · ${localizePokerTerms(completedPack.title)}`} title={primarySkillLabel}>
          <p>{localizePokerTerms(primarySkill.diagnosis)}</p>
        </Card>
        <Card eyebrow="主要证据题" title="这几手最能说明问题">
          {result.evidenceTitles.length > 0 ? (
            <ol className="ordered-list">
              {result.evidenceTitles.map((item) => (
                <li key={item}>{localizePokerTerms(item)}</li>
              ))}
            </ol>
          ) : (
            <p>这一轮答得比较稳，没有形成很明显的单点爆雷。</p>
          )}
        </Card>
        <Card eyebrow="今晚上桌提醒" title="先记住这 3 条">
          <ol className="ordered-list">
            {result.tonightReminders.map((item) => (
              <li key={item}>{localizePokerTerms(item)}</li>
            ))}
          </ol>
        </Card>
        <Card eyebrow="推荐下一步" title={recommendedTrack.title}>
          <p>{localizePokerTerms(recommendedPack.title)}</p>
          <p className="muted">{localizePokerTerms(recommendedPack.subtitle)}</p>
          <p>{localizePokerTerms(result.recommendationReason)}</p>
        </Card>
      </div>
      <div className="stack">
        <Button
          variant="secondary"
          onClick={() => {
            clearCurrentSession();
            startTrack(result.recommendedTrack, result.recommendedPackId);
            navigate(`/three-lines/training/${result.recommendedTrack}`);
          }}
        >
          直接练推荐组
        </Button>
        <Button
          onClick={() => {
            createReminder();
            clearCurrentSession();
            navigate("/three-lines/reminder");
          }}
        >
          生成今晚上桌提醒
        </Button>
        <Button variant="secondary" onClick={() => navigate("/three-lines/home")}>
          返回首页
        </Button>
      </div>
    </Page>
  );
}
