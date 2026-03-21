import type { PropsWithChildren } from "react";

export function AppChrome({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <div className="phone-frame">{children}</div>
    </div>
  );
}
