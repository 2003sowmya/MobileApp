import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Welcome to the App</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="📍 Track Journey to College"
          color="#d81b60"
          onPress={() => navigation.navigate('Map')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="📝 Give Feedback"
          color="#6a1b9a"
          onPress={() => navigation.navigate('Feedback')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff0f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#880e4f',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 10,
  },
});
