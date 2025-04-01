# Troubleshooting Guide for SoundWave Expo App

## Connection Issues with Expo Go

If you're experiencing timeout issues when connecting to the Expo development server:

1. **Use Tunnel Mode**
   Always start the development server with tunnel mode:
   ```
   npx expo start --tunnel
   ```

2. **Update Expo Go**
   Make sure your Expo Go app is up-to-date on your device.

3. **Network Configuration**
   - Ensure your device has a stable internet connection
   - Disable VPNs or proxies that might interfere with the connection
   - Try connecting both devices to the same WiFi network

4. **Clear Expo Go Cache**
   - On Android: Go to Settings > Apps > Expo Go > Storage > Clear Cache
   - On iOS: Uninstall and reinstall the Expo Go app

5. **Try Development Build**
   If you continue experiencing issues with Expo Go, create a development build:
   ```
   npx expo prebuild
   npx expo run:android  # or run:ios
   ```

6. **Debugging Mode**
   Press 'j' in the Expo CLI to open the debugger, which can provide more information about connection issues.

7. **Contact Support**
   If you're still having issues, please file an issue on our GitHub repository with:
   - Your device model and OS version
   - Expo CLI version
   - Error messages or screenshots

## Common Error Messages and Solutions

### "Unable to resolve module..."
This usually indicates a missing dependency. Try:
```
npm install
```

### "Unable to connect to development server"
1. Check that your development server is running
2. Ensure your device and computer are on the same network
3. Try using tunnel mode: `npx expo start --tunnel`

### "Timeout while loading bundle"
1. Check your internet connection
2. Try clearing the Metro bundler cache: `npx expo start --clear`
3. Restart the Expo Go app on your device

## Alternative Connection Methods

If tunnel mode doesn't work, try these alternatives:

1. **LAN Mode** (devices must be on same network)
   ```
   npx expo start --lan
   ```

2. **Local-only Mode** (primarily for emulators)
   ```
   npx expo start --localhost
   ```

## Optimizing Performance

If the app is loading slowly:

1. **Clear Metro Bundler Cache**
   ```
   npx expo start --clear
   ```

2. **Reduce Image Sizes**
   Optimize images to reduce bundle size

3. **Use Production Mode**
   ```
   npx expo start --no-dev --minify
   ```

## Updating Dependencies

If you encounter compatibility issues:
```
npx expo install --fix
```

This will update your dependencies to versions that are compatible with your Expo SDK version.
