import * as FileSystem from 'expo-file-system';
import { initDatabase, addCategory, addSound, getCategories, Category } from '../database';

// Map of category folder names to display names
const CATEGORY_MAP: Record<string, string> = {
  'games': 'Games',
  'industrial': 'Industrial',
  'media': 'Music',
  'environment': 'Environment'
};

// Function to clean up sound name from filename
const cleanSoundName = (filename: string): string => {
  // Remove file extension
  let name = filename.replace(/\.wav$/, '');
  
  // Remove leading numbers and spaces (e.g., "00 " or "A ")
  name = name.replace(/^(\d+\s+|\w\s+)/, '');
  
  // Replace underscores with spaces
  name = name.replace(/_/g, ' ');
  
  // Capitalize first letter of each word
  name = name.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  return name;
};

// Main import function
export const importSounds = async (): Promise<void> => {
  try {
    console.log('Initializing database...');
    await initDatabase();
    
    console.log('Getting categories...');
    const existingCategories = await getCategories();
    
    // Create category map for lookup
    const categoryMap = new Map<string, number>();
    for (const category of existingCategories) {
      if (category.id) {
        categoryMap.set(category.name.toLowerCase(), category.id);
      }
    }
    
    // Create categories if they don't exist
    for (const [folderName, displayName] of Object.entries(CATEGORY_MAP)) {
      if (!categoryMap.has(displayName.toLowerCase())) {
        console.log(`Creating category: ${displayName}`);
        const categoryId = await addCategory({
          name: displayName,
          language: 'en'
        });
        categoryMap.set(displayName.toLowerCase(), categoryId);
      }
    }
    
    // Process each category folder
    for (const [folderName, displayName] of Object.entries(CATEGORY_MAP)) {
      const categoryId = categoryMap.get(displayName.toLowerCase());
      
      if (!categoryId) {
        console.error(`Category ID not found for ${displayName}`);
        continue;
      }
      
      console.log(`Processing ${displayName} sounds...`);
      
      // Get base path for this category
      const basePath = `${FileSystem.documentDirectory}assets/sounds/${folderName}`;
      
      try {
        // List all files in the category directory and subdirectories
        const files = await FileSystem.readDirectoryAsync(basePath);
        
        for (const file of files) {
          // Check if it's a directory (like "App Games")
          const filePath = `${basePath}/${file}`;
          const fileInfo = await FileSystem.getInfoAsync(filePath);
          
          if (fileInfo.isDirectory) {
            // Process files in subdirectory
            const subFiles = await FileSystem.readDirectoryAsync(filePath);
            
            for (const subFile of subFiles) {
              if (subFile.endsWith('.wav')) {
                const fullPath = `${filePath}/${subFile}`;
                const soundName = cleanSoundName(subFile);
                
                console.log(`Adding sound: ${soundName}`);
                
                await addSound({
                  name: soundName,
                  file_path: fullPath,
                  answer_text: soundName,
                  category_id: categoryId,
                  language: 'en'
                });
              }
            }
          } else if (file.endsWith('.wav')) {
            // Process file in main directory
            const soundName = cleanSoundName(file);
            
            console.log(`Adding sound: ${soundName}`);
            
            await addSound({
              name: soundName,
              file_path: filePath,
              answer_text: soundName,
              category_id: categoryId,
              language: 'en'
            });
          }
        }
      } catch (error) {
        console.error(`Error processing ${displayName} sounds:`, error);
      }
    }
    
    console.log('Sound import completed successfully!');
  } catch (error) {
    console.error('Error importing sounds:', error);
    throw error;
  }
};
