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
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { 
  Plus, 
  Edit, 
  Trash, 
  Play, 
  Save,
  X,
  ArrowLeft
} from 'lucide-react-native';

import { 
  getCategories, 
  getSounds, 
  addSound, 
  updateSound, 
  deleteSound,
  Sound,
  Category
} from '../../database';
import { colors } from '../../utils/styles';

const SoundsManagementScreen: React.FC = ({ navigation }: any) => {
  const { t } = useTranslation();
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSound, setCurrentSound] = useState<Sound | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [filePath, setFilePath] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    loadData();
    return () => {
      // Unload sound when component unmounts
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const categoriesData = await getCategories();
      setCategories(categoriesData);
      
      if (categoriesData.length > 0 && !selectedCategory) {
        setSelectedCategory(categoriesData[0].id || null);
        const soundsData = await getSounds(categoriesData[0].id);
        setSounds(soundsData);
      } else if (selectedCategory) {
        const soundsData = await getSounds(selectedCategory);
        setSounds(soundsData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      Alert.alert('Error', 'Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = async (categoryId: number) => {
    setSelectedCategory(categoryId);
    try {
      setIsLoading(true);
      const soundsData = await getSounds(categoryId);
      setSounds(soundsData);
    } catch (error) {
      console.error('Error loading sounds:', error);
      Alert.alert('Error', 'Failed to load sounds');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSound = () => {
    setCurrentSound(null);
    setName('');
    setFilePath('');
    setAnswerText('');
    setCategoryId(selectedCategory);
    setLanguage('en');
    setModalVisible(true);
  };

  const handleEditSound = (sound: Sound) => {
    setCurrentSound(sound);
    setName(sound.name);
    setFilePath(sound.file_path);
    setAnswerText(sound.answer_text);
    setCategoryId(sound.category_id);
    setLanguage(sound.language);
    setModalVisible(true);
  };

  const handleDeleteSound = async (id: number) => {
    try {
      await deleteSound(id);
      loadData();
      Alert.alert('Success', 'Sound deleted successfully');
    } catch (error) {
      console.error('Error deleting sound:', error);
      Alert.alert('Error', 'Failed to delete sound');
    }
  };

  const handleSaveSound = async () => {
    if (!name || !filePath || !answerText || !categoryId) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      if (currentSound) {
        await updateSound({
          ...currentSound,
          name,
          file_path: filePath,
          answer_text: answerText,
          category_id: categoryId,
          language
        });
      } else {
        await addSound({
          name,
          file_path: filePath,
          answer_text: answerText,
          category_id: categoryId,
          language
        });
      }
      setModalVisible(false);
      loadData();
      Alert.alert('Success', currentSound ? 'Sound updated successfully' : 'Sound added successfully');
    } catch (error) {
      console.error('Error saving sound:', error);
      Alert.alert('Error', 'Failed to save sound');
    }
  };

  const playSound = async (path: string) => {
    try {
      // Stop any currently playing sound
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
      }

      // Create and play the new sound
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: path },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);

      // Listen for playback status updates
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && !status.isPlaying && status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.error('Error playing sound:', error);
      Alert.alert('Error', 'Failed to play sound');
    }
  };

  const renderSoundItem = ({ item }: { item: Sound }) => (
    <View style={styles.soundItem}>
      <View style={styles.soundInfo}>
        <Text style={styles.soundName}>{item.name}</Text>
        <Text style={styles.soundPath}>{item.file_path}</Text>
      </View>
      <View style={styles.soundActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => playSound(item.file_path)}
        >
          <Play color={colors.primary} size={20} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleEditSound(item)}
        >
          <Edit color={colors.info} size={20} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => {
            Alert.alert(
              'Confirm Delete',
              'Are you sure you want to delete this sound?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: () => handleDeleteSound(item.id || 0), style: 'destructive' }
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
        <Text style={styles.title}>{t('cms.sounds.title')}</Text>
      </View>

      <View style={styles.categorySelector}>
        <Text style={styles.sectionTitle}>{t('cms.sounds.selectCategory')}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.selectedCategoryButton
              ]}
              onPress={() => handleCategoryChange(category.id || 0)}
            >
              <Text 
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category.id && styles.selectedCategoryButtonText
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.content}>
        <View style={styles.soundsHeader}>
          <Text style={styles.sectionTitle}>{t('cms.sounds.soundsList')}</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddSound}
          >
            <Plus color={colors.white} size={20} />
            <Text style={styles.addButtonText}>{t('cms.sounds.addSound')}</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <FlatList
            data={sounds}
            renderItem={renderSoundItem}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
            ListEmptyComponent={
              <Text style={styles.emptyText}>{t('cms.sounds.noSounds')}</Text>
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
                {currentSound ? t('cms.sounds.editSound') : t('cms.sounds.addSound')}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
              >
                <X color={colors.dark} size={24} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}>
              <Text style={styles.label}>{t('cms.sounds.name')}</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder={t('cms.sounds.enterName')}
              />

              <Text style={styles.label}>{t('cms.sounds.filePath')}</Text>
              <TextInput
                style={styles.input}
                value={filePath}
                onChangeText={setFilePath}
                placeholder={t('cms.sounds.enterFilePath')}
              />

              <Text style={styles.label}>{t('cms.sounds.answerText')}</Text>
              <TextInput
                style={styles.input}
                value={answerText}
                onChangeText={setAnswerText}
                placeholder={t('cms.sounds.enterAnswerText')}
              />

              <Text style={styles.label}>{t('cms.sounds.category')}</Text>
              <View style={styles.pickerContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category.id}
                      style={[
                        styles.categoryButton,
                        categoryId === category.id && styles.selectedCategoryButton
                      ]}
                      onPress={() => setCategoryId(category.id || null)}
                    >
                      <Text 
                        style={[
                          styles.categoryButtonText,
                          categoryId === category.id && styles.selectedCategoryButtonText
                        ]}
                      >
                        {category.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <Text style={styles.label}>{t('cms.sounds.language')}</Text>
              <View style={styles.pickerContainer}>
                <TouchableOpacity
                  style={[
                    styles.languageButton,
                    language === 'en' && styles.selectedLanguageButton
                  ]}
                  onPress={() => setLanguage('en')}
                >
                  <Text 
                    style={[
                      styles.languageButtonText,
                      language === 'en' && styles.selectedLanguageButtonText
                    ]}
                  >
                    English
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.languageButton,
                    language === 'fr' && styles.selectedLanguageButton
                  ]}
                  onPress={() => setLanguage('fr')}
                >
                  <Text 
                    style={[
                      styles.languageButtonText,
                      language === 'fr' && styles.selectedLanguageButtonText
                    ]}
                  >
                    French
                  </Text>
                </TouchableOpacity>
              </View>
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
                onPress={handleSaveSound}
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
  categorySelector: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  soundsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.dark,
    borderRadius: 8,
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: colors.primary,
  },
  categoryButtonText: {
    color: colors.white,
  },
  selectedCategoryButtonText: {
    fontWeight: 'bold',
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
  soundItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.dark,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  soundInfo: {
    flex: 1,
  },
  soundName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 4,
  },
  soundPath: {
    fontSize: 12,
    color: colors.info,
  },
  soundActions: {
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
  pickerContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  languageButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  selectedLanguageButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  languageButtonText: {
    color: colors.dark,
    fontWeight: 'bold',
  },
  selectedLanguageButtonText: {
    color: colors.white,
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

export default SoundsManagementScreen;
