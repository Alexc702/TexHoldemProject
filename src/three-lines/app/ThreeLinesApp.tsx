import { Navigate, Route, Routes } from "react-router-dom";
import { AppChrome } from "../../components/AppChrome";
import { ThreeLinesHomePage } from "../pages/ThreeLinesHomePage";
import { ThreeLinesOnboardingStep1Page } from "../pages/ThreeLinesOnboardingStep1Page";
import { ThreeLinesOnboardingStep2Page } from "../pages/ThreeLinesOnboardingStep2Page";
import { ThreeLinesReminderPage } from "../pages/ThreeLinesReminderPage";
import { ThreeLinesReviewInputPage } from "../pages/ThreeLinesReviewInputPage";
import { ThreeLinesReviewResultPage } from "../pages/ThreeLinesReviewResultPage";
import { ThreeLinesTrackDetailPage } from "../pages/ThreeLinesTrackDetailPage";
import { ThreeLinesTrainingPage } from "../pages/ThreeLinesTrainingPage";
import { ThreeLinesTrainingResultPage } from "../pages/ThreeLinesTrainingResultPage";
import { ThreeLinesWelcomePage } from "../pages/ThreeLinesWelcomePage";

export function ThreeLinesApp() {
  return (
    <AppChrome>
      <Routes>
        <Route path="/" element={<Navigate to="welcome" replace />} />
        <Route path="welcome" element={<ThreeLinesWelcomePage />} />
        <Route path="onboarding/step-1" element={<ThreeLinesOnboardingStep1Page />} />
        <Route path="onboarding/step-2" element={<ThreeLinesOnboardingStep2Page />} />
        <Route path="home" element={<ThreeLinesHomePage />} />
        <Route path="tracks/:trackId" element={<ThreeLinesTrackDetailPage />} />
        <Route path="training/:trackId" element={<ThreeLinesTrainingPage />} />
        <Route path="training/:trackId/result" element={<ThreeLinesTrainingResultPage />} />
        <Route path="reminder" element={<ThreeLinesReminderPage />} />
        <Route path="review/input" element={<ThreeLinesReviewInputPage />} />
        <Route path="review/result" element={<ThreeLinesReviewResultPage />} />
      </Routes>
    </AppChrome>
  );
}
