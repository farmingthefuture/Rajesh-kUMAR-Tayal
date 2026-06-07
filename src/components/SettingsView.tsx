import React, { useState } from 'react';
import { User, Cpu, CheckCircle, Save, Sliders } from 'lucide-react';
import { AdminProfile } from '../types';

interface SettingsViewProps {
  adminProfile: AdminProfile;
  onUpdateAdminProfile: (profile: AdminProfile) => void;
  systemPersona: string;
  onUpdateSystemPersona: (persona: string) => void;
}

export const SYS_PERSONA_OPTIONS = [
  {
    id: 'expert',
    name: 'Standard RKTAS Assistant',
    description: 'Helpful general utility guide experienced with Napier Grass yields, CBG plants, and straw collections.',
  },
  {
    id: 'technical',
    name: 'Technical Bio-Coal Torrefaction Engineer',
    description: 'Highly detailed scientific briefings with deep emphasis on moisture resistance, chemical carbonization, and co-firing parameters.',
  },
  {
    id: 'agrarian',
    name: 'Agricultural Field Advisor',
    description: 'Expertise tailored toward Punjabi farmers: seed sowing cycles, root conservation, crop burning stats, and field prosperity.',
  },
];

export default function SettingsView({
  adminProfile,
  onUpdateAdminProfile,
  systemPersona,
  onUpdateSystemPersona,
}: SettingsViewProps) {
  // Local profile states
  const [profileName, setProfileName] = useState(adminProfile.name);
  const [profileDivision, setProfileDivision] = useState(adminProfile.division);
  const [profileEmail, setProfileEmail] = useState(adminProfile.email);
  const [profileAvatar, setProfileAvatar] = useState(adminProfile.avatarUrl);

  const [quota, setQuota] = useState(100);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAdminProfile({
      name: profileName,
      division: profileDivision,
      email: profileEmail,
      avatarUrl: profileAvatar,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full text-[#1A1A1A] animate-fade-in">
      {/* Profile Form (Left Column) */}
      <form onSubmit={handleSaveProfile} className="lg:col-span-6 border border-[#1A1A1A] bg-white/60 p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#1A1A1A]/10">
            <User className="w-4.5 h-4.5 text-[#01261f]" />
            <h3 className="font-serif italic text-2xl text-[#01261f]">Executive Profile</h3>
          </div>
          <p className="text-xs text-[#1A1A1A]/70 font-serif italic">Update the active administrative personnel info visible on the sidebar.</p>
        </div>

        {saveSuccess && (
          <div className="bg-[#E9E5DC] text-[#01261f] p-4 border border-[#1A1A1A] text-xs font-mono uppercase tracking-wider flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#01261f]" />
            <span>Profile settings registered!</span>
          </div>
        )}

        <div className="space-y-5 text-xs font-semibold">
          {/* Admin Name */}
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="font-mono text-[9px] uppercase tracking-wider text-[#8C8880]">Staff Full Name</label>
            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              className="bg-[#F4F1EA] border border-[#1A1A1A] rounded-none px-4 py-3 outline-none focus:bg-white text-xs font-mono uppercase"
              required
            />
          </div>

          {/* Regional Division */}
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="font-mono text-[9px] uppercase tracking-wider text-[#8C8880]">Regional Division Office</label>
            <input
              type="text"
              value={profileDivision}
              onChange={(e) => setProfileDivision(e.target.value)}
              className="bg-[#F4F1EA] border border-[#1A1A1A] rounded-none px-4 py-3 outline-none focus:bg-white text-xs font-mono uppercase"
              required
            />
          </div>

          {/* Core Support Email */}
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="font-mono text-[9px] uppercase tracking-wider text-[#8C8880]">Technical Support Email</label>
            <input
              type="email"
              value={profileEmail}
              onChange={(e) => setProfileEmail(e.target.value)}
              className="bg-[#F4F1EA] border border-[#1A1A1A] rounded-none px-4 py-3 outline-none focus:bg-white text-xs font-mono"
              required
            />
          </div>

          {/* Admin Avatar Photo Hotlink URL */}
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="font-mono text-[9px] uppercase tracking-wider text-[#8C8880]">Profile Avatar URL</label>
            <input
              type="url"
              value={profileAvatar}
              onChange={(e) => setProfileAvatar(e.target.value)}
              className="bg-[#F4F1EA] border border-[#1A1A1A] rounded-none px-4 py-3 outline-none focus:bg-white text-xs font-mono text-[#01261f] break-all"
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full bg-[#1A1A1A] border border-[#1A1A1A] text-[#F4F1EA] hover:bg-transparent hover:text-[#1A1A1A] py-3.5 rounded-none font-mono text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 inline mr-1.5" />
              <span>Save Profile Parameters</span>
            </button>
          </div>
        </div>
      </form>

      {/* AI Bot System Persona Selector and Settings (Right Column) */}
      <div className="lg:col-span-6 space-y-8">
        {/* Chatbot System Settings */}
        <div className="border border-[#1A1A1A] bg-white/60 p-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#1A1A1A]/10">
              <Cpu className="w-4.5 h-4.5 text-[#01261f]" />
              <h3 className="font-serif italic text-2xl text-[#01261f]">Agri-AI GenAgent Persona</h3>
            </div>
            <p className="text-xs text-[#1A1A1A]/70 font-serif italic text-left">Toggle custom system prompts and knowledge orientations for support chat.</p>
          </div>

          <div className="space-y-3">
            {SYS_PERSONA_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => onUpdateSystemPersona(opt.id)}
                className={`w-full p-4 rounded-none border text-left transition-all cursor-pointer ${
                  systemPersona === opt.id
                    ? 'bg-[#1A1A1A] text-[#F4F1EA] border-[#1A1A1A]'
                    : 'bg-[#F4F1EA]/60 border-[#1A1A1A]/20 hover:border-[#1A1A1A] hover:bg-[#E9E5DC]/50 hover:text-black'
                }`}
              >
                <p className={`font-serif italic font-bold text-sm ${systemPersona === opt.id ? 'text-[#F4F1EA]' : 'text-[#01261f]'}`}>
                  {opt.name}
                </p>
                <p className={`text-xs mt-1.5 leading-relaxed ${systemPersona === opt.id ? 'text-[#F4F1EA]/80' : 'text-[#8C8880]'}`}>
                  {opt.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Quota threshold simulation stats */}
        <div className="border border-[#1A1A1A] bg-[#E9E5DC]/20 p-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#1A1A1A]/10">
              <Sliders className="w-4.5 h-4.5 text-[#01261f]" />
              <h3 className="font-serif italic text-2xl text-[#01261f]">Harvest Quotas</h3>
            </div>
            <p className="text-xs text-[#1A1A1A]/70 font-serif italic text-left">Simulate collection processing capacities.</p>
          </div>

          <div className="space-y-4 font-semibold text-xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#8C8880]">Processing Target</span>
              <span className="text-[#01261f] font-mono text-sm font-bold">{quota} Metric Tonnes / Day</span>
            </div>
            
            <input
              type="range"
              min="20"
              max="500"
              value={quota}
              onChange={(e) => setQuota(Number(e.target.value))}
              className="w-full accent-[#01261f] bg-[#F4F1EA] h-1 border border-[#1A1A1A]/40 rounded-none appearance-none cursor-pointer"
            />
            
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#8C8880] leading-relaxed bg-[#F4F1EA] p-3 border border-[#1A1A1A]/20">
              Estimated fuel conversion: <span className="text-[#01261f] font-bold">{(quota * 0.42).toFixed(1)} MT</span> Bio-Coal Pellets / Day.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
