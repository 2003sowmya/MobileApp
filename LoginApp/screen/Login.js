import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 🔹 Import navigation hook

export default function Login() {
  const navigation = useNavigation(); // 🔹 Get navigation object

  const [mailId, setMailId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
  if (!mailId || !password) {
    Alert.alert('Error', 'Please enter both email and password');
  } else {
    Alert.alert('Success', 'Logged in successfully');
    navigation.navigate('Home'); // ✅ navigate to Home screen
  }
};


  const handleRegister = () => {
    navigation.navigate('Register'); // 🔹 Navigate to Register screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Mail ID"
        value={mailId}
        onChangeText={setMailId}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4f2', // light pink background
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#d63384', // dark pink
    textAlign: 'center',
    marginBottom: 35,
    fontFamily: 'Cochin',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#f8c1d9', // soft pink border
    borderWidth: 2,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    shadowColor: '#f4a1c8',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: '#ff69b4', // hot pink
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#ff1493',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  link: {
    marginTop: 20,
    color: '#c71585', // medium violet red
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
  },
});
