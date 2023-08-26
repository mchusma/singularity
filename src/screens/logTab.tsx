import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLog } from '../../src/LogContext';

function LogTab() {
  const { messages, addLogMessage } = useLog();
  const [currentTypingMessage, setCurrentTypingMessage] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isCursorVisible, setCursorVisible] = useState(true);
  const scrollViewRef = useRef(null);

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
          addLogMessage(currentTypingMessage);
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
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flexGrow: 1 }} />  {/* Spacer */}
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
    backgroundColor: '#000000',
    padding: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'monospace',
  },
  cursor: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  }
});

export default LogTab;
export { styles };
