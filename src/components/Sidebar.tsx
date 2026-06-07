import React from 'react';
import { BarChart3, Database, MessageSquareCode, Sliders, LogOut, Download } from 'lucide-react';
import { AdminProfile, Visitor } from '../types';

interface SidebarProps {
  currentTab: 'analytics' | 'database' | 'history' | 'settings';
  onChangeTab: (tab: 'analytics' | 'database' | 'history' | 'settings') => void;
  adminProfile: AdminProfile;
  visitors: Visitor[];
  onBackToHome: () => void;
}

export default function Sidebar({
  currentTab,
  onChangeTab,
  adminProfile,
  visitors,
  onBackToHome,
}: SidebarProps) {
  // Client-side JSON file downloader representing "Export Report"
  const handleExportData = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(visitors, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `rktas_visitor_leads_export_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (e) {
      console.error('Failed to export leads data', e);
    }
  };

  return (
    <aside className="w-64 bg-[#E9E5DC] border-r border-[#1A1A1A] h-screen flex flex-col py-8 px-5 fixed left-0 top-0 justify-between z-30 font-sans text-[#1A1A1A]">
      <div className="flex flex-col gap-8">
        {/* Brand Header */}
        <div className="border-b border-[#1A1A1A] pb-6">
          <div className="flex items-baseline justify-between">
            <h1 className="font-serif italic text-3xl font-bold tracking-tight text-[#01261f]">RKTAS&reg;</h1>
            <span className="font-mono text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 border border-[#1A1A1A] bg-[#01261f] text-white">
              PORTAL
            </span>
          </div>
          <p className="text-[9px] font-mono text-[#8C8880] tracking-[0.2em] uppercase mt-2">Executive Console</p>
        </div>

        {/* Tab Item Links */}
        <nav className="flex flex-col gap-1.5">
          <button
            onClick={() => onChangeTab('analytics')}
            className={`w-full px-4 py-3 flex items-center gap-3 transition-all cursor-pointer text-left font-mono text-xs uppercase tracking-wider ${
              currentTab === 'analytics'
                ? 'bg-[#1A1A1A] text-[#F4F1EA] font-semibold border border-[#1A1A1A]'
                : 'text-[#1A1A1A]/80 hover:bg-[#F4F1EA]/60 hover:text-[#01261f] border border-transparent'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => onChangeTab('database')}
            className={`w-full px-4 py-3 flex items-center gap-3 transition-all cursor-pointer text-left font-mono text-xs uppercase tracking-wider ${
              currentTab === 'database'
                ? 'bg-[#1A1A1A] text-[#F4F1EA] font-semibold border border-[#1A1A1A]'
                : 'text-[#1A1A1A]/80 hover:bg-[#F4F1EA]/60 hover:text-[#01261f] border border-transparent'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Visitor Base</span>
          </button>

          <button
            onClick={() => onChangeTab('history')}
            className={`w-full px-4 py-3 flex items-center gap-3 transition-all cursor-pointer text-left font-mono text-xs uppercase tracking-wider ${
              currentTab === 'history'
                ? 'bg-[#1A1A1A] text-[#F4F1EA] font-semibold border border-[#1A1A1A]'
                : 'text-[#1A1A1A]/80 hover:bg-[#F4F1EA]/60 hover:text-[#01261f] border border-transparent'
            }`}
          >
            <MessageSquareCode className="w-4 h-4" />
            <span>AI History</span>
          </button>

          <button
            onClick={() => onChangeTab('settings')}
            className={`w-full px-4 py-3 flex items-center gap-3 transition-all cursor-pointer text-left font-mono text-xs uppercase tracking-wider ${
              currentTab === 'settings'
                ? 'bg-[#1A1A1A] text-[#F4F1EA] font-semibold border border-[#1A1A1A]'
                : 'text-[#1A1A1A]/80 hover:bg-[#F4F1EA]/60 hover:text-[#01261f] border border-transparent'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Site Config</span>
          </button>
        </nav>
      </div>

      {/* Admin Executive Profile Card + Home Toggle */}
      <div className="flex flex-col gap-4">
        <button
          onClick={onBackToHome}
          className="text-[10px] font-mono tracking-widest uppercase font-semibold text-[#1A1A1A]/70 hover:text-[#01261f] transition-colors py-1.5 flex items-center justify-center gap-2 cursor-pointer border border-[#1A1A1A]/20 hover:border-[#1A1A1A] bg-transparent"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit (To Home)</span>
        </button>

        <div className="bg-[#F4F1EA] p-4 border border-[#1A1A1A] text-[#1A1A1A]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-none border border-[#1A1A1A] flex items-center justify-center overflow-hidden bg-white">
              <img
                src={adminProfile.avatarUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDokydDusa5_kkc2x8VB6BmFomQOjqUcz4TecB87UYMRisCXBamj2y2pDYBIb488IfQo10T3mtPoo1-jBMLmnMe2niceubutv2n0Jg1jm4OdDaIv4wJxSrEC3lx97Fl79n7XxgKhlxSxhZ-lCGzGlLN5glVTBN2LFbZib8gwqb7ImWEfPaeUsaGxW1vN7X2fDlbd-Cph89AB12pXz-l7P-aiC0G0HvtYGMi34kg3jj5fbif2UrgtVlPvWK-dOLXDYC148EuIiPDcQY'}
                alt={adminProfile.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none"
              />
            </div>
            <div className="min-w-0">
              <p className="font-serif italic font-semibold text-xs leading-tight text-[#01261f] truncate">{adminProfile.name}</p>
              <p className="text-[8px] font-mono text-[#8C8880] uppercase tracking-wider mt-1">{adminProfile.division}</p>
            </div>
          </div>
          
          <button
            onClick={handleExportData}
            className="w-full bg-[#1A1A1A] text-[#F4F1EA] hover:bg-transparent hover:text-[#1A1A1A] transition-all text-[9px] font-mono uppercase tracking-[0.15em] py-2 border border-[#1A1A1A] flex items-center justify-center gap-1.5 cursor-pointer font-bold"
          >
            <Download className="w-3 h-3" />
            <span>Export leads</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
