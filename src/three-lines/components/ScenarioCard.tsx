import { Card } from "../../components/Card";
import type { ThreeLinesScenario } from "../types";

type ScenarioCardProps = {
  scenario: ThreeLinesScenario;
};

export function ScenarioCard({ scenario }: ScenarioCardProps) {
  return (
    <Card eyebrow={scenario.title} title={scenario.prompt}>
      <p>{scenario.subtitle}</p>
      <div className="detail-grid scenario-detail-grid">
        <div>
          <span className="detail-label">位置</span>
          <strong>{scenario.setup.positions}</strong>
        </div>
        <div>
          <span className="detail-label">翻前</span>
          <strong>{scenario.setup.preflop}</strong>
        </div>
        <div>
          <span className="detail-label">牌面</span>
          <strong>{scenario.setup.board}</strong>
        </div>
        <div>
          <span className="detail-label">底池</span>
          <strong>{scenario.setup.pot}</strong>
        </div>
      </div>
      {scenario.setup.villain ? (
        <div>
          <span className="detail-label">对手</span>
          <p>{scenario.setup.villain}</p>
        </div>
      ) : null}
    </Card>
  );
}
