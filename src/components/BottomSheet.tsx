import type { PropsWithChildren } from "react";

type BottomSheetProps = PropsWithChildren<{
  open: boolean;
  title: string;
  onClose?: () => void;
}>;

export function BottomSheet({ open, title, onClose, children }: BottomSheetProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="sheet-backdrop">
      <div className="sheet">
        <div className="sheet-header">
          <h2>{title}</h2>
          {onClose ? (
            <button type="button" className="sheet-close" onClick={onClose}>
              关闭
            </button>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
}
