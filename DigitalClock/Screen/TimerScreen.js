import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';

export default function TimerScreen({ isDarkTheme }) {
  const [inputMinutes, setInputMinutes] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      Alert.alert("⏰ Time's up!", "Your countdown has finished.");
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    const minutes = parseInt(inputMinutes);
    if (isNaN(minutes) || minutes <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid number of minutes.');
      return;
    }
    setTimeLeft(hours * 60 * 60);
    setIsRunning(true);
    setInputMinutes('');
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTimeLeft(0);
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#121212' : '#f8f8f8' }]}>
      <Text style={[styles.title, { color: isDarkTheme ? '#fff' : '#000' }]}>Set Countdown (minutes)</Text>

      <TextInput
        style={[styles.input, { backgroundColor: isDarkTheme ? '#333' : '#fff', color: isDarkTheme ? '#fff' : '#000' }]}
        keyboardType="numeric"
        placeholder="Enter minutes"
        placeholderTextColor={isDarkTheme ? '#aaa' : '#888'}
        value={inputMinutes}
        onChangeText={setInputMinutes}
      />

      <Text style={[styles.timerText, { color: isDarkTheme ? '#00FFCC' : '#1A1A40' }]}>
        {formatTime(timeLeft)}
      </Text>

      <View style={styles.buttonRow}>
        <Button title={isRunning ? 'Pause' : 'Start'} onPress={() => {
          if (isRunning) {
            setIsRunning(false);
          } else if (timeLeft > 0) {
            setIsRunning(true);
          } else {
            startTimer();
          }
        }} />
        <Button title="Reset" color="crimson" onPress={resetTimer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: '600',
  },
  input: {
    width: 150,
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 18,
    marginBottom: 20,
    borderColor: '#999',
    textAlign: 'center',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
  },
});
