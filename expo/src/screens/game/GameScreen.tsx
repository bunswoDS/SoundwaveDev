import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  ImageBackground, 
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { 
  Settings, 
  Music, 
  Home, 
  Dog, 
  Leaf, 
  Factory, 
  Gamepad2 
} from 'lucide-react-native';
import { colors } from '../../utils/styles';

const GameScreen: React.FC = () => {
  const { t } = useTranslation();
  const [currentSound, setCurrentSound] = useState<string | null>(null);
  const [replayCount, setReplayCount] = useState<number>(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [maxReplays, setMaxReplays] = useState<number | null>(3); // null means infinite
  const [showAnswerModal, setShowAnswerModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);

  // Load settings from AsyncStorage on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        // In a real implementation, this would use AsyncStorage instead of localStorage
        const savedMaxReplays = '3'; // Placeholder for AsyncStorage.getItem('maxReplays')
        if (savedMaxReplays) {
          // Type-safe comparison
          setMaxReplays(savedMaxReplays.toString() === 'infinite' ? null : parseInt(savedMaxReplays, 10));
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };
    
    loadSettings();
  }, []);

  // Categories with custom icons for grid layout
  const categories = [
    { 
      name: t('categories.music'), 
      color: colors.purple,
      icon: () => <Music color="white" size={56} />
    },
    { 
      name: t('categories.homeOffice'), 
      color: colors.warning,
      icon: () => <Home color="white" size={56} />
    },
    { 
      name: t('categories.animals'), 
      color: colors.orange,
      icon: () => <Dog color="white" size={56} />
    },
    { 
      name: t('categories.games'), 
      color: colors.danger,
      icon: () => <Gamepad2 color="white" size={56} />
    },
    { 
      name: t('categories.environment'), 
      color: colors.secondary,
      icon: () => <Leaf color="white" size={56} />
    },
    { 
      name: t('categories.industrial'), 
      color: colors.primary,
      icon: () => <Factory color="white" size={56} />
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
    <ImageBackground 
      source={require('../../assets/images/space-background.png')}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <SafeAreaView style={styles.safeArea}>
        {/* Logo and SoundWave Title */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.title}>{t('app.title')}</Text>
          </View>
        </View>
        
        {/* Replay and Reveal Buttons */}
        <View style={styles.controlButtons}>
          <TouchableOpacity 
            style={[
              styles.controlButton, 
              styles.replayButton,
              (!currentSound || (maxReplays !== null && replayCount >= maxReplays)) && styles.disabledButton
            ]}
            onPress={handleReplay}
            disabled={!currentSound || (maxReplays !== null && replayCount >= maxReplays)}
          >
            <Text style={styles.buttonText}>{t('buttons.replay')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.controlButton, 
              styles.revealButton,
              !currentSound && styles.disabledButton
            ]}
            onPress={handleReveal}
            disabled={!currentSound}
          >
            <Text style={styles.buttonText}>{t('buttons.reveal')}</Text>
          </TouchableOpacity>
        </View>
        
        {/* Category Buttons Grid */}
        <View style={styles.categoriesContainer}>
          <View style={styles.categoryRow}>
            {categories.slice(0, 2).map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.categoryButton, { backgroundColor: category.color }]}
                onPress={() => handleCategoryClick(category.name)}
              >
                {category.icon()}
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.categoryRow}>
            {categories.slice(2, 4).map((category, index) => (
              <TouchableOpacity
                key={index + 2}
                style={[styles.categoryButton, { backgroundColor: category.color }]}
                onPress={() => handleCategoryClick(category.name)}
              >
                {category.icon()}
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.categoryRow}>
            {categories.slice(4, 6).map((category, index) => (
              <TouchableOpacity
                key={index + 4}
                style={[styles.categoryButton, { backgroundColor: category.color }]}
                onPress={() => handleCategoryClick(category.name)}
              >
                {category.icon()}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Settings Button */}
        <View style={styles.settingsButtonContainer}>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => setShowSettingsModal(true)}
          >
            <Settings color="white" size={32} />
          </TouchableOpacity>
        </View>
        
        {/* Answer Reveal Modal */}
        <Modal
          visible={showAnswerModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowAnswerModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{t('game.answerTitle')}</Text>
              <Text style={styles.modalAnswer}>{answer}</Text>
              
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleModalReplay}
                  disabled={maxReplays !== null && replayCount >= maxReplays}
                >
                  <Text style={styles.modalButtonText}>{t('buttons.replay')}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setShowAnswerModal(false)}
                >
                  <Text style={styles.modalButtonText}>{t('buttons.close')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        
        {/* Settings Modal */}
        <Modal
          visible={showSettingsModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowSettingsModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{t('settings.title')}</Text>
              
              {/* Settings content would go here */}
              
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowSettingsModal(false)}
              >
                <Text style={styles.modalButtonText}>{t('buttons.close')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    marginBottom: 24,
  },
  controlButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginHorizontal: 8,
    elevation: 5,
  },
  replayButton: {
    backgroundColor: colors.primary,
  },
  revealButton: {
    backgroundColor: colors.secondary,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  categoriesContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 40,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  categoryButton: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 5,
  },
  settingsButtonContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  settingsButton: {
    backgroundColor: 'rgba(50, 50, 50, 0.7)',
    padding: 16,
    borderRadius: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#1f2937',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  modalAnswer: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default GameScreen;
