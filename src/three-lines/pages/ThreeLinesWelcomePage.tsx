import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Page } from "../../components/Page";
import { TrackCard } from "../components/TrackCard";
import { useThreeLinesState } from "../state/ThreeLinesState";
import type { ThreeLinesTrackId } from "../types";

export function ThreeLinesWelcomePage() {
  const navigate = useNavigate();
  const { state, setFocus } = useThreeLinesState();
  const [selectedTrack, setSelectedTrack] = useState<ThreeLinesTrackId>("line_range");

  return (
    <Page
      title="不只是刷题，练成会赢钱的判断"
      subtitle="标准线、针对人、行动线与范围，统一练成一个能带上桌的决策系统。"
    >
      <div className="stack">
        <p className="welcome-eyebrow">THREE-LINE TRAINER</p>
        <TrackCard
          track="gto"
          selectable
          selected={selectedTrack === "gto"}
          onClick={() => setSelectedTrack("gto")}
        />
        <TrackCard
          track="exploit"
          selectable
          selected={selectedTrack === "exploit"}
          onClick={() => setSelectedTrack("exploit")}
        />
        <TrackCard
          track="line_range"
          selectable
          selected={selectedTrack === "line_range"}
          onClick={() => setSelectedTrack("line_range")}
        />
      </div>
      <div className="page-actions page-actions-bottom">
        <Button
          onClick={() => {
            setFocus(selectedTrack);
            navigate("/three-lines/onboarding/step-1");
          }}
        >
          开始第一次训练
        </Button>
        <Button variant="text" onClick={() => navigate("/three-lines/home")}>
          {state.username ? "继续我的训练" : "直接看看首页"}
        </Button>
      </div>
    </Page>
  );
}
