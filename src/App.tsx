import React from "react";
import { Routes, Route } from "react-router-dom";

// Import pages directly from existing Next.js app directory
import HomePage from "../app/page";
import CareerBankPage from "../app/career-bank/page";
import CoachingPage from "../app/coaching/page";
import CoachingInterviewTipsPage from "../app/coaching/interview-tips/page";
import CoachingResumeGuidelinesPage from "../app/coaching/resume-guidelines/page";
import CoachingStreamSelectionPage from "../app/coaching/stream-selection/page";
import CoachingStudyAbroadPage from "../app/coaching/study-abroad/page";
import AboutPage from "../app/about/page";
import ContactPage from "../app/contact/page";
import FeedbackPage from "../app/feedback/page";
import InterestQuizPage from "../app/interest-quiz/page";
import MultimediaGuidancePage from "../app/multimedia-guidance/page";
import ResourceLibraryPage from "../app/resource-library/page";
import SuccessStoriesPage from "../app/success-stories/page";
import BookmarksPage from "../app/bookmarks/page";

export default function App(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/career-bank" element={<CareerBankPage />} />
      <Route path="/coaching" element={<CoachingPage />} />
      <Route
        path="/coaching/interview-tips"
        element={<CoachingInterviewTipsPage />}
      />
      <Route
        path="/coaching/resume-guidelines"
        element={<CoachingResumeGuidelinesPage />}
      />
      <Route
        path="/coaching/stream-selection"
        element={<CoachingStreamSelectionPage />}
      />
      <Route
        path="/coaching/study-abroad"
        element={<CoachingStudyAbroadPage />}
      />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/feedback" element={<FeedbackPage />} />
      <Route path="/interest-quiz" element={<InterestQuizPage />} />
      <Route path="/multimedia-guidance" element={<MultimediaGuidancePage />} />
      <Route path="/resource-library" element={<ResourceLibraryPage />} />
      <Route path="/success-stories" element={<SuccessStoriesPage />} />
      <Route path="/bookmarks" element={<BookmarksPage />} />
    </Routes>
  );
}
