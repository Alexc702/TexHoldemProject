import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Page } from "../../components/Page";
import { getTrackMeta, buildSkillSnapshot, getDefaultTrack } from "../lib/engine";
import { ThreeLinesReminderCard } from "../components/ThreeLinesReminderCard";
import { SkillSnapshot } from "../components/SkillSnapshot";
import { TrackPill } from "../components/TrackPill";
import { useThreeLinesState } from "../state/ThreeLinesState";

export function ThreeLinesHomePage() {
  const navigate = useNavigate();
  const { state } = useThreeLinesState();
  const mainTrack =
    state.reviewResult?.primaryTrack ??
    state.latestResult?.recommendedTrack ??
    getDefaultTrack(state.focus);
  const mainTrackMeta = getTrackMeta(mainTrack);
  const snapshot = buildSkillSnapshot(state.latestResult, state.reviewResult);
  const primaryAction = state.reviewResult ? "复盘一手" : "继续练这条";

  return (
    <Page title="今天只保留一个主动作" subtitle="三条线都存在，但今天主练线只有一条。">
      <div className="stack">
        <Card eyebrow="今天主问题" title={state.latestResult?.diagnosis ?? "先从一条主线开始"}>
          <p>
            {state.latestResult
              ? "训练结果会在这里告诉你：错的是哪条线，以及下一步该练哪里。"
              : "还没有结果时，默认先从标准线进入，再根据训练结果切到针对人或范围。"}
          </p>
        </Card>
        {state.username ? (
          <Card eyebrow="当前用户名" title={state.username}>
            <p>
              {state.saveMode === "local"
                ? "这次结果先保存在本地，后台保存恢复后可再同步。"
                : "这次训练结果和提醒已经自动记录。"}
            </p>
          </Card>
        ) : null}
        <Card eyebrow="今天主练线" title={mainTrackMeta.title}>
          <div className="stack">
            <p>{mainTrackMeta.subtitle}</p>
            <TrackPill track={mainTrack} />
          </div>
        </Card>
        {state.reminderCard ? <ThreeLinesReminderCard card={state.reminderCard} /> : null}
        <SkillSnapshot snapshot={snapshot} />
      </div>
      <div className="stack">
        <Button
          onClick={() => {
            if (state.reviewResult) {
              navigate("/three-lines/review/input");
              return;
            }

            navigate(`/three-lines/tracks/${mainTrack}`);
          }}
        >
          {primaryAction}
        </Button>
        {!state.reviewResult ? (
          <Button variant="secondary" onClick={() => navigate("/three-lines/review/input")}>
            复盘一手
          </Button>
        ) : null}
      </div>
    </Page>
  );
}
