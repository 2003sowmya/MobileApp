import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

export default function FeedbackForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = () => {
    if (!name || !email || !course) {
      Alert.alert('Error', 'Please fill in all the fields!');
      return;
    }

    Alert.alert(
      'Feedback Submitted',
      `Thank you, ${name}!\n\nEmail: ${email}\nCourse: ${course}\nRating: ${rating}/10`
    );

    // Reset form
    setName('');
    setEmail('');
    setCourse('');
    setRating(5);
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setCourse('');
    setRating(5);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>📋 Feedback Form</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Select Course:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={course}
          onValueChange={(itemValue) => setCourse(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="-- Choose Course --" value="" />
          <Picker.Item label="MCA" value="MCA" />
          <Picker.Item label="MBA" value="MBA" />
          <Picker.Item label="BTech" value="BTech" />
          <Picker.Item label="BSc" value="BSc" />
        </Picker>
      </View>

      <Text style={styles.label}>Rate Your Experience: {rating}/10</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={rating}
        onValueChange={setRating}
        minimumTrackTintColor="#6200ee"
        maximumTrackTintColor="#ccc"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Feedback</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
        <Text style={styles.clearText}>Clear Form</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff0f5',
    flexGrow: 1,
    alignItems: 'stretch',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#d81b60',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: 'bold',
    color: '#333',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ff4081',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    alignItems: 'center',
    padding: 10,
  },
  clearText: {
    color: '#555',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
