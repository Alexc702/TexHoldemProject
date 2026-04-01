import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Page } from "../../components/Page";
import { getPacksForTrack, getScenarioCountForPack, getTrackMeta } from "../lib/engine";
import { localizePokerTerms } from "../lib/terminology";
import { useThreeLinesState } from "../state/ThreeLinesState";
import type { ThreeLinesTrackId } from "../types";

function isTrack(value: string | undefined): value is ThreeLinesTrackId {
  return value === "gto" || value === "exploit" || value === "line_range";
}

export function ThreeLinesTrackDetailPage() {
  const navigate = useNavigate();
  const { trackId } = useParams();
  const { startTrack } = useThreeLinesState();

  if (!isTrack(trackId)) {
    return <Navigate to="/three-lines/home" replace />;
  }

  const meta = getTrackMeta(trackId);
  const packs = getPacksForTrack(trackId);

  return (
    <Page title={meta.title} subtitle={meta.subtitle}>
      <div className="stack">
        <p className="compact-copy">
          {trackId === "gto"
            ? "这条线先练默认线：牌面结构、范围优势、下注尺度和延续条件。"
            : trackId === "exploit"
              ? "这条线先练针对人：先认对象，再决定偏离方向和值不值得收。"
              : "这条线先练行动线与范围：每条街之后还剩什么牌、密度怎么变化、自己又在代表什么。"}
        </p>
        {packs.map((pack) => (
          <Card
            key={pack.id}
            eyebrow={`${getScenarioCountForPack(pack.id)} 题 · 预计 ${pack.estimatedMinutes} 分钟`}
            title={localizePokerTerms(pack.title)}
          >
            <div className="stack">
              <p>{localizePokerTerms(pack.subtitle)}</p>
              <Button
                variant="secondary"
                onClick={() => {
                  startTrack(trackId, pack.id);
                  navigate(`/three-lines/training/${trackId}`);
                }}
              >
                开始这一组
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <Button variant="text" onClick={() => navigate("/three-lines/home")}>
        返回首页
      </Button>
    </Page>
  );
}
