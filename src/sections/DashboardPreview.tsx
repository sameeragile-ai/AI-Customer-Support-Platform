import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DASHBOARD_STATS } from '../data/mockData';
import { 
  BarChart3, MessageSquare, AlertCircle, CheckCircle2, 
  TrendingUp, TrendingDown, ArrowUpRight, Search, 
  Filter, Calendar, Clock, Download, ChevronRight, BookOpen, Sparkles
} from 'lucide-react';

export const DashboardPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'conversations' | 'gaps'>('overview');
  const [statusFilter, setStatusFilter] = useState<'all' | 'resolved' | 'escalated' | 'pending'>('all');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // 14-day resolution rate trend data for SVG area chart
  const chartData = [
    { day: 'Nov 1', rate: 64, volume: 820 },
    { day: 'Nov 2', rate: 66, volume: 890 },
    { day: 'Nov 3', rate: 65, volume: 860 },
    { day: 'Nov 4', rate: 68, volume: 940 },
    { day: 'Nov 5', rate: 67, volume: 910 },
    { day: 'Nov 6', rate: 70, volume: 990 },
    { day: 'Nov 7', rate: 69, volume: 960 },
    { day: 'Nov 8', rate: 72, volume: 1040 },
    { day: 'Nov 9', rate: 71, volume: 1010 },
    { day: 'Nov 10', rate: 73, volume: 1100 },
    { day: 'Nov 11', rate: 71.4, volume: 1120 },
  ];

  const filteredConversations = DASHBOARD_STATS.recentConversations.filter((c) => {
    if (statusFilter === 'resolved') return c.status.includes('Resolved');
    if (statusFilter === 'escalated') return c.status === 'Escalated';
    if (statusFilter === 'pending') return c.status === 'Pending';
    return true;
  });

  return (
    <section id="dashboard" className="py-24 sm:py-32 relative bg-[#0A0E1A] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(46,230,197,0.1)_0%,transparent_65%)] pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-slate-300 mb-4">
            <BarChart3 className="w-3.5 h-3.5 text-[#2EE6C5]" />
            <span>Mission Control</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Real-time analytics for your entire support operation.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Every conversation is indexed, scored, and categorized. Detect knowledge gaps, review source citations, and optimize containment rates with zero guesswork.
          </p>
        </div>

        {/* Dashboard Browser Frame Mockup */}
        <div className="rounded-2xl bg-[#111627] border border-white/[0.12] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Browser Window Chrome Top Bar */}
          <div className="px-4 py-3 bg-[#161C30] border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="hidden sm:flex items-center gap-2 ml-4 px-3 py-1 rounded-md bg-[#0A0E1A] border border-white/[0.06] text-[11px] text-slate-400 font-mono">
                <span className="text-[#2EE6C5]">https://</span>app.helmora.io/analytics/production
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 bg-[#0A0E1A] p-1 rounded-lg border border-white/[0.06]">
              {(['overview', 'conversations', 'gaps'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all capitalize cursor-pointer ${
                    activeTab === tab
                      ? 'bg-[#161C30] text-white shadow-sm border border-white/[0.08]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab === 'gaps' ? 'Knowledge Gaps' : tab}
                </button>
              ))}
            </div>
          </div>

          {/* Dashboard Main Content Body */}
          <div className="p-4 sm:p-8 space-y-8">
            
            {/* KPI Cards Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {DASHBOARD_STATS.kpis.map((kpi, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-[#161C30]/70 border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>{kpi.label}</span>
                    <span
                      className={`inline-flex items-center gap-0.5 font-mono text-[11px] font-semibold ${
                        kpi.trend === 'up' ? 'text-[#2EE6C5]' : 'text-[#7C5CFF]'
                      }`}
                    >
                      {kpi.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {kpi.change}
                    </span>
                  </div>
                  <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
                    {kpi.value}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">{kpi.subtext}</div>
                </div>
              ))}
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
                
                {/* Resolution Rate Area Chart (8 cols) */}
                <div className="lg:col-span-8 p-5 sm:p-6 rounded-xl bg-[#161C30]/50 border border-white/[0.06] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-heading text-sm font-bold text-white">
                        Autonomous Resolution Rate Trend
                      </h4>
                      <p className="text-xs text-slate-400">Past 14 days · Target threshold 70%</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2EE6C5]" />
                      <span>AI Resolution %</span>
                    </div>
                  </div>

                  {/* Pure SVG Animated Area Chart */}
                  <div className="relative w-full h-48 sm:h-56 mt-4">
                    <svg viewBox="0 0 500 160" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chart-area-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#2EE6C5" stopOpacity="0.28" />
                          <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Grid lines */}
                      <line x1="0" y1="20" x2="500" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                      <line x1="0" y1="65" x2="500" y2="65" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                      <line x1="0" y1="110" x2="500" y2="110" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                      
                      {/* Target 70% benchmark line */}
                      <line x1="0" y1="52" x2="500" y2="52" stroke="#7C5CFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

                      {/* Area Fill */}
                      <path
                        d="M 0,90 Q 50,80 100,82 T 200,68 T 300,56 T 400,44 T 500,38 L 500,150 L 0,150 Z"
                        fill="url(#chart-area-grad)"
                      />

                      {/* Line Stroke */}
                      <path
                        d="M 0,90 Q 50,80 100,82 T 200,68 T 300,56 T 400,44 T 500,38"
                        fill="none"
                        stroke="#2EE6C5"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      {/* Interactive Data Points */}
                      {[
                        { x: 0, y: 90, val: '64%' },
                        { x: 100, y: 82, val: '66%' },
                        { x: 200, y: 68, val: '68%' },
                        { x: 300, y: 56, val: '70%' },
                        { x: 400, y: 44, val: '72%' },
                        { x: 500, y: 38, val: '71.4%' },
                      ].map((pt, i) => (
                        <g key={i}>
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="4"
                            fill="#0A0E1A"
                            stroke="#2EE6C5"
                            strokeWidth="2"
                            className="cursor-pointer hover:scale-125 transition-transform"
                            onMouseEnter={() => setHoveredPoint(i)}
                            onMouseLeave={() => setHoveredPoint(null)}
                          />
                        </g>
                      ))}
                    </svg>
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-400 font-mono pt-3 border-t border-white/[0.05]">
                    <span>Nov 1</span>
                    <span>Nov 4</span>
                    <span>Nov 7</span>
                    <span>Nov 9</span>
                    <span className="text-[#2EE6C5] font-semibold">Today (71.4%)</span>
                  </div>
                </div>

                {/* Top Intents List (4 cols) */}
                <div className="lg:col-span-4 p-5 sm:p-6 rounded-xl bg-[#161C30]/50 border border-white/[0.06] flex flex-col justify-between">
                  <div>
                    <h4 className="font-heading text-sm font-bold text-white mb-1">Top Inquiry Intents</h4>
                    <p className="text-xs text-slate-400 mb-5">Categorized by semantic vector clustering</p>

                    <div className="space-y-4">
                      {DASHBOARD_STATS.intents.map((item, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-300 font-medium truncate max-w-[170px]">
                              {item.intent}
                            </span>
                            <span className="font-mono text-slate-400 tabular-nums">
                              {item.resolvedRate}% resolved
                            </span>
                          </div>
                          {/* Progress track */}
                          <div className="w-full h-1.5 bg-[#0A0E1A] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-signature-gradient rounded-full"
                              style={{ width: `${item.resolvedRate}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] text-center">
                    <span className="text-[11px] text-slate-400">
                      89% of order tracking requests resolved in &lt;30s
                    </span>
                  </div>
                </div>

              </div>
            )}

            {/* Tab 2: Live Conversations Table */}
            {activeTab === 'conversations' && (
              <div className="animate-fadeIn space-y-4">
                {/* Filter controls */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-1 bg-[#0A0E1A] p-1 rounded-lg border border-white/[0.06] text-xs">
                    {(['all', 'resolved', 'escalated', 'pending'] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setStatusFilter(filter)}
                        className={`px-3 py-1 rounded capitalize font-medium transition-colors cursor-pointer ${
                          statusFilter === filter
                            ? 'bg-[#161C30] text-white shadow-sm border border-white/[0.08]'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>

                  <span className="text-xs text-slate-400 font-mono">
                    Showing {filteredConversations.length} active threads
                  </span>
                </div>

                {/* Table Container */}
                <div className="rounded-xl border border-white/[0.08] overflow-x-auto bg-[#161C30]/40">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#161C30] text-slate-400 font-semibold border-b border-white/[0.08]">
                      <tr>
                        <th className="py-3 px-4">Thread ID</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Inquiry Query</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Confidence</th>
                        <th className="py-3 px-4">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {filteredConversations.map((c) => (
                        <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4 font-mono text-slate-400">{c.id}</td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-white block">{c.customer}</span>
                            <span className="text-[10px] text-slate-400">{c.company}</span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-300 max-w-xs truncate">
                            {c.query}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider inline-block ${
                                c.status.includes('Resolved')
                                  ? 'bg-emerald-500/15 text-[#2EE6C5] border border-emerald-500/25'
                                  : c.status === 'Escalated'
                                  ? 'bg-[#FF7A59]/15 text-[#FF7A59] border border-[#FF7A59]/25'
                                  : 'bg-amber-500/15 text-amber-300 border border-amber-500/25'
                              }`}
                            >
                              {c.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono tabular-nums text-slate-300">
                            {c.confidence}%
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-400 tabular-nums">
                            {c.duration}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 3: Knowledge Gaps */}
            {activeTab === 'gaps' && (
              <div className="animate-fadeIn p-6 rounded-xl bg-[#161C30]/40 border border-white/[0.06] space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-heading text-sm font-bold text-white">
                      Identified Knowledge Base Gaps
                    </h4>
                    <p className="text-xs text-slate-400">
                      Inquiries where Helmora escalated due to missing documentation chunks.
                    </p>
                  </div>
                  <span className="text-xs text-[#2EE6C5] bg-[#2EE6C5]/10 px-2.5 py-1 rounded-md border border-[#2EE6C5]/20 font-mono">
                    3 Suggestions Found
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    {
                      topic: 'EU VAT Invoice Self-Service Downloads',
                      unanswered: '42 occurrences this week',
                      impact: 'Could boost AI resolution by +3.4%',
                      action: 'Add 1 Help Article in Zendesk',
                    },
                    {
                      topic: 'Custom SSO SCIM Provisioning Guide',
                      unanswered: '28 occurrences this week',
                      impact: 'Could boost AI resolution by +1.8%',
                      action: 'Sync Notion Spec Doc',
                    },
                    {
                      topic: 'Weekend Courier Pickup Restrictions',
                      unanswered: '19 occurrences this week',
                      impact: 'Could boost AI resolution by +1.2%',
                      action: 'Update Shipping FAQ',
                    },
                  ].map((gap, gIdx) => (
                    <div
                      key={gIdx}
                      className="p-4 rounded-xl bg-[#0A0E1A] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="font-heading text-xs font-bold text-white mb-0.5">
                          {gap.topic}
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400">
                          <span>{gap.unanswered}</span>
                          <span>·</span>
                          <span className="text-[#2EE6C5]">{gap.impact}</span>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs font-semibold text-white transition-colors cursor-pointer shrink-0">
                        {gap.action} →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
