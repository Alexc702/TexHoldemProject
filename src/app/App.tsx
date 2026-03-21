import { Navigate, Route, Routes } from "react-router-dom";
import { AppChrome } from "../components/AppChrome";
import { HomePage } from "../pages/HomePage";
import { OnboardingStep1Page } from "../pages/OnboardingStep1Page";
import { OnboardingStep2Page } from "../pages/OnboardingStep2Page";
import { ReminderPage } from "../pages/ReminderPage";
import { ReviewInputPage } from "../pages/ReviewInputPage";
import { ReviewResultPage } from "../pages/ReviewResultPage";
import { TrainingPage } from "../pages/TrainingPage";
import { TrainingResultPage } from "../pages/TrainingResultPage";
import { WelcomePage } from "../pages/WelcomePage";

export function App() {
  return (
    <AppChrome>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/onboarding/step-1" element={<OnboardingStep1Page />} />
        <Route path="/onboarding/step-2" element={<OnboardingStep2Page />} />
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/training/result" element={<TrainingResultPage />} />
        <Route path="/reminder" element={<ReminderPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/review/input" element={<ReviewInputPage />} />
        <Route path="/review/result" element={<ReviewResultPage />} />
      </Routes>
    </AppChrome>
  );
}
