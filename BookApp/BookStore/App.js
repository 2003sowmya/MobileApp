import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddBookScreen from './screens/AddBookScreen';
import ShowBookScreen from './screens/ShowBookScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AddBook" component={AddBookScreen} options={{ title: 'Add Book' }} />
        <Stack.Screen name="ShowBooks" component={ShowBookScreen} options={{ title: 'Book List' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
