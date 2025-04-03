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
  getCategories, 
  addCategory, 
  updateCategory, 
  deleteCategory,
  Category
} from '../../database';
import { colors } from '../../utils/styles';

const CategoriesManagementScreen: React.FC = ({ navigation }: any) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading categories:', error);
      Alert.alert('Error', 'Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = () => {
    setCurrentCategory(null);
    setName('');
    setLanguage('en');
    setModalVisible(true);
  };

  const handleEditCategory = (category: Category) => {
    setCurrentCategory(category);
    setName(category.name);
    setLanguage(category.language);
    setModalVisible(true);
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategory(id);
      loadCategories();
      Alert.alert('Success', 'Category deleted successfully');
    } catch (error) {
      console.error('Error deleting category:', error);
      Alert.alert('Error', 'Failed to delete category');
    }
  };

  const handleSaveCategory = async () => {
    if (!name) {
      Alert.alert('Error', 'Category name is required');
      return;
    }

    try {
      if (currentCategory) {
        await updateCategory({
          ...currentCategory,
          name,
          language
        });
      } else {
        await addCategory({
          name,
          language
        });
      }
      setModalVisible(false);
      loadCategories();
      Alert.alert('Success', currentCategory ? 'Category updated successfully' : 'Category added successfully');
    } catch (error) {
      console.error('Error saving category:', error);
      Alert.alert('Error', 'Failed to save category');
    }
  };

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <View style={styles.categoryItem}>
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryLanguage}>{item.language.toUpperCase()}</Text>
      </View>
      <View style={styles.categoryActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleEditCategory(item)}
        >
          <Edit color={colors.info} size={20} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => {
            Alert.alert(
              'Confirm Delete',
              'Are you sure you want to delete this category?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: () => handleDeleteCategory(item.id || 0), style: 'destructive' }
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
        <Text style={styles.title}>{t('cms.categories.title')}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.categoriesHeader}>
          <Text style={styles.sectionTitle}>{t('cms.categories.categoriesList')}</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddCategory}
          >
            <Plus color={colors.white} size={20} />
            <Text style={styles.addButtonText}>{t('cms.categories.addCategory')}</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
            ListEmptyComponent={
              <Text style={styles.emptyText}>{t('cms.categories.noCategories')}</Text>
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
                {currentCategory ? t('cms.categories.editCategory') : t('cms.categories.addCategory')}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
              >
                <X color={colors.dark} size={24} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}>
              <Text style={styles.label}>{t('cms.categories.name')}</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder={t('cms.categories.enterName')}
              />

              <Text style={styles.label}>{t('cms.categories.language')}</Text>
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
                onPress={handleSaveCategory}
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
  categoriesHeader: {
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
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.dark,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 4,
  },
  categoryLanguage: {
    fontSize: 12,
    color: colors.info,
  },
  categoryActions: {
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

export default CategoriesManagementScreen;
