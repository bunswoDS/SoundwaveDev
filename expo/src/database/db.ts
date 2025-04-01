import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

const DATABASE_NAME = 'soundwave.db';

// Ensure database directory exists
const setupDatabase = async () => {
  const dbDirectory = `${FileSystem.documentDirectory}SQLite`;
  
  // Check if directory exists, create if not
  const dirInfo = await FileSystem.getInfoAsync(dbDirectory);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dbDirectory, { intermediates: true });
  }
  
  // Initialize database
  const db = SQLite.openDatabaseSync(DATABASE_NAME);
  
  // Create tables if they don't exist
  // Categories table
  db.execAsync(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    color TEXT NOT NULL,
    language TEXT NOT NULL
  )`);
  
  // Sounds table
  db.execAsync(`CREATE TABLE IF NOT EXISTS sounds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    answer TEXT NOT NULL,
    answer_audio_path TEXT,
    category_id INTEGER,
    language TEXT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories (id)
  )`);
  
  // Languages table
  db.execAsync(`CREATE TABLE IF NOT EXISTS languages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT 1
  )`);
  
  return db;
};

let _db: SQLite.SQLiteDatabase | null = null;

export const getDatabase = async () => {
  if (!_db) {
    _db = await setupDatabase();
  }
  return _db;
};

export default { 
  getDatabase
};
