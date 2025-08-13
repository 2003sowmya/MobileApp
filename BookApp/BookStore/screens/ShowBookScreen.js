import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function ShowBooksScreen() {
  const [books, setBooks] = useState([]);

  // Change this to your PC's local IP address
  const API_URL = "http://192.168.247.166:5000"; // Example: http://192.168.1.5:5000

  useEffect(() => {
    loadBooks();
  }, []);

  // Fetch books from backend
  const loadBooks = async () => {
    try {
      const response = await fetch(`${API_URL}/books`);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Delete book from backend
  const deleteBook = (id) => {
    Alert.alert(
      'Delete Book',
      'Are you sure you want to delete this book?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`${API_URL}/books/${id}`, {
                method: "DELETE"
              });

              if (response.ok) {
                Alert.alert("✅ Success", "Book deleted successfully!");
                loadBooks(); // Refresh list
              } else {
                Alert.alert("❌ Error", "Failed to delete book");
              }
            } catch (error) {
              console.error(error);
              Alert.alert("❌ Error", "Could not connect to server");
            }
          }
        }
      ]
    );
  };

  const renderBook = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.bookName}>{item.name}</Text>
        <Text style={styles.bookIsbn}>ISBN: {item.isbn}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteBook(item._id)}
      >
        <Text style={styles.deleteButtonText}>❌</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {books.length === 0 ? (
        <Text style={styles.empty}>No books found 📭</Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item._id}
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
