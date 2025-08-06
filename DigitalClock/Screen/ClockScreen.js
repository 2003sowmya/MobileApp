import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ClockScreen({ isDarkTheme }) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;

      const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
      setCurrentTime(formattedTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (num) => (num < 10 ? '0' + num : num);

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#121212' : '#f0f0f0' }]}>
      <Text style={[styles.title, { color: isDarkTheme ? '#fff' : '#222' }]}>Live Clock</Text>
      <View style={[styles.clockCircle, { backgroundColor: isDarkTheme ? '#1e1e1e' : '#ffffff', borderColor: isDarkTheme ? '#00FFC6' : '#222' }]}>
        <Text style={[styles.clockText, { color: isDarkTheme ? '#00FFCC' : '#1A1A40' }]}>{currentTime}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  clockCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  clockText: {
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
