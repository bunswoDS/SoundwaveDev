import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import './App.css'

function App() {
  const [message, setMessage] = useState('Welcome to SoundWave')

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SoundWave</Text>
        <Text style={styles.subtitle}>A Sound-Based Game</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.message}>{message}</Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setMessage('React Native Web is working!')}
        >
          <Text style={styles.buttonText}>Test React Native Web</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          SoundWave Prototype - React Native Web
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  message: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 40,
    marginBottom: 20,
  },
  footerText: {
    color: '#999',
    fontSize: 14,
  }
})

export default App
