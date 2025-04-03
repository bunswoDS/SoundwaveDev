import * as SQLite from 'expo-sqlite';

// Database connection
export const getDatabase = () => {
  return SQLite.openDatabase('soundwave.db');
};

// Initialize database tables
export const initDatabase = () => {
  const db = getDatabase();
  
  return new Promise<void>((resolve, reject) => {
    db.transaction(tx => {
      // Create Categories table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          image_normal TEXT,
          image_hover TEXT,
          image_click TEXT,
          language TEXT NOT NULL
        );`,
        [],
        () => {},
        (_, error) => {
          console.error('Error creating categories table:', error);
          reject(error);
          return false;
        }
      );

      // Create Sounds table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS sounds (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          file_path TEXT NOT NULL,
          answer_text TEXT NOT NULL,
          answer_audio_path TEXT,
          category_id INTEGER NOT NULL,
          language TEXT NOT NULL,
          FOREIGN KEY (category_id) REFERENCES categories (id)
        );`,
        [],
        () => {},
        (_, error) => {
          console.error('Error creating sounds table:', error);
          reject(error);
          return false;
        }
      );

      // Create Languages table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS languages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          code TEXT NOT NULL UNIQUE,
          name TEXT NOT NULL
        );`,
        [],
        () => {},
        (_, error) => {
          console.error('Error creating languages table:', error);
          reject(error);
          return false;
        }
      );

      // Create Settings table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS settings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          max_replays INTEGER,
          language TEXT NOT NULL
        );`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          console.error('Error creating settings table:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

// Insert default data
export const insertDefaultData = () => {
  const db = getDatabase();
  
  return new Promise<void>((resolve, reject) => {
    db.transaction(tx => {
      // Insert default languages
      tx.executeSql(
        `INSERT OR IGNORE INTO languages (code, name) VALUES (?, ?), (?, ?);`,
        ['en', 'English', 'fr', 'French'],
        () => {},
        (_, error) => {
          console.error('Error inserting default languages:', error);
          reject(error);
          return false;
        }
      );

      // Insert default categories
      tx.executeSql(
        `INSERT OR IGNORE INTO categories (name, language) 
         SELECT 'Games', 'en' WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Games' AND language = 'en');`,
        [],
        () => {},
        (_, error) => {
          console.error('Error inserting default categories:', error);
          reject(error);
          return false;
        }
      );
      
      tx.executeSql(
        `INSERT OR IGNORE INTO categories (name, language) 
         SELECT 'Animals', 'en' WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Animals' AND language = 'en');`,
        [],
        () => {},
        (_, error) => {
          console.error('Error inserting default categories:', error);
          reject(error);
          return false;
        }
      );
      
      tx.executeSql(
        `INSERT OR IGNORE INTO categories (name, language) 
         SELECT 'Industrial', 'en' WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Industrial' AND language = 'en');`,
        [],
        () => {},
        (_, error) => {
          console.error('Error inserting default categories:', error);
          reject(error);
          return false;
        }
      );
      
      tx.executeSql(
        `INSERT OR IGNORE INTO categories (name, language) 
         SELECT 'Environment', 'en' WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Environment' AND language = 'en');`,
        [],
        () => {},
        (_, error) => {
          console.error('Error inserting default categories:', error);
          reject(error);
          return false;
        }
      );
      
      tx.executeSql(
        `INSERT OR IGNORE INTO categories (name, language) 
         SELECT 'Home & Office', 'en' WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Home & Office' AND language = 'en');`,
        [],
        () => {},
        (_, error) => {
          console.error('Error inserting default categories:', error);
          reject(error);
          return false;
        }
      );
      
      tx.executeSql(
        `INSERT OR IGNORE INTO categories (name, language) 
         SELECT 'Music', 'en' WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Music' AND language = 'en');`,
        [],
        () => {},
        (_, error) => {
          console.error('Error inserting default categories:', error);
          reject(error);
          return false;
        }
      );

      // Insert default settings
      tx.executeSql(
        `INSERT OR IGNORE INTO settings (max_replays, language) 
         SELECT 3, 'en' WHERE NOT EXISTS (SELECT 1 FROM settings);`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          console.error('Error inserting default settings:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};
