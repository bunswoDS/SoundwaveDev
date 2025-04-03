import { getDatabase } from './schema';
import { Category, Sound, Language, Settings } from './models';

// Category operations
export const getCategories = (language: string = 'en'): Promise<Category[]> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM categories WHERE language = ? ORDER BY name',
        [language],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          console.error('Error fetching categories:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

export const addCategory = (category: Category): Promise<number> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO categories (name, image_normal, image_hover, image_click, language) VALUES (?, ?, ?, ?, ?)',
        [
          category.name,
          category.image_normal || null,
          category.image_hover || null,
          category.image_click || null,
          category.language
        ],
        (_, { insertId }) => {
          resolve(Number(insertId));
        },
        (_, error) => {
          console.error('Error adding category:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

export const updateCategory = (category: Category): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!category.id) {
      reject(new Error('Category ID is required for update'));
      return;
    }

    const db = getDatabase();
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE categories SET name = ?, image_normal = ?, image_hover = ?, image_click = ?, language = ? WHERE id = ?',
        [
          category.name,
          category.image_normal || null,
          category.image_hover || null,
          category.image_click || null,
          category.language,
          Number(category.id)
        ],
        () => {
          resolve();
        },
        (_, error) => {
          console.error('Error updating category:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

export const deleteCategory = (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM categories WHERE id = ?',
        [id],
        () => {
          resolve();
        },
        (_, error) => {
          console.error('Error deleting category:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

// Sound operations
export const getSounds = (categoryId?: number, language: string = 'en'): Promise<Sound[]> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction(tx => {
      const query = categoryId 
        ? 'SELECT * FROM sounds WHERE category_id = ? AND language = ? ORDER BY name'
        : 'SELECT * FROM sounds WHERE language = ? ORDER BY name';
      
      const params = categoryId ? [categoryId, language] : [language];
      
      tx.executeSql(
        query,
        params,
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          console.error('Error fetching sounds:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

export const addSound = (sound: Sound): Promise<number> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO sounds (name, file_path, answer_text, answer_audio_path, category_id, language) VALUES (?, ?, ?, ?, ?, ?)',
        [
          sound.name,
          sound.file_path,
          sound.answer_text,
          sound.answer_audio_path || null,
          sound.category_id,
          sound.language
        ],
        (_, { insertId }) => {
          resolve(Number(insertId));
        },
        (_, error) => {
          console.error('Error adding sound:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

export const updateSound = (sound: Sound): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!sound.id) {
      reject(new Error('Sound ID is required for update'));
      return;
    }

    const db = getDatabase();
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE sounds SET name = ?, file_path = ?, answer_text = ?, answer_audio_path = ?, category_id = ?, language = ? WHERE id = ?',
        [
          sound.name,
          sound.file_path,
          sound.answer_text,
          sound.answer_audio_path || null,
          sound.category_id,
          sound.language,
          Number(sound.id)
        ],
        () => {
          resolve();
        },
        (_, error) => {
          console.error('Error updating sound:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

export const deleteSound = (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM sounds WHERE id = ?',
        [id],
        () => {
          resolve();
        },
        (_, error) => {
          console.error('Error deleting sound:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

// Language operations
export const getLanguages = (): Promise<Language[]> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM languages ORDER BY name',
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          console.error('Error fetching languages:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

export const addLanguage = (language: Language): Promise<number> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO languages (code, name) VALUES (?, ?)',
        [language.code, language.name],
        (_, { insertId }) => {
          resolve(Number(insertId));
        },
        (_, error) => {
          console.error('Error adding language:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

export const updateLanguage = (language: Language): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!language.id) {
      reject(new Error('Language ID is required for update'));
      return;
    }

    const db = getDatabase();
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE languages SET code = ?, name = ? WHERE id = ?',
        [language.code, language.name, Number(language.id)],
        () => {
          resolve();
        },
        (_, error) => {
          console.error('Error updating language:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

export const deleteLanguage = (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM languages WHERE id = ?',
        [id],
        () => {
          resolve();
        },
        (_, error) => {
          console.error('Error deleting language:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

// Settings operations
export const getSettings = (): Promise<Settings> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM settings LIMIT 1',
        [],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(rows.item(0));
          } else {
            // Return default settings if none exist
            resolve({
              max_replays: 3,
              language: 'en'
            });
          }
        },
        (_, error) => {
          console.error('Error fetching settings:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

export const updateSettings = (settings: Settings): Promise<void> => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE settings SET max_replays = ?, language = ? WHERE id = 1',
        [settings.max_replays, settings.language],
        () => {
          resolve();
        },
        (_, error) => {
          console.error('Error updating settings:', error);
          reject(error);
          return false;
        }
      );
    });
  });
};
