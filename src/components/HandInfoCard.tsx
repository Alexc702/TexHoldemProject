import type { RuntimeScenario } from "../types";
import { Card } from "./Card";

type HandInfoCardProps = {
  scenario: RuntimeScenario;
};

export function HandInfoCard({ scenario }: HandInfoCardProps) {
  return (
    <Card eyebrow={scenario.title_cn} title={scenario.prompt_cn}>
      <div className="detail-grid">
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
    </Card>
  );
}
