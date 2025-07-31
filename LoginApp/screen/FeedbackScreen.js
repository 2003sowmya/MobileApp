import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function FeedbackForm({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [rating, setRating] = useState('');

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleSubmit = () => {
    if (!name || !email || !course || !rating) {
      Alert.alert('❗ Missing Fields', 'Please fill in all fields.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('❗ Invalid Email', 'Please enter a valid email address.');
      return;
    }

    // Navigate to Thank You screen with name
    navigation.navigate('Thank You', { name });
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setCourse('');
    setRating('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📝 Event Feedback Form</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Course</Text>
      <Picker
        selectedValue={course}
        style={styles.picker}
        onValueChange={(itemValue) => setCourse(itemValue)}
      >
        <Picker.Item label="-- Select Course --" value="" />
        <Picker.Item label="BCA" value="BCA" />
        <Picker.Item label="MCA" value="MCA" />
        <Picker.Item label="B.Sc" value="B.Sc" />
        <Picker.Item label="B.Tech" value="B.Tech" />
      </Picker>

      <Text style={styles.label}>Rate your learning experience (1 to 5)</Text>
      <TextInput
        style={styles.input}
        value={rating}
        onChangeText={setRating}
        placeholder="Enter a number (1 to 5)"
        keyboardType="numeric"
        maxLength={1}
      />

      <View style={styles.buttonRow}>
        <Button title="Submit" onPress={handleSubmit} />
        <Button title="Clear" color="red" onPress={handleClear} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f5ff',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#4a148c',
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
