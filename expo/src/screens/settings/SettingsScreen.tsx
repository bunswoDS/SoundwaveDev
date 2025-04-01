import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { colors } from '../../utils/styles';

interface SettingsScreenProps {
  isModal?: boolean;
  onClose?: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ 
  isModal = false, 
  onClose 
}) => {
  const { t } = useTranslation();
  const [maxReplays, setMaxReplays] = useState<number | null>(3);
  const [language, setLanguage] = useState<string>(i18n.language || 'en');

  const replayOptions = [1, 2, 3, 5, 10, null];
  const languageOptions = [
    { code: 'en', name: t('settings.languageOptions.en') },
    { code: 'fr', name: t('settings.languageOptions.fr') },
    { code: 'es', name: t('settings.languageOptions.es') },
  ];

  // Change language when selection changes
  const handleLanguageChange = (langCode: string) => {
    if (langCode !== 'es') {
      setLanguage(langCode);
      i18n.changeLanguage(langCode);
    }
  };

  // Save settings
  const handleSaveSettings = async () => {
    // In a real implementation, this would save settings to AsyncStorage
    console.log('Saving settings:', { maxReplays, language });
    
    // If it's a modal, close it after saving
    if (isModal && onClose) {
      onClose();
    }
  };

  // Load settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      // In a real implementation, this would use AsyncStorage
      const savedLanguage = language;
      const savedMaxReplays = '3'; // Placeholder
      
      if (savedMaxReplays) {
        setMaxReplays(savedMaxReplays.toString() === 'infinite' ? null : parseInt(savedMaxReplays, 10));
      }
    };
    
    loadSettings();
  }, []);

  const renderContent = () => (
    <ScrollView style={[styles.scrollContainer, isModal && styles.modalScrollContainer]}>
      <View style={styles.settingSection}>
        <Text style={[styles.settingTitle, isModal && styles.modalText]}>
          {t('settings.maxReplays')}
        </Text>
        <View style={styles.optionsContainer}>
          {replayOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                maxReplays === option ? styles.selectedOption : null,
                isModal && styles.modalOption
              ]}
              onPress={() => setMaxReplays(option)}
            >
              <Text style={[
                styles.optionText,
                maxReplays === option ? styles.selectedOptionText : null,
                isModal && styles.modalOptionText
              ]}>
                {option === null ? t('settings.infinite') : option.toString()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.settingSection}>
        <Text style={[styles.settingTitle, isModal && styles.modalText]}>
          {t('settings.language')}
        </Text>
        <View style={styles.optionsContainer}>
          {languageOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                language === option.code ? styles.selectedOption : null,
                option.code === 'es' && styles.disabledOption,
                isModal && styles.modalOption
              ]}
              onPress={() => handleLanguageChange(option.code)}
              disabled={option.code === 'es'}
            >
              <Text style={[
                styles.optionText,
                language === option.code ? styles.selectedOptionText : null,
                option.code === 'es' && styles.disabledOptionText,
                isModal && styles.modalOptionText
              ]}>
                {option.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveSettings}
      >
        <Text style={styles.saveButtonText}>{t('buttons.save')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  if (isModal) {
    return (
      <View style={styles.modalContainer}>
        {renderContent()}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>{t('settings.title')}</Text>
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalContainer: {
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    borderRadius: 12,
    padding: 16,
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 16,
  },
  scrollContainer: {
    flex: 1,
  },
  modalScrollContainer: {
    maxHeight: 400,
  },
  settingSection: {
    marginBottom: 24,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalText: {
    color: 'white',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    backgroundColor: '#e5e5e5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    margin: 4,
  },
  modalOption: {
    backgroundColor: '#444444',
  },
  selectedOption: {
    backgroundColor: colors.primary,
  },
  disabledOption: {
    opacity: 0.5,
  },
  optionText: {
    fontSize: 16,
  },
  modalOptionText: {
    color: 'white',
  },
  selectedOptionText: {
    color: 'white',
  },
  disabledOptionText: {
    color: '#999999',
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
