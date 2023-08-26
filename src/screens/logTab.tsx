import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'; // Added ScrollView
import { useLog } from '../../src/LogContext';

function LogTab() {
  const { messages, addLogMessage } = useLog();
  const [currentTypingMessage, setCurrentTypingMessage] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isCursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (currentTypingMessage) {
      const typingInterval = setInterval(() => {
        setCharIndex(prev => prev + 1);
        if (charIndex >= currentTypingMessage.length) {
          addLogMessage(currentTypingMessage); // Updated to use addLogMessage
          setCurrentTypingMessage('');
          setCharIndex(0);
          clearInterval(typingInterval);
        }
      }, 100);

      return () => {
        clearInterval(typingInterval);
      };
    }
  }, [charIndex, currentTypingMessage]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollContainer, { flexGrow: 1 }]}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          {messages.map((message, index) => (
            <Text key={index} style={styles.text}>{message}</Text>
          ))}

          <Text style={styles.text}>
            {currentTypingMessage.substring(0, charIndex)}
            {isCursorVisible ? <Text style={styles.cursor}>|</Text> : <Text style={styles.cursor}> </Text>}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#000000',
    padding: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginBottom: 0,
  },
  scrollContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'monospace', // Using a monospace font
  },
  cursor: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  }
});

export default LogTab;
export { styles };
