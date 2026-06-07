import { useState, useEffect } from 'react';
import {
  Visitor,
  OperationalMetrics,
  ChatSession,
  ChatMessage,
  AdminProfile,
  INITIAL_VISITORS,
  INITIAL_METRICS,
  INITIAL_CHAT_SESSIONS,
} from './types';

// Importing modular components
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';
import DashboardAnalytics from './components/DashboardAnalytics';
import VisitorTable from './components/VisitorTable';
import HistoryAI from './components/HistoryAI';
import SettingsView from './components/SettingsView';
import ChatAssistant from './components/ChatAssistant';

export default function App() {
  // Navigation & View Layout state parameters
  const [currentView, setCurrentView] = useState<'landing' | 'portal'>('landing');
  const [activeTab, setActiveTab] = useState<'analytics' | 'database' | 'history' | 'settings'>('analytics');

  // Core synchronized persistent database states
  const [visitors, setVisitors] = useState<Visitor[]>(() => {
    const local = localStorage.getItem('rktas_visitors');
    return local ? JSON.parse(local) : INITIAL_VISITORS;
  });

  const [metrics, setMetrics] = useState<OperationalMetrics>(() => {
    const local = localStorage.getItem('rktas_metrics');
    return local ? JSON.parse(local) : INITIAL_METRICS;
  });

  const [chatSessions, setChatSessions] = useState<ChatSession[]>(() => {
    const local = localStorage.getItem('rktas_chat_sessions');
    return local ? JSON.parse(local) : INITIAL_CHAT_SESSIONS;
  });

  const [activeSessionId, setActiveSessionId] = useState<string>(() => {
    const local = localStorage.getItem('rktas_active_session_id');
    return local || (INITIAL_CHAT_SESSIONS.length > 0 ? INITIAL_CHAT_SESSIONS[0].id : '');
  });

  const [adminProfile, setAdminProfile] = useState<AdminProfile>(() => {
    const local = localStorage.getItem('rktas_admin_profile');
    return local
      ? JSON.parse(local)
      : {
          name: 'Admin User',
          division: 'Punjab Division',
          email: 'admin@rktas.com',
          avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDokydDusa5_kkc2x8VB6BmFomQOjqUcz4TecB87UYMRisCXBamj2y2pDYBIb488IfQo10T3mtPoo1-jBMLmnMe2niceubutv2n0Jg1jm4OdDaIv4wJxSrEC3lx97Fl79n7XxgKhlxSxhZ-lCGzGlLN5glVTBN2LFbZib8gwqb7ImWEfPaeUsaGxW1vN7X2fDlbd-Cph89AB12pXz-l7P-aiC0G0HvtYGMi34kg3jj5fbif2UrgtVlPvWK-dOLXDYC148EuIiPDcQY',
        };
  });

  const [systemPersona, setSystemPersona] = useState<string>(() => {
    return localStorage.getItem('rktas_system_persona') || 'expert';
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Persisting states to local storage on changes
  useEffect(() => {
    localStorage.setItem('rktas_visitors', JSON.stringify(visitors));
  }, [visitors]);

  useEffect(() => {
    localStorage.setItem('rktas_metrics', JSON.stringify(metrics));
  }, [metrics]);

  useEffect(() => {
    localStorage.setItem('rktas_chat_sessions', JSON.stringify(chatSessions));
  }, [chatSessions]);

  useEffect(() => {
    localStorage.setItem('rktas_admin_profile', JSON.stringify(adminProfile));
  }, [adminProfile]);

  useEffect(() => {
    localStorage.setItem('rktas_system_persona', systemPersona);
  }, [systemPersona]);

  useEffect(() => {
    if (activeSessionId) {
      localStorage.setItem('rktas_active_session_id', activeSessionId);
    }
  }, [activeSessionId]);

  // Dynamic actions for managing manual visitors log
  const handleAddVisitor = (newVisitor: Omit<Visitor, 'id' | 'createdAt' | 'avatarColor'>) => {
    const avatarColorPool = [
      'bg-teal-700 text-teal-100',
      'bg-[#1A3C34] text-[#caee5d]',
      'bg-lime-700 text-lime-100',
      'bg-amber-700 text-amber-100',
      'bg-emerald-700 text-emerald-100',
    ];

    const finalVisitor: Visitor = {
      ...newVisitor,
      id: `${visitors.length + 1}`,
      createdAt: new Date().toISOString(),
      avatarColor: avatarColorPool[Math.floor(Math.random() * avatarColorPool.length)],
    };

    setVisitors([finalVisitor, ...visitors]);

    // Update operational counter dynamically
    setMetrics((prev) => ({
      ...prev,
      totalVisitorsToday: prev.totalVisitorsToday + 1,
      newLeadsGenerated: prev.newLeadsGenerated + 1,
    }));
  };

  const handleDeleteVisitor = (id: string) => {
    setVisitors(visitors.filter((v) => v.id !== id));
  };

  const handleUpdateVisitorStatus = (id: string, newStatus: Visitor['status']) => {
    setVisitors(
      visitors.map((v) => (v.id === id ? { ...v, status: newStatus } : v))
    );
  };

  // Chat Synchronizers
  const handleAddNewSession = (session: ChatSession) => {
    setChatSessions([session, ...chatSessions]);
    setActiveSessionId(session.id);
  };

  const handleUpdateSessionMessages = (msgs: ChatMessage[]) => {
    if (!activeSessionId) return;
    setChatSessions(
      chatSessions.map((s) => (s.id === activeSessionId ? { ...s, messages: msgs } : s))
    );
  };

  const activeChatSession = chatSessions.find((s) => s.id === activeSessionId) || null;

  return (
    <div className="bg-[#F5F5F7] min-h-screen text-[#1a1c1d] relative">
      {currentView === 'landing' ? (
        /* Landing View page */
        <LandingPage onEnterDashboard={() => setCurrentView('portal')} />
      ) : (
        /* Portal Executive Console page */
        <div className="flex bg-[#F5F5F7] min-h-screen">
          {/* Sidebar */}
          <Sidebar
            currentTab={activeTab}
            onChangeTab={setActiveTab}
            adminProfile={adminProfile}
            visitors={visitors}
            onBackToHome={() => setCurrentView('landing')}
          />

          {/* Main Content Workspace Container Layout */}
          <main className="flex-1 ml-64 p-8 md:p-12 overflow-y-auto max-w-7xl animate-fade-in">
            {activeTab === 'analytics' && (
              <DashboardAnalytics
                metrics={metrics}
                onSearchQueryChange={setSearchQuery}
                visitors={visitors}
              />
            )}

            {activeTab === 'database' && (
              <VisitorTable
                visitors={visitors}
                onAddVisitor={handleAddVisitor}
                onDeleteVisitor={handleDeleteVisitor}
                onUpdateVisitorStatus={handleUpdateVisitorStatus}
                searchQuery={searchQuery}
              />
            )}

            {activeTab === 'history' && (
              <HistoryAI
                sessions={chatSessions}
                onSelectSession={(session) => {
                  setActiveSessionId(session.id);
                  // Quick automatic toggle back and launch of support drawer
                }}
                activeSessionId={activeSessionId}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsView
                adminProfile={adminProfile}
                onUpdateAdminProfile={setAdminProfile}
                systemPersona={systemPersona}
                onUpdateSystemPersona={setSystemPersona}
              />
            )}
          </main>
        </div>
      )}

      {/* Persistent floating AI Support Assistant */}
      <ChatAssistant
        systemPersona={systemPersona}
        activeSession={activeChatSession}
        onUpdateSessionMessages={handleUpdateSessionMessages}
        onAddNewSession={handleAddNewSession}
      />
    </div>
  );
}
