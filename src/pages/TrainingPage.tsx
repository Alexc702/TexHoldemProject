import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { BottomSheet } from "../components/BottomSheet";
import { HandInfoCard } from "../components/HandInfoCard";
import { Page } from "../components/Page";
import { ProgressBar } from "../components/ProgressBar";
import { answerScenario, advanceTrainingSession, getCurrentScenario } from "../lib/engine";
import { useAppState } from "../state/AppState";

export function TrainingPage() {
  const navigate = useNavigate();
  const { state, setTrainingSession } = useAppState();
  const session = state.trainingSession;
  const scenario = getCurrentScenario(session);

  if (!session || !scenario) {
    return <Navigate to="/welcome" replace />;
  }

  return (
    <Page title="首轮 5 手训练" subtitle="动作按钮本身即提交。">
      <div className="stack">
        <ProgressBar current={session.current_index + 1} total={session.scenario_ids.length} />
        <HandInfoCard scenario={scenario} />
        <div className="action-grid">
          {scenario.options.map((option) => (
            <Button
              key={option.id}
              variant="secondary"
              onClick={() => setTrainingSession(answerScenario(session, scenario, option.id))}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
      <BottomSheet open={Boolean(session.feedback_state)} title={session.feedback_state?.title ?? ""}>
        <div className="stack">
          <p>{session.feedback_state?.body}</p>
          <p className="muted">{session.feedback_state?.translation}</p>
          <Button
            onClick={() => {
              const nextSession = advanceTrainingSession(session);
              setTrainingSession(nextSession);
              if (nextSession.is_complete) {
                navigate("/training/result");
              }
            }}
          >
            下一手
          </Button>
        </div>
      </BottomSheet>
    </Page>
  );
}
