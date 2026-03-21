import { useState } from "react";
import { Button } from "./Button";
import { BottomSheet } from "./BottomSheet";

type LoginSheetProps = {
  open: boolean;
  source: string;
  onClose: () => void;
  onLogin: (phone: string) => void;
  onSkip: () => void;
};

export function LoginSheet({ open, source, onClose, onLogin, onSkip }: LoginSheetProps) {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <BottomSheet open={open} title="保存提醒与训练进度" onClose={onClose}>
      <div className="stack">
        <p className="muted">
          {source === "welcome_existing_user"
            ? "登录后可以继续你的训练记录。"
            : "登录后可跨设备保存提醒和训练进度。"}
        </p>
        <label className="field">
          <span>手机号</span>
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="输入手机号"
          />
        </label>
        <div className="field-inline">
          <label className="field">
            <span>验证码</span>
            <input
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="输入验证码"
            />
          </label>
          <Button
            variant="secondary"
            fullWidth={false}
            onClick={() => setSent(true)}
            disabled={phone.trim().length < 11}
          >
            {sent ? "已发送" : "发送验证码"}
          </Button>
        </div>
        <Button onClick={() => onLogin(phone)} disabled={phone.trim().length < 11 || !code.trim()}>
          登录并保存
        </Button>
        <Button variant="text" onClick={onSkip}>
          稍后再说
        </Button>
      </div>
    </BottomSheet>
  );
}
