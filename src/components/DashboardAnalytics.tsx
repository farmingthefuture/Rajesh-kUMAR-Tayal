import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Search, Bell, Users, MessageSquareText, FileCheck2, Info } from 'lucide-react';
import { Visitor, OperationalMetrics } from '../types';

interface DashboardAnalyticsProps {
  metrics: OperationalMetrics;
  onSearchQueryChange: (query: string) => void;
  visitors: Visitor[];
}

export default function DashboardAnalytics({
  metrics,
  onSearchQueryChange,
  visitors,
}: DashboardAnalyticsProps) {
  const [chartMode, setChartMode] = useState<'weekly' | 'monthly'>('weekly');
  const [searchVal, setSearchVal] = useState('');

  // Weekly and Monthly synthetic points
  const weeklyData = [
    { label: 'Week 1', height: 'h-[40%]' },
    { label: 'Week 2', height: 'h-[65%]' },
    { label: 'Week 3', height: 'h-[45%]' },
    { label: 'Week 4', height: 'h-[80%]' },
    { label: 'Week 5', height: 'h-[60%]' },
    { label: 'Week 6', height: 'h-[88%]' },
    { label: 'Week 7', height: 'h-[95%]' },
    { label: 'Week 8', height: 'h-[75%]' },
  ];

  const monthlyData = [
    { label: 'Jan', height: 'h-[75%]' },
    { label: 'Feb', height: 'h-[90%]' },
    { label: 'Mar', height: 'h-[50%]' },
    { label: 'Apr', height: 'h-[85%]' },
    { label: 'May', height: 'h-[98%]' },
    { label: 'Jun', height: 'h-[60%]' },
    { label: 'Jul', height: 'h-[82%]' },
    { label: 'Aug', height: 'h-[92%]' },
  ];

  const currentChartData = chartMode === 'weekly' ? weeklyData : monthlyData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    onSearchQueryChange(e.target.value);
  };

  // Interest distribution details
  const interestAreas = [
    { name: 'CBG Solutions (SATAT)', percentage: 45, color: 'bg-[#01261f]' },
    { name: 'Bio-Coal Production', percentage: 30, color: 'bg-[#8C8880]' },
    { name: 'Investor Relations', percentage: 15, color: 'bg-[#C4B293]' },
    { name: 'Sustainable Farming (Napier)', percentage: 10, color: 'bg-[#1A1A1A]' },
  ];

  return (
    <div className="flex flex-col gap-10 w-full animate-fade-in text-[#1A1A1A]">
      {/* Top Header of the Admin Overview */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#1A1A1A]">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8C8880] mb-2 block">Executive Board</span>
          <h2 className="font-serif italic text-4xl md:text-5xl text-[#01261f] leading-none text-left">Operational Overview</h2>
          <p className="text-xs text-[#1A1A1A]/70 mt-2 font-serif italic text-left">Real-time parameters for RKTAS agrarian leads &amp; AI chat logs.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Filter visitors..."
              value={searchVal}
              onChange={handleInputChange}
              className="bg-[#F4F1EA] border border-[#1A1A1A] rounded-none px-4 py-2 text-xs font-mono w-60 text-[#1A1A1A] outline-none pr-9 uppercase placeholder:text-[#8C8880]/70 focus:bg-white"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1A1A] w-3.5 h-3.5" />
          </div>
          
          <button className="border border-[#1A1A1A] bg-transparent text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4F1EA] w-9 h-9 rounded-none flex items-center justify-center transition-all relative cursor-pointer">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#01261f] border border-[#F4F1EA]"></span>
          </button>
        </div>
      </header>

      {/* Grid of 3 High Contrast Editorial Metric Sheets */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#1A1A1A] bg-[#E9E5DC]/30">
        {/* Metric Board 1 */}
        <div className="p-8 border-r border-[#1A1A1A] md:border-b-0 border-b flex flex-col justify-between last:border-r-0">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8C8880]">01 / Traffic Volume</span>
            <Users className="w-4 h-4 text-[#01261f]" />
          </div>
          <div className="my-6">
            <span className="font-serif italic text-5xl font-normal text-[#01261f]">{metrics.totalVisitorsToday.toLocaleString()}</span>
            <p className="text-[10px] font-mono uppercase tracking-wider text-[#8C8880] mt-1">Total Visitors Today</p>
          </div>
          <div className="flex items-center gap-1 text-[#01261f] font-mono text-[9px] uppercase tracking-wider">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+12% vs last week</span>
          </div>
        </div>

        {/* Metric Board 2 */}
        <div className="p-8 border-r border-[#1A1A1A] md:border-b-0 border-b flex flex-col justify-between last:border-r-0">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8C8880]">02 / Support Pipeline</span>
            <MessageSquareText className="w-4 h-4 text-[#01261f]" />
          </div>
          <div className="my-6">
            <span className="font-serif italic text-5xl font-normal text-[#01261f]">{metrics.activeSessions}</span>
            <p className="text-[10px] font-mono uppercase tracking-wider text-[#8C8880] mt-1">Active AI Sessions</p>
          </div>
          <div className="flex items-center gap-1.5 text-[#01261f] font-mono text-[9px] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 bg-[#01261f] animate-ping"></span>
            <span>Live Agent Diagnostics</span>
          </div>
        </div>

        {/* Metric Board 3 */}
        <div className="p-8 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8C8880]">03 / Conversions</span>
            <FileCheck2 className="w-4 h-4 text-[#01261f]" />
          </div>
          <div className="my-6">
            <span className="font-serif italic text-5xl font-normal text-[#01261f]">{metrics.newLeadsGenerated}</span>
            <p className="text-[10px] font-mono uppercase tracking-wider text-[#8C8880] mt-1">New Leads Logged</p>
          </div>
          <div className="flex items-center gap-1 text-[#01261f] font-mono text-[9px] uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Valid Contract Matches</span>
          </div>
        </div>
      </section>

      {/* Distribution/Graphics charts block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Dynamic Column Chart */}
        <div className="lg:col-span-8 border border-[#1A1A1A] p-8 bg-white/40 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#8C8880]">Data Plate IV</span>
              <h3 className="font-serif italic text-2xl text-[#01261f] mt-1 text-left">Visitor Traffic Over Time</h3>
            </div>
            
            {/* Minimalist Switch Toggle */}
            <div className="flex bg-[#E9E5DC] p-1 border border-[#1A1A1A]">
              <button
                onClick={() => setChartMode('weekly')}
                className={`px-4 py-1 font-mono text-[9px] uppercase tracking-widest font-semibold transition-all cursor-pointer ${
                  chartMode === 'weekly' ? 'bg-[#1A1A1A] text-white' : 'text-[#1a1a1a]/70 hover:bg-[#F4F1EA]'
                }`}
              >
                Weekly Loop
              </button>
              <button
                onClick={() => setChartMode('monthly')}
                className={`px-4 py-1 font-mono text-[9px] uppercase tracking-widest font-semibold transition-all cursor-pointer ${
                  chartMode === 'monthly' ? 'bg-[#1A1A1A] text-white' : 'text-[#1a1a1a]/70 hover:bg-[#F4F1EA]'
                }`}
              >
                Monthly Scale
              </button>
            </div>
          </div>

          {/* Symmetrical Print Hatch Line Column Bar representation */}
          <div className="h-60 flex items-end justify-between gap-4 px-4 relative pt-6 border-b border-[#1A1A1A]">
            {/* Dotted horizontal guides */}
            <div className="absolute left-0 right-0 top-1/4 border-b border-dashed border-[#1A1A1A]/10 text-[9px] font-mono text-[#8C8880] select-none flex justify-between px-2">
              <span>90% Baseline Range</span>
              <span>Optimal</span>
            </div>
            <div className="absolute left-0 right-0 top-2/4 border-b border-dashed border-[#1A1A1A]/10 text-[9px] font-mono text-[#8C8880] select-none flex justify-between px-2">
              <span>50% Operational Level</span>
              <span>Median</span>
            </div>

            {currentChartData.map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group/bar">
                {/* Vintage Solid Ink Column Bar representation with fine border */}
                <div
                  className={`w-full bg-[#E9E5DC] border border-[#1A1A1A] group-hover/bar:bg-[#01261f] group-hover/bar:border-[#01261f] relative transition-all duration-300 ease-out flex items-end justify-center ${bar.height}`}
                >
                  {/* Bullet Marker anchor representing top margin */}
                  <div className="w-1.5 h-1.5 bg-[#1A1A1A] border border-white absolute -top-1 rounded-none group-hover/bar:bg-white transition-colors duration-300"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4 font-mono text-[9px] uppercase tracking-wider text-[#8C8880] px-1">
            {currentChartData.map((bar, index) => (
              <span key={index}>{bar.label}</span>
            ))}
          </div>
        </div>

        {/* Product Areas / Distribution Progress Panel */}
        <div className="lg:col-span-4 border border-[#1A1A1A] p-8 bg-[#E9E5DC]/25 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6 border-b border-[#1A1A1A] pb-3">
              <h3 className="font-serif italic text-2xl text-[#01261f] text-left">Sector Interest</h3>
              <Info className="w-3.5 h-3.5 text-[#8C8880] cursor-pointer" title="AI categorization parameters" />
            </div>
            
            <div className="space-y-6">
              {interestAreas.map((area, idx) => (
                <div key={idx}>
                  <div className="flex justify-between font-mono text-[10px] uppercase tracking-wider mb-2">
                    <span className="text-[#1A1A1A] font-medium">{area.name}</span>
                    <span className="text-[#01261f] font-bold">{area.percentage}%</span>
                  </div>
                  {/* Flat sharp boundary bar */}
                  <div className="w-full h-2.5 bg-[#F4F1EA] border border-[#1A1A1A] rounded-none overflow-hidden">
                    <div
                      className={`h-full ${area.color} transition-all duration-1000`}
                      style={{ width: `${area.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-[10px] font-mono uppercase text-[#8C8880] tracking-wider leading-relaxed mt-8 bg-[#F4F1EA]/80 p-3.5 border border-[#1A1A1A]/30">
            ⚡ Structured based on AI-analyzed support chat logs, harvest requests, and active contract leads from Punjab and Haryana divisions over the last 24 hours.
          </div>
        </div>
      </div>
    </div>
  );
}
