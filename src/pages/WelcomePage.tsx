import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { LoginSheet } from "../components/LoginSheet";
import { Page } from "../components/Page";
import { useAppState } from "../state/AppState";

export function WelcomePage() {
  const navigate = useNavigate();
  const { login, skipLogin } = useAppState();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Page title="练 5 手，带走今晚能用的提醒" subtitle="先练一次真实 spot，再把问题翻译成牌桌上可执行的动作。">
      <div className="stack">
        <Card title="下一场朋友局先别乱亏在这些地方">
          <div className="stack">
            <div className="feature-row">
              <strong>3 分钟类实战训练</strong>
              <span>像在牌桌上做选择，不是背理论。</span>
            </div>
            <div className="feature-row">
              <strong>生成今晚上桌提醒</strong>
              <span>练完就知道今晚该记住什么。</span>
            </div>
            <div className="feature-row">
              <strong>复盘自己真实打过的一手牌</strong>
              <span>赛后 1 分钟，知道自己亏在哪。</span>
            </div>
          </div>
        </Card>
        <Card eyebrow="示例结果" title="你最容易亏：在不利牌面还想继续施压">
          <p>今晚提醒：对爱跟注的朋友少 bluff，多 value。</p>
        </Card>
        <div className="stack">
          <Button onClick={() => navigate("/onboarding/step-1")}>开始第一组训练</Button>
          <Button variant="secondary" onClick={() => setShowLogin(true)}>
            我已有账号
          </Button>
        </div>
      </div>
      <LoginSheet
        open={showLogin}
        source="welcome_existing_user"
        onClose={() => setShowLogin(false)}
        onLogin={(phone) => {
          login(phone);
          setShowLogin(false);
          navigate("/home");
        }}
        onSkip={() => {
          skipLogin();
          setShowLogin(false);
        }}
      />
    </Page>
  );
}
