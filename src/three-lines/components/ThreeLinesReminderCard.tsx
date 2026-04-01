import { Card } from "../../components/Card";
import type { ThreeLinesReminderCard as ThreeLinesReminderCardType } from "../types";
import { localizePokerTerms } from "../lib/terminology";
import { TrackPill } from "./TrackPill";

type ThreeLinesReminderCardProps = {
  card: ThreeLinesReminderCardType;
};

export function ThreeLinesReminderCard({ card }: ThreeLinesReminderCardProps) {
  return (
    <Card eyebrow="今晚可直接带上桌" title="先记住这 3 条">
      <div className="stack">
        <TrackPill track={card.sourceTrack} />
        <ol className="ordered-list">
          {card.remember.map((item) => (
            <li key={item}>{localizePokerTerms(item)}</li>
          ))}
        </ol>
        <div className="stack">
          <div>
            <span className="detail-label">今晚特别注意</span>
            <p>{localizePokerTerms(card.versus)}</p>
          </div>
          <div>
            <span className="detail-label">行动线提醒</span>
            <p>{localizePokerTerms(card.lineCue)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
