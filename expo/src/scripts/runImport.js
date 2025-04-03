// This is a Node.js script to run the import process
// It can be executed directly with Node.js

const { initDatabase, insertDefaultData } = require('../database/schema');
const { importSounds } = require('./importSounds');

// Run the import process
const runImport = async () => {
  try {
    console.log('Initializing database...');
    await initDatabase();
    
    console.log('Inserting default data...');
    await insertDefaultData();
    
    console.log('Starting sound import process...');
    await importSounds();
    
    console.log('Sound import completed successfully!');
  } catch (error) {
    console.error('Error during import process:', error);
  }
};

// Execute the import
runImport();
