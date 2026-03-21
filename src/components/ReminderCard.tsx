import type { ReminderCard as ReminderCardType } from "../types";
import { Card } from "./Card";

type ReminderCardProps = {
  card: ReminderCardType;
};

export function ReminderCard({ card }: ReminderCardProps) {
  return (
    <Card eyebrow="今天上桌提醒" title="先记住这 3 条">
      <ol className="ordered-list">
        {card.remember.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
      <div className="stack">
        <div>
          <span className="detail-label">今晚特别注意的对手</span>
          <p>{card.watchOpponent}</p>
        </div>
        <div>
          <span className="detail-label">今晚先别这样</span>
          <p>{card.avoid}</p>
        </div>
      </div>
    </Card>
  );
}
