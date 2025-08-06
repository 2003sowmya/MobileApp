import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

export default function SettingsScreen({ isDarkTheme, toggleTheme }) {
  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#121212' : '#ffffff' }]}>
      <Text style={[styles.label, { color: isDarkTheme ? '#ffffff' : '#333333' }]}>Enable Dark Theme</Text>
      <Switch
        value={isDarkTheme}
        onValueChange={toggleTheme}
        thumbColor={isDarkTheme ? '#00ffcc' : '#f4f3f4'}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 15,
  },
});
