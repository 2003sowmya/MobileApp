import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // ✅ Import navigation

export default function Register() {
  const navigation = useNavigation(); // ✅ Hook to access navigation

  const [username, setUsername] = useState('');
  const [mailId, setMailId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (!username || !mailId || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all the fields');
    } else if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
    } else {
      // You can now send data to your backend API here

      Alert.alert('Success', 'Registered Successfully', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'), // ✅ Navigate to Login after register
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

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

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5', // light pink background
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF69B4', // hot pink
    textAlign: 'center',
    marginBottom: 35,
    fontFamily: 'Cochin',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#FFB6C1', // light pink border
    borderWidth: 2,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    shadowColor: '#FFB6C1',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: '#FF69B4', // hot pink
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#FF1493', // deeper pink shadow
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
});
