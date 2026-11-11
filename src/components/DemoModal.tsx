import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, CheckCircle2, User, Mail, Building, Users } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const DemoModal: React.FC = () => {
  const { isDemoModalOpen, setIsDemoModalOpen, addToast } = useCart();
  const [step, setStep] = useState<'form' | 'success'>('form');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: '10-50',
    selectedDate: 'Tomorrow at 2:00 PM EST',
    ticketVolume: '5,000 - 25,000 / mo',
  });

  const dates = [
    'Tomorrow at 10:00 AM EST',
    'Tomorrow at 2:00 PM EST',
    'Thursday at 11:30 AM EST',
    'Thursday at 4:00 PM EST',
    'Friday at 1:00 PM EST',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    addToast('Demo Scheduled!', 'Calendar invitation sent to your inbox.', 'success');
  };

  const handleClose = () => {
    setIsDemoModalOpen(false);
    setTimeout(() => setStep('form'), 300);
  };

  return (
    <AnimatePresence>
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-lg bg-[#111627] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden z-10 my-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/[0.08] flex items-center justify-between bg-[#161C30]/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-signature-gradient flex items-center justify-center text-white">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white">Book a Live Architecture Demo</h3>
                  <p className="text-xs text-slate-400">15-minute tailored walk-through with a Solutions Architect</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer"
                aria-label="Close demo scheduler"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {step === 'success' ? (
              <div className="p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-[#2EE6C5] mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-heading text-xl font-bold text-white mb-2">You’re on the calendar!</h4>
                <p className="text-xs text-slate-300 max-w-sm mb-6">
                  We reserved your slot for <span className="text-[#2EE6C5] font-semibold">{formData.selectedDate}</span>. A calendar invitation with Google Meet link has been dispatched to {formData.email || 'your email'}.
                </p>
                <button
                  onClick={handleClose}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-signature-gradient shadow-lg cursor-pointer"
                >
                  Return to Website
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#161C30] border border-white/[0.08] rounded-xl px-3.5 py-2.5 pl-9 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#7C5CFF]"
                    />
                    <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3.5" />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="Work Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#161C30] border border-white/[0.08] rounded-xl px-3.5 py-2.5 pl-9 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#7C5CFF]"
                    />
                    <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3.5" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-[#161C30] border border-white/[0.08] rounded-xl px-3.5 py-2.5 pl-9 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#7C5CFF]"
                    />
                    <Building className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3.5" />
                  </div>

                  <div className="relative">
                    <select
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      className="w-full bg-[#161C30] border border-white/[0.08] rounded-xl px-3.5 py-2.5 pl-9 text-xs text-white focus:outline-none focus:border-[#7C5CFF]"
                    >
                      <option value="1-10">1-10 Support Reps</option>
                      <option value="10-50">10-50 Support Reps</option>
                      <option value="50-200">50-200 Support Reps</option>
                      <option value="200+">200+ Enterprise</option>
                    </select>
                    <Users className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3.5" />
                  </div>
                </div>

                {/* Available Slots */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#2EE6C5]" />
                    <span>Select an available time slot:</span>
                  </label>
                  <div className="space-y-1.5">
                    {dates.map((date) => (
                      <button
                        type="button"
                        key={date}
                        onClick={() => setFormData({ ...formData, selectedDate: date })}
                        className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                          formData.selectedDate === date
                            ? 'bg-[#7C5CFF]/20 border border-[#7C5CFF]/60 text-white'
                            : 'bg-[#161C30] border border-white/[0.06] text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span>{date}</span>
                        {formData.selectedDate === date && (
                          <span className="text-[10px] text-[#2EE6C5] font-semibold">Selected</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-signature-gradient shadow-lg hover:shadow-cyan-500/25 transition-all cursor-pointer"
                >
                  Confirm 15-Minute Reservation
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
