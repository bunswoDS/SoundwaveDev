import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Settings, RefreshCw, Music, Home, Dog, Leaf, Factory, Gamepad2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { default as SettingsContent } from './SettingsPage';

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentSound, setCurrentSound] = useState<string | null>(null);
  const [replayCount, setReplayCount] = useState<number>(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [maxReplays, setMaxReplays] = useState<number | null>(3); // null means infinite
  const [showAnswerModal, setShowAnswerModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedMaxReplays = localStorage.getItem('maxReplays');
    if (savedMaxReplays) {
      setMaxReplays(savedMaxReplays === 'infinite' ? null : parseInt(savedMaxReplays, 10));
    }
  }, []);

  // Categories with custom icons for grid layout
  const categories = [
    { 
      name: t('categories.music'), 
      color: 'bg-purple-500',
      icon: () => <Music className="h-14 w-14" />
    },
    { 
      name: t('categories.homeOffice'), 
      color: 'bg-yellow-500',
      icon: () => <Home className="h-14 w-14" />
    },
    { 
      name: t('categories.animals'), 
      color: 'bg-orange-500',
      icon: () => <Dog className="h-14 w-14" />
    },
    { 
      name: t('categories.games'), 
      color: 'bg-red-500',
      icon: () => <Gamepad2 className="h-14 w-14" />
    },
    { 
      name: t('categories.environment'), 
      color: 'bg-green-500',
      icon: () => <Leaf className="h-14 w-14" />
    },
    { 
      name: t('categories.industrial'), 
      color: 'bg-blue-500',
      icon: () => <Factory className="h-14 w-14" />
    }
  ];

  const handleCategoryClick = (category: string) => {
    // Reset state for new sound
    setCurrentSound(`${category} Sound`);
    setReplayCount(0);
    setAnswer(null);
    
    // In a real implementation, this would fetch a random sound from the category
    console.log(`Selected category: ${category}`);
  };

  const handleReplay = () => {
    if (maxReplays !== null && replayCount >= maxReplays) {
      // Maximum replays reached
      return;
    }
    
    // In a real implementation, this would replay the current sound
    setReplayCount(prev => prev + 1);
    console.log(`Replaying sound: ${currentSound}`);
  };

  const handleReveal = () => {
    // In a real implementation, this would play the verbal answer and show the text
    setAnswer(`This is a ${currentSound}`);
    setShowAnswerModal(true);
    console.log(`Revealing answer for: ${currentSound}`);
  };
  
  const handleModalReplay = () => {
    if (maxReplays !== null && replayCount >= maxReplays) {
      // Maximum replays reached
      return;
    }
    
    // In a real implementation, this would replay the current sound
    setReplayCount(prev => prev + 1);
    console.log(`Replaying sound from modal: ${currentSound}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      {/* iPhone 16 sized container */}
      <div className="relative w-full max-w-[390px] h-[844px] overflow-hidden flex flex-col" style={{
        backgroundImage: 'url("/images/space-background.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        {/* No redundant Earth image - removed as requested */}
        
        {/* Row 1: Logo and Sound Wave Icon */}
        <div className="relative z-10 flex flex-col items-center pt-8 pb-4">
          {/* Sound Wave Icon */}
          <div className="flex justify-center items-center mb-2">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3V21M8 6V18M4 9V15M16 6V18M20 9V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {/* SoundWave Title */}
          <Text style={styles.title}>{t('app.title')}</Text>
        </div>
        
        {/* Row 2: Replay and Reveal Buttons */}
        <div className="relative z-30 flex justify-center space-x-8 px-4 mb-8 mt-2">
          <button 
            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 ${!currentSound || (maxReplays !== null && replayCount >= maxReplays) ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleReplay}
            disabled={!currentSound || (maxReplays !== null && replayCount >= maxReplays)}
          >
            {t('buttons.replay')}
          </button>
          
          <button 
            className={`bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 ${!currentSound ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleReveal}
            disabled={!currentSound}
          >
            {t('buttons.reveal')}
          </button>
        </div>
        
        {/* Answer Reveal Modal */}
        <Dialog open={showAnswerModal} onOpenChange={setShowAnswerModal}>
          <DialogContent className="bg-gray-800 bg-opacity-95 backdrop-blur-md rounded-lg p-6 max-w-[320px] mx-auto border-2 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-center text-white">
                {t('game.answerTitle')}
              </DialogTitle>
            </DialogHeader>
            
            <div className="py-4 text-center">
              <div className="text-xl font-medium mb-6 text-white bg-black bg-opacity-80 p-3 rounded-md">{answer}</div>
              
              <button
                className={`flex items-center justify-center mx-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg mb-4 ${
                  (maxReplays !== null && replayCount >= maxReplays) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleModalReplay}
                disabled={maxReplays !== null && replayCount >= maxReplays}
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                {t('buttons.replay')}
              </button>
              
              {maxReplays !== null && replayCount >= maxReplays && (
                <div className="text-sm text-red-500 mt-2">
                  {t('game.maxReplayReached')}
                </div>
              )}
            </div>
            
            <DialogFooter>
              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowAnswerModal(false)}
              >
                {t('buttons.close')}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Rows 3-5: Category Buttons in a structured layout */}
        <div className="relative z-30 flex flex-col justify-center items-center">
          {/* Row 3: First two category buttons */}
          <div className="flex justify-center space-x-10 mb-8 mt-2">
            {categories.slice(0, 2).map((category) => {
              return (
                <button 
                  key={category.name}
                  className={`${category.color} text-white w-[110px] h-[110px] rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex flex-col items-center justify-center`}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  {category.icon()}
                </button>
              );
            })}
          </div>
          
          {/* Row 4: Middle two category buttons */}
          <div className="flex justify-center space-x-10 mb-8">
            {categories.slice(2, 4).map((category) => {
              return (
                <button 
                  key={category.name}
                  className={`${category.color} text-white w-[110px] h-[110px] rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex flex-col items-center justify-center`}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  {category.icon()}
                </button>
              );
            })}
          </div>
          
          {/* Row 5: Last two category buttons */}
          <div className="flex justify-center space-x-10 mb-8">
            {categories.slice(4, 6).map((category) => {
              return (
                <button 
                  key={category.name}
                  className={`${category.color} text-white w-[110px] h-[110px] rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex flex-col items-center justify-center`}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  {category.icon()}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Row 6: Settings Button (centered at bottom) */}
        <div className="relative z-30 flex justify-center items-center mt-4">
          <button 
            className="bg-gray-800 bg-opacity-70 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 transition-all duration-200"
            onClick={() => setShowSettingsModal(true)}
          >
            <Settings className="h-8 w-8" />
          </button>
        </div>
        
        {/* Settings Modal */}
        <Dialog open={showSettingsModal} onOpenChange={setShowSettingsModal}>
          <DialogContent className="bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-lg p-6 max-w-[320px] mx-auto border-2 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-center text-white">
                {t('settings.title')}
              </DialogTitle>
            </DialogHeader>
            
            <div className="py-4 text-white">
              <SettingsContent 
                isModal={true} 
                onClose={() => setShowSettingsModal(false)} 
              />
            </div>
          </DialogContent>
        </Dialog>
        
        {/* CMS Link (Hidden in Footer) */}
        <div className="absolute bottom-2 left-2 opacity-30 hover:opacity-100 z-20">
          <button 
            className="text-xs text-white"
            onClick={() => navigate('/cms')}
          >
            CMS
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
  },
});

export default GamePage;
