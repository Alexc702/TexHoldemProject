import type { PropsWithChildren, ReactNode } from "react";

type PageProps = PropsWithChildren<{
  title?: string;
  subtitle?: string;
  action?: ReactNode;
}>;

export function Page({ title, subtitle, action, children }: PageProps) {
  return (
    <main className="page">
      {(title || subtitle || action) && (
        <header className="page-header">
          <div>
            {title ? <h1>{title}</h1> : null}
            {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
          </div>
          {action}
        </header>
      )}
      {children}
    </main>
  );
}
