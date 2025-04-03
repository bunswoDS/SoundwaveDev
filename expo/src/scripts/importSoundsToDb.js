// This is a Node.js script to run the import process for sound files
// It can be executed directly with Node.js

const fs = require('fs');
const path = require('path');
const SQLite = require('sqlite3').verbose();

// Database connection
const db = new SQLite.Database('./soundwave.db');

// Map of category folder names to display names and IDs
const CATEGORY_MAP = {
  'games': { name: 'Games', id: 1 },
  'industrial': { name: 'Industrial', id: 2 },
  'media': { name: 'Music', id: 3 },
  'environment': { name: 'Environment', id: 4 }
};

// Function to clean up sound name from filename
const cleanSoundName = (filename) => {
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

// Create tables if they don't exist
const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Create Categories table
      db.run(`CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        image_normal TEXT,
        image_hover TEXT,
        image_click TEXT,
        language TEXT NOT NULL
      )`, (err) => {
        if (err) {
          console.error('Error creating categories table:', err);
          reject(err);
          return;
        }
      });

      // Create Sounds table
      db.run(`CREATE TABLE IF NOT EXISTS sounds (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        file_path TEXT NOT NULL,
        answer_text TEXT NOT NULL,
        answer_audio_path TEXT,
        category_id INTEGER NOT NULL,
        language TEXT NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories (id)
      )`, (err) => {
        if (err) {
          console.error('Error creating sounds table:', err);
          reject(err);
          return;
        }
      });

      // Create Languages table
      db.run(`CREATE TABLE IF NOT EXISTS languages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL
      )`, (err) => {
        if (err) {
          console.error('Error creating languages table:', err);
          reject(err);
          return;
        }
      });

      // Create Settings table
      db.run(`CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        max_replays INTEGER,
        language TEXT NOT NULL
      )`, (err) => {
        if (err) {
          console.error('Error creating settings table:', err);
          reject(err);
          return;
        }
        resolve();
      });
    });
  });
};

// Insert default data
const insertDefaultData = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Insert default languages
      db.run(`INSERT OR IGNORE INTO languages (code, name) VALUES (?, ?), (?, ?)`,
        ['en', 'English', 'fr', 'French'],
        (err) => {
          if (err) {
            console.error('Error inserting default languages:', err);
            reject(err);
            return;
          }
        }
      );

      // Insert default categories
      Object.values(CATEGORY_MAP).forEach(category => {
        db.run(`INSERT OR IGNORE INTO categories (name, language) 
                SELECT ?, 'en' WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = ? AND language = 'en')`,
          [category.name, category.name],
          (err) => {
            if (err) {
              console.error(`Error inserting category ${category.name}:`, err);
              reject(err);
              return;
            }
          }
        );
      });

      // Insert default settings
      db.run(`INSERT OR IGNORE INTO settings (max_replays, language) 
              SELECT 3, 'en' WHERE NOT EXISTS (SELECT 1 FROM settings)`,
        (err) => {
          if (err) {
            console.error('Error inserting default settings:', err);
            reject(err);
            return;
          }
          resolve();
        }
      );
    });
  });
};

// Add a sound to the database
const addSound = (sound) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO sounds (name, file_path, answer_text, answer_audio_path, category_id, language) VALUES (?, ?, ?, ?, ?, ?)',
      [
        sound.name,
        sound.file_path,
        sound.answer_text,
        sound.answer_audio_path || null,
        sound.category_id,
        sound.language
      ],
      function(err) {
        if (err) {
          console.error('Error adding sound:', err);
          reject(err);
          return;
        }
        resolve(this.lastID);
      }
    );
  });
};

// Process sound files in a directory
const processSoundFiles = (categoryName, basePath) => {
  return new Promise((resolve, reject) => {
    const categoryInfo = CATEGORY_MAP[categoryName];
    if (!categoryInfo) {
      console.error(`Category ${categoryName} not found in category map`);
      reject(new Error(`Category ${categoryName} not found`));
      return;
    }

    fs.readdir(basePath, { withFileTypes: true }, async (err, files) => {
      if (err) {
        console.error(`Error reading directory ${basePath}:`, err);
        reject(err);
        return;
      }

      try {
        for (const file of files) {
          const fullPath = path.join(basePath, file.name);
          
          if (file.isDirectory()) {
            // Process files in subdirectory
            const subFiles = fs.readdirSync(fullPath);
            
            for (const subFile of subFiles) {
              if (subFile.endsWith('.wav')) {
                const subFilePath = path.join(fullPath, subFile);
                const soundName = cleanSoundName(subFile);
                
                console.log(`Adding sound: ${soundName} (${subFilePath})`);
                
                await addSound({
                  name: soundName,
                  file_path: subFilePath,
                  answer_text: soundName,
                  category_id: categoryInfo.id,
                  language: 'en'
                });
              }
            }
          } else if (file.name.endsWith('.wav')) {
            // Process file in main directory
            const soundName = cleanSoundName(file.name);
            
            console.log(`Adding sound: ${soundName} (${fullPath})`);
            
            await addSound({
              name: soundName,
              file_path: fullPath,
              answer_text: soundName,
              category_id: categoryInfo.id,
              language: 'en'
            });
          }
        }
        resolve();
      } catch (error) {
        console.error(`Error processing ${categoryName} sounds:`, error);
        reject(error);
      }
    });
  });
};

// Main import function
const importSounds = async () => {
  try {
    console.log('Initializing database...');
    await initDatabase();
    
    console.log('Inserting default data...');
    await insertDefaultData();
    
    // Process each category folder
    const soundsDir = path.join(__dirname, '../../assets/sounds');
    
    for (const categoryName of Object.keys(CATEGORY_MAP)) {
      const categoryPath = path.join(soundsDir, categoryName);
      
      console.log(`Processing ${CATEGORY_MAP[categoryName].name} sounds...`);
      await processSoundFiles(categoryName, categoryPath);
    }
    
    console.log('Sound import completed successfully!');
  } catch (error) {
    console.error('Error importing sounds:', error);
    throw error;
  } finally {
    // Close the database connection
    db.close();
  }
};

// Run the import
importSounds()
  .then(() => {
    console.log('Import process completed.');
    process.exit(0);
  })
  .catch(error => {
    console.error('Import process failed:', error);
    process.exit(1);
  });
