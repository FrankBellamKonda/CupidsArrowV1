import React, { useState, useEffect } from 'react';
import { CoupleData, DateVibe } from '../types';
import { getDateIdea } from '../services/geminiService';
import { Heart, Calendar, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CelebrationProps {
  data: CoupleData;
}

const Celebration: React.FC<CelebrationProps> = ({ data }) => {
  const [selectedVibe, setSelectedVibe] = useState<DateVibe>(DateVibe.ROMANTIC);
  const [dateIdea, setDateIdea] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fire confetti on mount
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
    
    // Initial Date Idea
    generateDateIdea(DateVibe.ROMANTIC);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateDateIdea = async (vibe: DateVibe) => {
    setLoading(true);
    setSelectedVibe(vibe);
    const idea = await getDateIdea(vibe, data.partnerName, data.senderName);
    setDateIdea(idea);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 z-10 relative text-center">
      <div className="max-w-2xl w-full bg-white/60 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white">
        
        <div className="mb-6 flex justify-center">
             <img 
            src="https://media1.tenor.com/m/M05wG2iE1hIAAAAC/milk-and-mocha-bear-couple.gif" 
            alt="Hugging bears" 
            className="w-64 h-64 object-cover rounded-2xl shadow-lg"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600 mb-6 font-hand">
          YAY! She said YES!
        </h1>
        
        <p className="text-xl text-gray-700 mb-8">
          This is going to be the best Valentine's Day ever, {data.partnerName}! ❤️
        </p>

        <div className="border-t-2 border-pink-100 pt-8 mt-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5 text-pink-500" />
            Our Date Destiny
          </h2>
          
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {Object.values(DateVibe).map((vibe) => (
              <button
                key={vibe}
                onClick={() => generateDateIdea(vibe)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedVibe === vibe 
                    ? 'bg-pink-500 text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-pink-50'
                }`}
              >
                {vibe}
              </button>
            ))}
          </div>

          <div className="bg-pink-50 p-6 rounded-2xl relative min-h-[120px] flex items-center justify-center">
            {loading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
            ) : (
              <div className="w-full">
                <p className="text-lg text-gray-800 italic leading-relaxed">
                  "{dateIdea}"
                </p>
                <div className="absolute bottom-2 right-2">
                  <button 
                    onClick={() => generateDateIdea(selectedVibe)}
                    className="p-2 text-pink-400 hover:text-pink-600 transition-colors"
                    title="Generate new idea"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Celebration;