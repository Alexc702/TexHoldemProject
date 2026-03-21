import type { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
  title?: string;
  eyebrow?: string;
  muted?: boolean;
}>;

export function Card({ title, eyebrow, muted = false, children }: CardProps) {
  return (
    <section className={`card ${muted ? "card-muted" : ""}`}>
      {eyebrow ? <div className="card-eyebrow">{eyebrow}</div> : null}
      {title ? <h2 className="card-title">{title}</h2> : null}
      {children}
    </section>
  );
}
