import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import OnboardingFlow from './pages/OnboardingFlow';
import RecallSession from './pages/RecallSession';
import ResultPage from './pages/ResultPage';
import WeeklyReport from './pages/WeeklyReport';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import MainLayout from './components/layout/MainLayout';
import { Toaster } from './components/ui/toaster';

const AppRoutes = () => {
  const { profile, isLoading } = useApp();

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Loading...</div>;
  }

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={profile ? <Dashboard /> : <LandingPage />} />
        <Route path="/onboarding" element={<OnboardingFlow />} />

        {/* Protected-like routes (redirect to onboarding if no profile) */}
        <Route
          path="/recall"
          element={profile ? <RecallSession /> : <Navigate to="/onboarding" />}
        />
        <Route
          path="/day-result"
          element={profile ? <ResultPage /> : <Navigate to="/onboarding" />}
        />
        <Route
          path="/weekly"
          element={profile ? <WeeklyReport /> : <Navigate to="/onboarding" />}
        />
        <Route
          path="/history"
          element={profile ? <HistoryPage /> : <Navigate to="/onboarding" />}
        />
        <Route
          path="/settings"
          element={profile ? <SettingsPage /> : <Navigate to="/onboarding" />}
        />
      </Routes>
    </MainLayout>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
          <main className="max-w-[450px] mx-auto min-h-screen relative overflow-x-hidden border-x border-border/10">
            <AppRoutes />
          </main>
        </div>
        <Toaster />
      </Router>
    </AppProvider>
  );
}

export default App;
