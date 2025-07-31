import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ThankYouScreen({ route, navigation }) {
  const { name } = route.params || { name: 'User' }; // Fallback if name is missing

  return (
    <View style={styles.container}>
      <Text style={styles.text}>🎉 Thank you, {name}, for your feedback!</Text>
      <Button
        title="Back to Home"
        color="#6a1b9a"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  text: {
    fontSize: 22,
    color: '#2e7d32',
    marginBottom: 20,
    textAlign: 'center',
  },
});
