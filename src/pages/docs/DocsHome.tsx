import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-dom';

const DocsHome: React.FC = () => {
  const documents = [
    { 
      title: 'Technical Specification', 
      path: '/docs/technical-specification',
      description: 'Detailed technical specifications for the SoundWave application including architecture, technology stack, and implementation details.'
    },
    { 
      title: 'Coding Rules', 
      path: '/docs/coding-rules',
      description: 'Rules and guidelines for AI and human developers working on the SoundWave project.'
    },
    { 
      title: 'Requirements Analysis', 
      path: '/docs/requirements-analysis',
      description: 'Analysis of the requirements for the SoundWave application.'
    },
    { 
      title: 'Database Schema Design', 
      path: '/docs/database-schema',
      description: 'Design of the database schema for the SoundWave application.'
    },
    { 
      title: 'Deployment Workflow', 
      path: '/docs/deployment-workflow',
      description: 'Documentation of the deployment workflow for the SoundWave application.'
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SoundWave Documentation</Text>
      <Text style={styles.subtitle}>
        Welcome to the SoundWave documentation. This section contains all the technical specifications, 
        coding rules, and other important documents for the SoundWave project.
      </Text>
      
      <View style={styles.documentsContainer}>
        {documents.map((doc, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">{doc.title}</h3>
            <p className="text-gray-600 mb-4">{doc.description}</p>
            <Link 
              to={doc.path} 
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              View Document →
            </Link>
          </div>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  documentsContainer: {
    flex: 1,
  },
});

export default DocsHome;
