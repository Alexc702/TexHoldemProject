import type { RuntimeLeak } from "../types";
import { Card } from "./Card";

type LeakCardProps = {
  leak: RuntimeLeak;
};

export function LeakCard({ leak }: LeakCardProps) {
  return (
    <Card eyebrow="当前主问题" title={leak.leak_name_cn}>
      <p>{leak.user_facing_description}</p>
      <div className="pill-row">
        <span className="pill">{leak.family}</span>
      </div>
      <p className="muted">{leak.fix_principle}</p>
    </Card>
  );
}
