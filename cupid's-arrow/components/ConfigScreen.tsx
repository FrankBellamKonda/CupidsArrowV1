import React, { useState } from 'react';
import { CoupleData } from '../types';
import { Heart, ArrowRight } from 'lucide-react';

interface ConfigScreenProps {
  onSave: (data: CoupleData) => void;
}

const ConfigScreen: React.FC<ConfigScreenProps> = ({ onSave }) => {
  const [partnerName, setPartnerName] = useState('');
  const [senderName, setSenderName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (partnerName.trim() && senderName.trim()) {
      onSave({
        partnerName: partnerName.trim(),
        senderName: senderName.trim(),
        isConfigured: true
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl max-w-md w-full border border-pink-100">
        <div className="flex justify-center mb-6">
          <div className="bg-pink-100 p-4 rounded-full">
            <Heart className="w-10 h-10 text-pink-500 fill-pink-500 animate-pulse" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2 font-hand">Cupid's Setup</h1>
        <p className="text-center text-gray-500 mb-8">
          Before we begin, who is this special request for?
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Her Name (The Valentine)</label>
            <input
              type="text"
              required
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
              placeholder="e.g. Juliet"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              required
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
              placeholder="e.g. Romeo"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-4 rounded-xl shadow-lg transform transition hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
          >
            Create Proposal
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
        
        <p className="text-xs text-center text-gray-400 mt-6">
          This setup screen will be hidden once you click create.
        </p>
      </div>
    </div>
  );
};

export default ConfigScreen;