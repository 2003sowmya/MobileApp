import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function ClockScreen({ isDarkTheme }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const secondAngle = seconds * 6;

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const formattedDate = time.toLocaleDateString('en-GB');

  const renderNumbers = () => {
    const numbers = [];
    for (let i = 1; i <= 12; i++) {
      const angle = (i * 30) * (Math.PI / 180);
      const radius = 100;
      const x = radius * Math.sin(angle);
      const y = -radius * Math.cos(angle);

      numbers.push(
        <Text
          key={i}
          style={[
            styles.number,
            {
              left: 125 + x - 10,
              top: 125 + y - 10,
              color: isDarkTheme ? '#fff' : '#222',
            },
          ]}
        >
          {i}
        </Text>
      );
    }
    return numbers;
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#121212' : '#f0f0f0' }]}>
      <Text style={[styles.title, { color: isDarkTheme ? '#fff' : '#222' }]}>Analog Clock</Text>

      <View style={[styles.clockFace, { backgroundColor: isDarkTheme ? '#1e1e1e' : '#fff' }]}>
        {renderNumbers()}

        {/* Hour Hand */}
        <View
          style={[
            styles.hand,
            styles.hourHand,
            {
              backgroundColor: isDarkTheme ? '#00FFC6' : '#222',
              transform: [{ rotate: `${hourAngle}deg` }],
            },
          ]}
        />

        {/* Minute Hand */}
        <View
          style={[
            styles.hand,
            styles.minuteHand,
            {
              backgroundColor: isDarkTheme ? '#00FFCC' : '#555',
              transform: [{ rotate: `${minuteAngle}deg` }],
            },
          ]}
        />

        {/* Second Hand */}
        <View
          style={[
            styles.hand,
            styles.secondHand,
            {
              backgroundColor: '#FF5252',
              transform: [{ rotate: `${secondAngle}deg` }],
            },
          ]}
        />

        {/* Center Dot */}
        <View
          style={[
            styles.centerDot,
            { backgroundColor: isDarkTheme ? '#00FFC6' : '#222' },
          ]}
        />
      </View>

      {/* Digital time and date */}
      <Text style={[styles.digitalText, { color: isDarkTheme ? '#fff' : '#222' }]}>{formattedTime}</Text>
      <Text style={[styles.dateText, { color: isDarkTheme ? '#aaa' : '#555' }]}>{formattedDate}</Text>
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
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  clockFace: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 5,
    borderColor: '#666',
    position: 'relative',
  },
  hand: {
    position: 'absolute',
    width: 4,
    height: 100,
    top: 25,
    left: 123,
    transformOrigin: 'bottom',
  },
  hourHand: {
    height: 50,
    width: 6,
    top: 75,
    left: 122,
    zIndex: 3,
  },
  minuteHand: {
    height: 70,
    width: 4,
    top: 55,
    left: 123,
    zIndex: 2,
  },
  secondHand: {
    height: 90,
    width: 2,
    top: 35,
    left: 124,
    zIndex: 1,
  },
  centerDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    position: 'absolute',
    left: 118,
    top: 118,
    zIndex: 10,
  },
  digitalText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  dateText: {
    fontSize: 16,
    marginTop: 4,
  },
  number: {
    position: 'absolute',
    fontSize: 16,
    fontWeight: 'bold',
    width: 20,
    height: 20,
    textAlign: 'center',
  },
});
