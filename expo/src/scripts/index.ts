import { importSounds } from './importSounds';

// Export all scripts
export {
  importSounds
};

// Run import sounds script if executed directly
// Note: This is for Node.js environments, not React Native
export const runImport = () => {
  console.log('Starting sound import process...');
  importSounds()
    .then(() => {
      console.log('Sound import completed successfully!');
    })
    .catch(error => {
      console.error('Error during sound import:', error);
    });
};
