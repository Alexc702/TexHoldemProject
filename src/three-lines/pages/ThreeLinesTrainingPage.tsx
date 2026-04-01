import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { BottomSheet } from "../../components/BottomSheet";
import { Page } from "../../components/Page";
import { getCurrentScenario, getTrackMeta } from "../lib/engine";
import { getTrainingContextDisplay, localizePokerTerms } from "../lib/terminology";
import { TrackPill } from "../components/TrackPill";
import { useThreeLinesState } from "../state/ThreeLinesState";
import type { ThreeLinesTrackId } from "../types";

function isTrack(value: string | undefined): value is ThreeLinesTrackId {
  return value === "gto" || value === "exploit" || value === "line_range";
}

export function ThreeLinesTrainingPage() {
  const navigate = useNavigate();
  const { trackId } = useParams();
  const { state, answerCurrent, continueSession } = useThreeLinesState();

  if (!isTrack(trackId)) {
    return <Navigate to="/three-lines/home" replace />;
  }

  const session = state.currentSession;
  const scenario = getCurrentScenario(session);

  if (!session || session.track !== trackId || !scenario) {
    return <Navigate to={`/three-lines/tracks/${trackId}`} replace />;
  }

  const willComplete = session.currentIndex + 1 >= session.scenarioIds.length;
  const meta = getTrackMeta(trackId);
  const progress = ((session.currentIndex + 1) / session.scenarioIds.length) * 100;
  const trainingContext = getTrainingContextDisplay(scenario);

  return (
    <Page className="page-training-shell">
      <div className="training-screen">
        <div className="training-screen-main">
          <div className="training-top-row">
            <TrackPill track={trackId} />
            <p className="training-question-count">
              Q{session.currentIndex + 1} / {session.scenarioIds.length}
            </p>
          </div>
          <section className="training-progress-card">
            <p className="training-progress-label">
              第 {session.currentIndex + 1} / {session.scenarioIds.length} 手 · {meta.title}
            </p>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </section>
          <section className="card training-hand-card">
            <p className="training-hand-eyebrow">题面信息 / Hand Context</p>
            <p className="training-hand-summary">{trainingContext.summary}</p>
            <div className="training-context-grid">
              <div className="training-context-item">
                <span className="detail-label">Hero 位置 / Hero</span>
                <strong>{trainingContext.heroPosition}</strong>
              </div>
              <div className="training-context-item">
                <span className="detail-label">手牌 / Hand</span>
                <strong>{trainingContext.heroHand}</strong>
              </div>
              <div className="training-context-item">
                <span className="detail-label">对手 / Villain</span>
                <strong>{trainingContext.villainInfo}</strong>
              </div>
              <div className="training-context-item">
                <span className="detail-label">行动线 / Line</span>
                <strong>{trainingContext.actionLine}</strong>
              </div>
              <div className="training-context-item">
                <span className="detail-label">牌面 / Board</span>
                <strong>{trainingContext.board}</strong>
              </div>
              <div className="training-context-item">
                <span className="detail-label">街道 / Street</span>
                <strong>{trainingContext.street}</strong>
              </div>
            </div>
          </section>
          <section className="training-question-card">
            <p className="training-question-eyebrow">{localizePokerTerms(scenario.title)}</p>
            <h1 className="training-question-title">{localizePokerTerms(scenario.prompt)}</h1>
            <p className="training-question-body">{localizePokerTerms(scenario.subtitle)}</p>
          </section>
        </div>
        <div className="training-option-grid">
          {scenario.options.map((option) => (
            <Button
              key={option.id}
              variant="secondary"
              className="training-option"
              disabled={Boolean(session.feedbackState)}
              onClick={() => answerCurrent(option.id)}
            >
              {localizePokerTerms(option.label)}
            </Button>
          ))}
        </div>
      </div>
      <BottomSheet open={Boolean(session.feedbackState)} title={session.feedbackState?.title ?? ""}>
        <div className="stack">
          <p>{session.feedbackState ? localizePokerTerms(session.feedbackState.body) : null}</p>
          <p className="muted">
            {session.feedbackState ? localizePokerTerms(session.feedbackState.translation) : null}
          </p>
          <Button
            onClick={() => {
              continueSession();
              if (willComplete) {
                navigate(`/three-lines/training/${trackId}/result`);
              }
            }}
          >
            {willComplete ? "查看结果" : "下一手"}
          </Button>
        </div>
      </BottomSheet>
    </Page>
  );
}
