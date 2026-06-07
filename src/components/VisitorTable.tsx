import React, { useState } from 'react';
import { Search, Filter, Trash2, Mail, MapPin, UserPlus, X, Layers } from 'lucide-react';
import { Visitor } from '../types';

interface VisitorTableProps {
  visitors: Visitor[];
  onAddVisitor: (visitor: Omit<Visitor, 'id' | 'createdAt' | 'avatarColor'>) => void;
  onDeleteVisitor: (id: string) => void;
  onUpdateVisitorStatus: (id: string, newStatus: Visitor['status']) => void;
  searchQuery: string;
}

export default function VisitorTable({
  visitors,
  onAddVisitor,
  onDeleteVisitor,
  onUpdateVisitorStatus,
  searchQuery,
}: VisitorTableProps) {
  const [filterInterest, setFilterInterest] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form input states
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newInterest, setNewInterest] = useState<Visitor['interestArea']>('CBG Plant Query');
  const [newStatus, setNewStatus] = useState<Visitor['status']>('Active Lead');
  const [formError, setFormError] = useState('');

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim() || !newLocation.trim()) {
      setFormError('Please fill out all required fields.');
      return;
    }
    onAddVisitor({
      name: newName,
      email: newEmail,
      location: newLocation,
      interestArea: newInterest,
      status: newStatus,
    });
    // Reset Form fields
    setNewName('');
    setNewEmail('');
    setNewLocation('');
    setNewInterest('CBG Plant Query');
    setNewStatus('Active Lead');
    setFormError('');
    setShowAddModal(false);
  };

  // Processing filtered rows
  const filteredVisitors = visitors.filter((visitor) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      visitor.name.toLowerCase().includes(query) ||
      visitor.email.toLowerCase().includes(query) ||
      visitor.location.toLowerCase().includes(query);

    const matchesInterest =
      filterInterest === 'all' || visitor.interestArea === filterInterest;

    const matchesStatus =
      filterStatus === 'all' || visitor.status === filterStatus;

    return matchesSearch && matchesInterest && matchesStatus;
  });

  return (
    <div className="border border-[#1A1A1A] bg-white/60 p-8 min-h-[500px] flex flex-col justify-between text-[#1A1A1A] animate-fade-in">
      <div>
        {/* Table header bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#1A1A1A]">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#8C8880] mb-2 block font-semibold">Ledger Sheet</span>
            <h3 className="font-serif italic text-3xl text-[#01261f] text-left">Visitor Leads Database</h3>
            <p className="text-xs text-[#1A1A1A]/70 mt-2 font-serif italic text-left">Audit, analyze and manipulate live regional interest records.</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="border border-[#1A1A1A] bg-[#1A1A1A] text-[#F4F1EA] hover:bg-transparent hover:text-[#1A1A1A] px-5 py-3 rounded-none font-mono text-[10px] uppercase tracking-[0.15em] transition-all cursor-pointer font-bold flex items-center justify-center gap-2"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Manual Record</span>
          </button>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-8 bg-[#E9E5DC]/50 p-4 border border-[#1A1A1A]/30">
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#1A1A1A] uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-[#1A1A1A]" />
            <span>Filters:</span>
          </div>
          
          {/* Interest filter */}
          <select
            value={filterInterest}
            onChange={(e) => setFilterInterest(e.target.value)}
            className="bg-[#F4F1EA] border border-[#1A1A1A] text-[10px] font-mono text-[#1A1A1A] rounded-none px-4 py-2 cursor-pointer outline-none uppercase focus:bg-white"
          >
            <option value="all">All Interest Areas</option>
            <option value="CBG Plant Query">CBG Plant Queries</option>
            <option value="Investment">Investment Interests</option>
            <option value="Bio-Coal">Bio-Coal</option>
            <option value="Sustainable Farming">Sustainable Farming</option>
          </select>

          {/* Status filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#F4F1EA] border border-[#1A1A1A] text-[10px] font-mono text-[#1A1A1A] rounded-none px-4 py-2 cursor-pointer outline-none uppercase focus:bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="Active Lead">Active Lead</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified Lead">Qualified Lead</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>

        {/* Spreadsheet Data Grid */}
        <div className="overflow-x-auto border border-[#1A1A1A]">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead className="bg-[#E9E5DC] text-[#1A1A1A] border-b border-[#1A1A1A] font-mono text-[9px] uppercase tracking-[0.15em] font-semibold">
              <tr>
                <th className="p-4 border-r border-[#1A1A1A]/30">Visitor / Index</th>
                <th className="p-4 border-r border-[#1A1A1A]/30">Email Address</th>
                <th className="p-4 border-r border-[#1A1A1A]/30">Region</th>
                <th className="p-4 border-r border-[#1A1A1A]/30">Interest Scope</th>
                <th className="p-4 border-r border-[#1A1A1A]/30">Status Label</th>
                <th className="p-4 text-center">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A]/30 text-[#1A1A1A]">
              {filteredVisitors.length > 0 ? (
                filteredVisitors.map((v) => (
                  <tr key={v.id} className="hover:bg-[#E9E5DC]/20 transition-colors">
                    {/* User Profile */}
                    <td className="p-4 border-r border-[#1A1A1A]/25">
                      <div className="flex items-center gap-3">
                        {/* Branded Sharp square box avatar */}
                        <div className="w-8 h-8 rounded-none border border-[#1A1A1A] bg-[#01261f] text-white flex items-center justify-center font-mono text-[11px] font-bold shrink-0 select-none">
                          {v.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-serif italic font-bold text-sm text-[#01261f]">{v.name}</p>
                          <p className="text-[9px] font-mono text-[#8C8880] mt-0.5">INDEX REG: #{v.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="p-4 border-r border-[#1A1A1A]/25 text-xs">
                      <div className="flex items-center gap-1.5 text-[#1A1A1A]/80">
                        <Mail className="w-3.5 h-3.5 text-[#8C8880]" />
                        <span className="font-mono">{v.email}</span>
                      </div>
                    </td>

                    {/* Region */}
                    <td className="p-4 border-r border-[#1A1A1A]/25 text-xs font-serif italic text-[#1A1A1A]">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#8C8880]" />
                        <span>{v.location}</span>
                      </div>
                    </td>

                    {/* Interest Area */}
                    <td className="p-4 border-r border-[#1A1A1A]/25 text-xs">
                      <span className="inline-flex items-center gap-1.5 font-bold text-[#01261f]">
                        <Layers className="w-3.5 h-3.5 text-[#01261f]" />
                        {v.interestArea}
                      </span>
                    </td>

                    {/* Interactive Dropdown Status Setter */}
                    <td className="p-4 border-r border-[#1A1A1A]/25">
                      <select
                        value={v.status}
                        onChange={(e) => onUpdateVisitorStatus(v.id, e.target.value as Visitor['status'])}
                        className={`text-[10px] font-mono font-bold px-3 py-1.5 rounded-none border border-[#1A1A1A] cursor-pointer outline-none uppercase bg-white ${
                          v.status === 'Active Lead'
                            ? 'text-red-800'
                            : v.status === 'Contacted'
                            ? 'text-amber-800'
                            : v.status === 'Qualified Lead'
                            ? 'text-[#01261f]'
                            : 'text-indigo-800'
                        }`}
                      >
                        <option value="Active Lead">Active Lead</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified Lead">Qualified Lead</option>
                        <option value="In Progress">In Progress</option>
                      </select>
                    </td>

                    {/* Action Panel Buttons */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => onDeleteVisitor(v.id)}
                        className="border border-[#1A1A1A]/30 bg-transparent text-[#1A1A1A] hover:bg-red-950 hover:text-white p-1.5 cursor-pointer rounded-none hover:border-red-950 transition-colors"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-[#8C8880] font-serif italic leading-relaxed">
                    No active records matches your filtered parameters. Add manual records or optimize query metrics.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Status line */}
      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#8C8880] mt-8 pt-4 border-t border-[#1A1A1A]/20">
        <span>Showing {filteredVisitors.length} of {visitors.length} total entries</span>
        <span>RKTAS SECURE LEDGER ENCRYPTION</span>
      </div>

      {/* Modal Overlay / Drawer Interface */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]/60 backdrop-blur-xs px-4">
          <div className="bg-[#F4F1EA] border border-[#1A1A1A] rounded-none w-full max-w-lg p-8 shadow-2xl relative">
            <div className="flex justify-between items-center pb-4 border-b border-[#1A1A1A] mb-6">
              <h4 className="font-serif italic text-2xl font-bold text-[#01261f]">Add Manual Record</h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#1A1A1A] hover:text-[#01261f] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs font-semibold">
              {formError && (
                <p className="bg-red-50 text-red-800 p-3 rounded-none border border-red-950/20 font-mono text-[10px] uppercase">{formError}</p>
              )}

              {/* Full name input */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] uppercase tracking-wider text-[#8C8880]">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Amritpal Singh"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="bg-white border border-[#1A1A1A] rounded-none px-4 py-3 outline-none focus:bg-white w-full text-xs font-mono uppercase"
                  required
                />
              </div>

              {/* Email Address input */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] uppercase tracking-wider text-[#8C8880]">Email Address *</label>
                <input
                  type="email"
                  placeholder="e.g. info@rktas.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="bg-white border border-[#1A1A1A] rounded-none px-4 py-3 outline-none focus:bg-white w-full text-xs font-mono"
                  required
                />
              </div>

              {/* Region location input */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] uppercase tracking-wider text-[#8C8880]">Location / Region *</label>
                <input
                  type="text"
                  placeholder="e.g. Ludhiana, Punjab"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="bg-white border border-[#1A1A1A] rounded-none px-4 py-3 outline-none focus:bg-white w-full text-xs font-mono uppercase"
                  required
                />
              </div>

              {/* Selector panels for tech interests and default statuses */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] uppercase tracking-wider text-[#8C8880]">Technology Interest</label>
                  <select
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value as Visitor['interestArea'])}
                    className="bg-white border border-[#1A1A1A] rounded-none px-3 py-2.5 outline-none font-mono text-[10px] uppercase cursor-pointer"
                  >
                    <option value="CBG Plant Query">CBG Plant Query</option>
                    <option value="Investment">Investment</option>
                    <option value="Bio-Coal">Bio-Coal</option>
                    <option value="Sustainable Farming">Sustainable Farming</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] uppercase tracking-wider text-[#8C8880]">Status Level</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as Visitor['status'])}
                    className="bg-white border border-[#1A1A1A] rounded-none px-3 py-2.5 outline-none font-mono text-[10px] uppercase cursor-pointer"
                  >
                    <option value="Active Lead">Active Lead</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified Lead">Qualified Lead</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </div>
              </div>

              {/* Actions submit drawer */}
              <div className="flex items-center gap-4 pt-4 border-t border-[#1A1A1A] mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 border border-[#1A1A1A]/40 text-[#1A1A1A] hover:bg-[#1A1A1A]/5 py-3 rounded-none font-mono text-[10px] uppercase tracking-wider cursor-pointer text-center font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#1A1A1A] border border-[#1A1A1A] text-[#F4F1EA] hover:bg-transparent hover:text-[#1A1A1A] py-3 rounded-none font-mono text-[10px] uppercase tracking-wider cursor-pointer text-center font-bold"
                >
                  Register Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
