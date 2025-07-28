import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
  const navigation = useNavigation();

  const [userName, setUserName] = useState('');
  const [mailId, setMailId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    const trimmedUserName = userName.trim();
    const trimmedMailId = mailId.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (!trimmedUserName || !trimmedMailId || !trimmedPassword || !trimmedConfirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    fetch('http://192.168.247.166:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: trimmedUserName,
        mailId: trimmedMailId,
        password: trimmedPassword,
        confirmPassword: trimmedConfirmPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('📦 Server response:', data);
        if (data.message === 'User registered successfully') {
          Alert.alert('Success', 'Registration successful!');
          navigation.navigate('Login');
        } else {
          Alert.alert('Registration Failed', data.message || 'Try again');
        }
      })
      .catch((error) => {
        console.error('🔥 Registration error:', error);
        Alert.alert('Error', 'Could not connect to the server');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={userName}
        onChangeText={setUserName}
      />

      <TextInput
        style={styles.input}
        placeholder="Mail ID"
        value={mailId}
        onChangeText={setMailId}
        keyboardType="email-address"
        autoCapitalize="none"
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

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe6f0', // light pink background
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#d63384', // deep pink text
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Cochin',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#f8c1d9', // soft pink border
    borderWidth: 2,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    elevation: 2,
  },
  button: {
    backgroundColor: '#ff69b4', // hot pink button
    paddingVertical: 15,
    borderRadius: 15,
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
    color: '#c71585', // violet pink link
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
  },
});
