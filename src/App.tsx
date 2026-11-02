import { useState } from 'react';
import type { AppPage } from './types';
import { AccessibilityProvider, useAccessibility } from './context/AccessibilityContext';
import { AccessibilityBar } from './components/layout/AccessibilityBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/ui/ToastContainer';
import { CommandPalette } from './components/ui/CommandPalette';
import { MotionConfig } from 'framer-motion';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { TwoWayTalkPage } from './pages/TwoWayTalkPage';
import { SituationsPage } from './pages/SituationsPage';
import { SignConnectPage } from './pages/SignConnectPage';
import { SignCheckPage } from './pages/SignCheckPage';
import { EmergencyExpressPage } from './pages/EmergencyExpressPage';
import { QRPassPage } from './pages/QRPassPage';
import { HumanConnectPage } from './pages/HumanConnectPage';
import { QueueAssistancePage } from './pages/QueueAssistancePage';
import { OfflinePage } from './pages/OfflinePage';
import { InstitutionPage } from './pages/InstitutionPage';
import { VisualGuidesPage } from './pages/VisualGuidesPage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<AppPage>('landing');
  const [initialTalkPhrase, setInitialTalkPhrase] = useState<string | undefined>(undefined);
  const { reducedMotion, screenFlashActive } = useAccessibility();

  const handleNavigate = (page: AppPage, initialPhrase?: string) => {
    if (initialPhrase) {
      setInitialTalkPhrase(initialPhrase);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case 'talk':
        return <TwoWayTalkPage initialPhrase={initialTalkPhrase} onNavigate={handleNavigate} />;
      case 'situations':
        return <SituationsPage onNavigate={handleNavigate} />;
      case 'signconnect':
        return <SignConnectPage />;
      case 'signcheck':
        return <SignCheckPage onNavigate={handleNavigate} />;
      case 'emergency':
        return <EmergencyExpressPage />;
      case 'qrpass':
        return <QRPassPage />;
      case 'humanconnect':
        return <HumanConnectPage />;
      case 'visualguides':
        return <VisualGuidesPage onNavigate={handleNavigate} />;
      case 'queue':
        return <QueueAssistancePage />;
      case 'offline':
        return <OfflinePage onNavigate={handleNavigate} />;
      case 'institution':
        return <InstitutionPage />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <MotionConfig reducedMotion={reducedMotion ? 'always' : 'user'}>
      <div className="min-h-screen flex flex-col bg-brand-warmWhite text-brand-charcoal transition-colors selection:bg-brand-violet selection:text-white relative">
        {/* Optical Screen Flash Overlay for High Priority Soundless Visual Alerts */}
        {screenFlashActive && (
          <div
            role="alert"
            aria-live="assertive"
            aria-label="High-priority visual alert flash"
            className="fixed inset-0 pointer-events-none z-50 border-8 border-brand-coral bg-brand-coral/20 animate-pulse transition-opacity duration-300"
          />
        )}

        {/* Quick Accessibility Ribbon */}
        <AccessibilityBar />

        {/* Main Navigation */}
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

        {/* Dynamic Screen View */}
        <main className="flex-1 w-full" id="main-content">
          {renderPage()}
        </main>

        {/* Universal Footer */}
        <Footer onNavigate={handleNavigate} />

        {/* Global Soundless Visual Alerts & Command Palette */}
        <ToastContainer />
        <CommandPalette onNavigate={handleNavigate} />
      </div>
    </MotionConfig>
  );
}

export default function App() {
  return (
    <AccessibilityProvider>
      <AppContent />
    </AccessibilityProvider>
  );
}
