import React, { useState, useEffect } from 'react';
import { AppState, CoupleData } from './types';
import ConfigScreen from './components/ConfigScreen';
import Proposal from './components/Proposal';
import Celebration from './components/Celebration';
import HeartBackground from './components/HeartBackground';

const STORAGE_KEY = 'valentine_app_data';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.CONFIG);
  const [coupleData, setCoupleData] = useState<CoupleData>({
    partnerName: '',
    senderName: '',
    isConfigured: false
  });

  useEffect(() => {
    // Check for saved config
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed.isConfigured) {
        setCoupleData(parsed);
        setAppState(AppState.PROPOSAL);
      }
    }
  }, []);

  const handleConfigSave = (data: CoupleData) => {
    setCoupleData(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setAppState(AppState.PROPOSAL);
  };

  const handleAcceptProposal = () => {
    setAppState(AppState.CELEBRATION);
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCoupleData({ partnerName: '', senderName: '', isConfigured: false });
    setAppState(AppState.CONFIG);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <HeartBackground />
      
      {appState === AppState.CONFIG && (
        <ConfigScreen onSave={handleConfigSave} />
      )}
      
      {appState === AppState.PROPOSAL && (
        <Proposal data={coupleData} onAccept={handleAcceptProposal} />
      )}
      
      {appState === AppState.CELEBRATION && (
        <Celebration data={coupleData} />
      )}

      {/* Hidden reset button for the user (bottom right corner, low opacity) */}
      {appState !== AppState.CONFIG && (
        <button 
          onClick={handleReset}
          className="fixed bottom-2 right-2 text-[10px] text-gray-300 hover:text-gray-500 z-50 p-2"
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default App;