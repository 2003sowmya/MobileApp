import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ShowBooksScreen() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const storedBooks = await AsyncStorage.getItem('books');
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  };

  const deleteBook = async (index) => {
    Alert.alert(
      'Delete Book',
      'Are you sure you want to delete this book?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updatedBooks = books.filter((_, i) => i !== index);
            setBooks(updatedBooks);
            await AsyncStorage.setItem('books', JSON.stringify(updatedBooks));
          }
        }
      ]
    );
  };

  const renderBook = ({ item, index }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.bookName}>{item.name}</Text>
        <Text style={styles.bookIsbn}>ISBN: {item.isbn}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteBook(index)}
      >
        <Text style={styles.deleteButtonText}>❌</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {books.length === 0 ? (
        <Text style={styles.empty}>No books added yet 📭</Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderBook}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7f5',
    padding: 20,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#5a189a',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: '#1abc9c',
    elevation: 3,
  },
  bookName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5a189a',
  },
  bookIsbn: {
    marginTop: 5,
    color: '#1abc9c',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 8,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
