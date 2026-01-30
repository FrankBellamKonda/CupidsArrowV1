import React, { useState, useEffect } from 'react';
import { CoupleData } from '../types';
import { getPersuasiveMessage } from '../services/geminiService';
import { Heart, Frown, Sparkles } from 'lucide-react';

interface ProposalProps {
  data: CoupleData;
  onAccept: () => void;
}

const PHRASES = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Last chance!",
  "Surely not?",
  "You might regret this!",
  "Give it another thought!",
  "Are you absolutely certain?",
  "This could be a mistake!",
  "Have a heart!",
  "Don't be so cold!",
  "Change of heart?",
  "Wouldn't you reconsider?",
  "Is that your final answer?",
  "You're breaking my heart ;("
];

const Proposal: React.FC<ProposalProps> = ({ data, onAccept }) => {
  const [noCount, setNoCount] = useState(0);
  const [yesSize, setYesSize] = useState(1);
  const [aiReason, setAiReason] = useState<string | null>(null);
  const [isLoadingReason, setIsLoadingReason] = useState(false);

  // Logic for button sizing
  const handleNoClick = () => {
    setNoCount(noCount + 1);
    setYesSize(prev => prev + 0.5); // Grow Yes button
  };

  const getNoText = () => {
    return PHRASES[Math.min(noCount, PHRASES.length - 1)];
  };

  const fetchReason = async () => {
    if (isLoadingReason) return;
    setIsLoadingReason(true);
    const reason = await getPersuasiveMessage(data.partnerName, data.senderName);
    setAiReason(reason);
    setIsLoadingReason(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 z-10 relative">
      <div className="max-w-2xl w-full text-center space-y-8">
        
        {/* Main Image/Gif Placeholder */}
        <div className="mb-8 relative inline-block">
          <img 
            src={`https://media1.tenor.com/m/fJJKyXjJp50AAAAC/mocha-bear.gif`} 
            alt="Cute bear" 
            className="w-48 h-48 mx-auto rounded-2xl shadow-2xl border-4 border-white object-cover"
          />
          <div className="absolute -bottom-4 -right-4 bg-white p-2 rounded-full shadow-lg">
             <Heart className="w-8 h-8 text-red-500 fill-red-500 animate-bounce" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-pink-600 drop-shadow-sm font-hand leading-tight">
          {data.partnerName}, will you be my Valentine?
        </h1>

        {/* AI Assistant Bubble */}
        {aiReason && (
          <div className="animate-fade-in-up bg-white/90 backdrop-blur border border-pink-200 rounded-2xl p-4 shadow-lg max-w-md mx-auto transform transition-all">
             <p className="text-pink-600 font-medium italic">
               Cupid whispers: "{aiReason}"
             </p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
          <button
            onClick={onAccept}
            style={{ 
              transform: `scale(${yesSize})`,
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl z-20 min-w-[120px]"
          >
            {noCount === 0 ? "Yes" : `Yes! (${yesSize * 100}%)`}
          </button>

          <button
            onClick={handleNoClick}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full shadow-xl transition-all hover:scale-95 z-10 min-w-[120px]"
          >
            {getNoText()}
          </button>
        </div>
        
        {/* Help from Cupid Button - Only shows after first No */}
        {noCount > 0 && !aiReason && (
          <div className="mt-8">
            <button 
              onClick={fetchReason}
              disabled={isLoadingReason}
              className="text-pink-500 hover:text-pink-700 underline text-sm flex items-center justify-center gap-1 mx-auto transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              {isLoadingReason ? "Cupid is thinking..." : "Not sure? Ask Cupid for a sign!"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Proposal;