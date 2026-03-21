import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { LoginSheet } from "../components/LoginSheet";
import { Page } from "../components/Page";
import { ReminderCard } from "../components/ReminderCard";
import { useAppState } from "../state/AppState";

export function ReminderPage() {
  const navigate = useNavigate();
  const { state, login, skipLogin } = useAppState();
  const [showLogin, setShowLogin] = useState(false);

  if (!state.reminderCard) {
    return <Navigate to="/training/result" replace />;
  }

  return (
    <Page title="今天上桌提醒" subtitle="赛前扫一眼，今晚先打得更稳。">
      <div className="stack">
        <ReminderCard card={state.reminderCard} />
        <Button onClick={() => setShowLogin(true)}>保存并进入首页</Button>
      </div>
      <LoginSheet
        open={showLogin}
        source="save_reminder"
        onClose={() => setShowLogin(false)}
        onLogin={(phone) => {
          login(phone);
          setShowLogin(false);
          navigate("/home");
        }}
        onSkip={() => {
          skipLogin();
          setShowLogin(false);
          navigate("/home");
        }}
      />
    </Page>
  );
}
