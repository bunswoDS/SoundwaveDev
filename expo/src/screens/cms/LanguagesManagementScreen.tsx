import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  TextInput,
  Modal,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { 
  Plus, 
  Edit, 
  Trash, 
  Save,
  X,
  ArrowLeft
} from 'lucide-react-native';

import { 
  getLanguages, 
  addLanguage, 
  updateLanguage, 
  deleteLanguage,
  Language
} from '../../database';
import { colors } from '../../utils/styles';

const LanguagesManagementScreen: React.FC = ({ navigation }: any) => {
  const { t } = useTranslation();
  const [languages, setLanguages] = useState<Language[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language | null>(null);

  // Form state
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    loadLanguages();
  }, []);

  const loadLanguages = async () => {
    try {
      setIsLoading(true);
      const languagesData = await getLanguages();
      setLanguages(languagesData);
    } catch (error) {
      console.error('Error loading languages:', error);
      Alert.alert('Error', 'Failed to load languages');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddLanguage = () => {
    setCurrentLanguage(null);
    setCode('');
    setName('');
    setModalVisible(true);
  };

  const handleEditLanguage = (language: Language) => {
    setCurrentLanguage(language);
    setCode(language.code);
    setName(language.name);
    setModalVisible(true);
  };

  const handleDeleteLanguage = async (id: number) => {
    try {
      await deleteLanguage(id);
      loadLanguages();
      Alert.alert('Success', 'Language deleted successfully');
    } catch (error) {
      console.error('Error deleting language:', error);
      Alert.alert('Error', 'Failed to delete language');
    }
  };

  const handleSaveLanguage = async () => {
    if (!code || !name) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      if (currentLanguage) {
        await updateLanguage({
          ...currentLanguage,
          code,
          name
        });
      } else {
        await addLanguage({
          code,
          name
        });
      }
      setModalVisible(false);
      loadLanguages();
      Alert.alert('Success', currentLanguage ? 'Language updated successfully' : 'Language added successfully');
    } catch (error) {
      console.error('Error saving language:', error);
      Alert.alert('Error', 'Failed to save language');
    }
  };

  const renderLanguageItem = ({ item }: { item: Language }) => (
    <View style={styles.languageItem}>
      <View style={styles.languageInfo}>
        <Text style={styles.languageName}>{item.name}</Text>
        <Text style={styles.languageCode}>{item.code.toUpperCase()}</Text>
      </View>
      <View style={styles.languageActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleEditLanguage(item)}
        >
          <Edit color={colors.info} size={20} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => {
            Alert.alert(
              'Confirm Delete',
              'Are you sure you want to delete this language?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: () => handleDeleteLanguage(item.id || 0), style: 'destructive' }
              ]
            );
          }}
        >
          <Trash color={colors.danger} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft color={colors.white} size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('cms.languages.title')}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.languagesHeader}>
          <Text style={styles.sectionTitle}>{t('cms.languages.languagesList')}</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddLanguage}
          >
            <Plus color={colors.white} size={20} />
            <Text style={styles.addButtonText}>{t('cms.languages.addLanguage')}</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <FlatList
            data={languages}
            renderItem={renderLanguageItem}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
            ListEmptyComponent={
              <Text style={styles.emptyText}>{t('cms.languages.noLanguages')}</Text>
            }
          />
        )}
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {currentLanguage ? t('cms.languages.editLanguage') : t('cms.languages.addLanguage')}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
              >
                <X color={colors.dark} size={24} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}>
              <Text style={styles.label}>{t('cms.languages.code')}</Text>
              <TextInput
                style={styles.input}
                value={code}
                onChangeText={setCode}
                placeholder={t('cms.languages.enterCode')}
                maxLength={2}
              />

              <Text style={styles.label}>{t('cms.languages.name')}</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder={t('cms.languages.enterName')}
              />
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>{t('common.cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSaveLanguage}
              >
                <Save color={colors.white} size={20} />
                <Text style={styles.buttonText}>{t('common.save')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.dark,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  languagesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: colors.white,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.dark,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 4,
  },
  languageCode: {
    fontSize: 12,
    color: colors.info,
  },
  languageActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.white,
    marginTop: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: colors.white,
    borderRadius: 8,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.light,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark,
  },
  formContainer: {
    padding: 16,
    maxHeight: 400,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.light,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: colors.dark,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: colors.light,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontWeight: 'bold',
    marginLeft: 8,
    color: colors.dark,
  },
});

export default LanguagesManagementScreen;
