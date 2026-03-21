import { getPackSummary } from "../lib/engine";
import type { PackId } from "../types";
import { Card } from "./Card";

type RecommendationCardProps = {
  packId?: PackId;
};

export function RecommendationCard({ packId }: RecommendationCardProps) {
  const summary = getPackSummary(packId);

  if (!summary) {
    return null;
  }

  return (
    <Card eyebrow="下一组推荐" title={summary.title}>
      <p>{summary.subtitle}</p>
    </Card>
  );
}
