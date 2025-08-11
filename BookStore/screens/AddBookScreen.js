import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddBookScreen({ navigation }) {
  const [name, setName] = useState('');
  const [isbn, setIsbn] = useState('');

  const addBook = async () => {
    if (!name || !isbn) {
      Alert.alert('Error', 'Please enter both Name and ISBN');
      return;
    }

    try {
      const existingBooks = await AsyncStorage.getItem('books');
      const books = existingBooks ? JSON.parse(existingBooks) : [];
      const newBook = { name, isbn };
      books.push(newBook);
      await AsyncStorage.setItem('books', JSON.stringify(books));
      Alert.alert('✅ Success', 'Book added successfully!');
      setName('');
      setIsbn('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Add a New Book</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter book name"
        placeholderTextColor="#99e2d0"
      />

      <TextInput
        style={styles.input}
        value={isbn}
        onChangeText={setIsbn}
        placeholder="Enter ISBN number"
        placeholderTextColor="#99e2d0"
      />

      <TouchableOpacity style={styles.addButton} onPress={addBook}>
        <Text style={styles.addButtonText}>➕ Add Book</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.showButton} onPress={() => navigation.navigate('ShowBooks')}>
        <Text style={styles.showButtonText}>📖 Show Books</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bae4f5ff', // light teal background
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#5a189a', // deep purple
  },
  input: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#5a189a',
    fontSize: 16,
    color: '#333',
    elevation: 2,
  },
  addButton: {
    width: '90%',
    backgroundColor: '#5a189a', // purple
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
    alignItems: 'center',
    elevation: 4,
  },
  addButtonText: {
    color: '#e0f7f5', // teal text
    fontWeight: 'bold',
    fontSize: 16,
  },
  showButton: {
    width: '90%',
    backgroundColor: '#0b6786ff', // teal
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
    elevation: 4,
  },
  showButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
