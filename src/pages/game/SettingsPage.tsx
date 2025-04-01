import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

interface SettingsPageProps {
  isModal?: boolean;
  onClose?: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ isModal = false, onClose }) => {
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
  const handleSaveSettings = () => {
    // In a real implementation, this would save settings to local storage or database
    console.log('Saving settings:', { maxReplays, language });
    
    // Store language preference in localStorage
    localStorage.setItem('language', language);
    localStorage.setItem('maxReplays', maxReplays === null ? 'infinite' : maxReplays.toString());
    
    // If it's a modal, close it after saving
    if (isModal && onClose) {
      onClose();
    }
  };

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    const savedMaxReplays = localStorage.getItem('maxReplays');
    
    if (savedLanguage) {
      setLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }
    
    if (savedMaxReplays) {
      setMaxReplays(savedMaxReplays === 'infinite' ? null : parseInt(savedMaxReplays, 10));
    }
  }, []);

  // Render settings content
  const renderSettingsContent = () => (
    <>
      <View style={styles.settingSection}>
        <Text style={[styles.settingTitle, isModal ? { color: 'white' } : {}]}>{t('settings.maxReplays')}</Text>
        <View style={styles.optionsContainer}>
          {replayOptions.map((option) => (
            <button
              key={option === null ? 'infinite' : option}
              className={`m-1 px-4 py-2 rounded-md ${
                maxReplays === option 
                  ? 'bg-blue-500 text-white' 
                  : isModal ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800'
              }`}
              onClick={() => setMaxReplays(option)}
            >
              {option === null ? t('settings.infinite') : option}
            </button>
          ))}
        </View>
      </View>

      <View style={styles.settingSection}>
        <Text style={[styles.settingTitle, isModal ? { color: 'white' } : {}]}>{t('settings.language')}</Text>
        <View style={styles.optionsContainer}>
          {languageOptions.map((option) => (
            <button
              key={option.code}
              className={`m-1 px-4 py-2 rounded-md ${
                language === option.code 
                  ? 'bg-blue-500 text-white' 
                  : isModal ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800'
              } ${option.code === 'es' ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handleLanguageChange(option.code)}
              disabled={option.code === 'es'}
            >
              {option.name}
            </button>
          ))}
        </View>
      </View>

      <button 
        className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSaveSettings}
      >
        {t('buttons.save')}
      </button>
    </>
  );

  // Return different containers based on isModal prop
  return isModal ? (
    <View style={styles.modalContainer}>
      {renderSettingsContent()}
    </View>
  ) : (
    <View style={styles.container}>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">{t('settings.title')}</h3>
        </div>
        <div className="p-6">
          {renderSettingsContent()}
        </div>
      </div>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  settingSection: {
    marginBottom: 20,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default SettingsPage;
