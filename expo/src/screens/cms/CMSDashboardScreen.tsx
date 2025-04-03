import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { 
  Settings, 
  Music, 
  Layers, 
  Globe,
  ArrowLeft
} from 'lucide-react-native';

import { colors } from '../../utils/styles';

const CMSDashboardScreen: React.FC = ({ navigation }: any) => {
  const { t } = useTranslation();

  const menuItems = [
    {
      id: 'sounds',
      title: t('cms.dashboard.sounds'),
      icon: <Music color={colors.white} size={24} />,
      onPress: () => navigation.navigate('SoundsManagement')
    },
    {
      id: 'categories',
      title: t('cms.dashboard.categories'),
      icon: <Layers color={colors.white} size={24} />,
      onPress: () => navigation.navigate('CategoriesManagement')
    },
    {
      id: 'languages',
      title: t('cms.dashboard.languages'),
      icon: <Globe color={colors.white} size={24} />,
      onPress: () => navigation.navigate('LanguagesManagement')
    },
    {
      id: 'settings',
      title: t('cms.dashboard.settings'),
      icon: <Settings color={colors.white} size={24} />,
      onPress: () => navigation.navigate('Settings')
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft color={colors.white} size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('cms.dashboard.title')}</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.subtitle}>{t('cms.dashboard.subtitle')}</Text>
        
        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.iconContainer}>
                {item.icon}
              </View>
              <Text style={styles.menuItemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
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
  subtitle: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 24,
    textAlign: 'center',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '48%',
    backgroundColor: colors.dark,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
});

export default CMSDashboardScreen;
