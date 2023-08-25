import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, Button, TextInput } from 'react-native';

const screenHeight = Dimensions.get('window').height;

function LogTab() {
  const [logs, setLogs] = useState([
    "Mission Command Log",
  ]);

  const [userInput, setUserInput] = useState('');

  const addNewLog = () => {
    if (userInput.trim()) {
      setLogs(prevLogs => [...prevLogs, userInput]);
      setUserInput('');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.logContainer}>
        {logs.map((log, index) => (
          <Text key={index} style={styles.logMessage}>{log}</Text>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        value={userInput}
        onChangeText={setUserInput}
        placeholder="Write your log here..."
        placeholderTextColor="gray"
      />
      <Button title="Add to Log" onPress={addNewLog} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black'
  },
  logContainer: {
    maxHeight: screenHeight / 3,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'black'
  },
  logMessage: {
    marginBottom: 5,
    color: 'white'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white',
    backgroundColor: 'black'
  }
});

export default LogTab;
