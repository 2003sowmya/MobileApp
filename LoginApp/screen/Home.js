import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Welcome</Text>
      <Button
        title="Track Journey to College"
        color="#d81b60"
        onPress={() => navigation.navigate('Map')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff0f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#880e4f',
  },
});
